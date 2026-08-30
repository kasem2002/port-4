import { NextFunction, Request, Response } from "express";

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Wraps an async route handler so a rejected promise reaches Express's error
 * pipeline instead of becoming an unhandled rejection. Every controller is
 * wrapped in this, which is why none of them contain try/catch.
 */
export function asyncHandler(handler: Handler) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
}
