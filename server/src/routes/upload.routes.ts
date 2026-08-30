import { Router } from "express";
import { uploadBatch, uploadOne } from "../controllers/upload.controller";
import { uploadMany, uploadSingle } from "../middleware/upload";

export const uploadRouter = Router();

/**
 * Uploads are public because clients attach logos and photos to their brief
 * before any account exists. The route-level rate limit in `app.ts`, the
 * MIME allow-list and the size cap are what keep it safe.
 */
uploadRouter.post("/", uploadSingle, uploadOne);
uploadRouter.post("/batch", uploadMany, uploadBatch);
