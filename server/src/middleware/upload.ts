import crypto from "crypto";
import fs from "fs";
import path from "path";
import multer from "multer";
import sharp from "sharp";
import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

export const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

/** Raster images are downscaled and re-encoded as WebP. */
const RASTER_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

/**
 * Everything else we accept is written through byte-for-byte. Vectors would
 * lose scalability if rasterized; documents and video aren't sharp's business.
 */
const PASSTHROUGH_MIME_TYPES: Record<string, string> = {
  "image/svg+xml": ".svg",
  "application/pdf": ".pdf",
  "video/mp4": ".mp4",
  "video/quicktime": ".mov",
  "video/webm": ".webm",
};

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;

export interface StoredFile {
  filename: string;
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
}

function isAccepted(mimetype: string) {
  return RASTER_MIME_TYPES.has(mimetype) || mimetype in PASSTHROUGH_MIME_TYPES;
}

const multerOptions: multer.Options = {
  storage: multer.memoryStorage(),
  limits: { fileSize: env.maxUploadBytes },
  fileFilter: (_req, file, cb) => {
    if (isAccepted(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(ApiError.badRequest(`Unsupported file type: ${file.mimetype}`));
  },
};

/**
 * Persists one buffered upload to disk. Raster images go through sharp
 * (auto-rotate from EXIF, cap at 1920px wide, WebP); everything else is
 * written unchanged under a random filename.
 */
async function persist(file: Express.Multer.File): Promise<StoredFile> {
  const id = crypto.randomUUID();
  const passthroughExt = PASSTHROUGH_MIME_TYPES[file.mimetype];

  if (passthroughExt) {
    const filename = `${id}${passthroughExt}`;
    await fs.promises.writeFile(path.join(UPLOADS_DIR, filename), file.buffer);
    return {
      filename,
      url: `/uploads/${filename}`,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    };
  }

  const filename = `${id}.webp`;
  const info = await sharp(file.buffer, { failOn: "none" })
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(path.join(UPLOADS_DIR, filename));

  return {
    filename,
    url: `/uploads/${filename}`,
    originalName: file.originalname,
    mimeType: "image/webp",
    size: info.size,
  };
}

const singleHandler = multer(multerOptions).single("file");
const arrayHandler = multer(multerOptions).array("files", 20);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      storedFile?: StoredFile;
      storedFiles?: StoredFile[];
    }
  }
}

/** Accepts one file on the `file` field and exposes `req.storedFile`. */
export function uploadSingle(req: Request, res: Response, next: NextFunction) {
  singleHandler(req, res, async (err) => {
    if (err) return next(err);
    if (!req.file) return next(ApiError.badRequest("No file provided"));
    try {
      req.storedFile = await persist(req.file);
      next();
    } catch {
      next(ApiError.badRequest("Uploaded file could not be processed"));
    }
  });
}

/** Accepts up to 20 files on the `files` field and exposes `req.storedFiles`. */
export function uploadMany(req: Request, res: Response, next: NextFunction) {
  arrayHandler(req, res, async (err) => {
    if (err) return next(err);
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    if (files.length === 0) return next(ApiError.badRequest("No files provided"));
    try {
      req.storedFiles = await Promise.all(files.map(persist));
      next();
    } catch {
      next(ApiError.badRequest("One or more files could not be processed"));
    }
  });
}

/** Deletes a stored file by its public URL. Missing files are ignored. */
export async function removeStoredFile(url: string): Promise<void> {
  const filename = path.basename(url);
  if (!filename || filename.includes("..")) return;
  await fs.promises.rm(path.join(UPLOADS_DIR, filename), { force: true });
}
