import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

/**
 * The upload middleware has already validated, processed and written the file
 * by the time these run; the controller only shapes the response.
 */

export const uploadOne = asyncHandler(async (req: Request, res: Response) => {
  if (!req.storedFile) throw ApiError.badRequest("No file provided");
  res.status(201).json(req.storedFile);
});

export const uploadBatch = asyncHandler(async (req: Request, res: Response) => {
  if (!req.storedFiles?.length) throw ApiError.badRequest("No files provided");
  res.status(201).json(req.storedFiles);
});
