import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { AdminTokenPayload, verifyAdminToken } from "../utils/jwt";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      admin?: AdminTokenPayload;
    }
  }
}

function readBearer(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) return null;
  return header.slice("Bearer ".length);
}

/** Attaches `req.admin` when a valid token is present, but never rejects. */
export function optionalAdmin(req: Request, _res: Response, next: NextFunction) {
  const token = readBearer(req);
  if (token) {
    try {
      req.admin = verifyAdminToken(token);
    } catch {
      // An invalid token on an optional route is simply treated as anonymous.
    }
  }
  next();
}

/** Rejects the request unless a valid admin token is present. */
export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  const token = readBearer(req);
  if (!token) {
    throw ApiError.unauthorized("Missing authentication token");
  }
  try {
    req.admin = verifyAdminToken(token);
    next();
  } catch {
    throw ApiError.unauthorized("Invalid or expired token");
  }
}
