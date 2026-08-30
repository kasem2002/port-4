import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  createSubmission,
  deleteSubmission,
  getSubmission,
  getSubmissionStats,
  listSubmissions,
  updateSubmission,
} from "../controllers/submission.controller";
import { requireAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { submissionSchema, submissionStatusSchema } from "../validators/submission.validator";

export const submissionRouter = Router();

/**
 * Submitting is public, so it gets a strict per-IP ceiling. A real client
 * sends one brief; anything approaching this limit is abuse.
 */
const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  message: { error: "Too many submissions from this address. Please try again later." },
});

// Public — a client anywhere submits their brief.
submissionRouter.post("/", createLimiter, validateBody(submissionSchema), createSubmission);

// Admin. `/stats` is declared before `/:id` so it isn't captured as an id.
submissionRouter.get("/", requireAdmin, listSubmissions);
submissionRouter.get("/stats", requireAdmin, getSubmissionStats);
submissionRouter.get("/:id", requireAdmin, getSubmission);
submissionRouter.patch("/:id", requireAdmin, validateBody(submissionStatusSchema), updateSubmission);
submissionRouter.delete("/:id", requireAdmin, deleteSubmission);
