import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

/**
 * Replaces `req.body` with the parsed, typed result. A failure throws a
 * ZodError, which `errorHandler` turns into a 400 with field details.
 */
export function validateBody(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };
}

/** Same, for query strings. */
export function validateQuery(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    Object.assign(req.query, schema.parse(req.query));
    next();
  };
}
