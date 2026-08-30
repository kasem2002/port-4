import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  createInquiry,
  deleteInquiry,
  getInquiry,
  listInquiries,
  updateInquiry,
} from "../controllers/inquiry.controller";
import { requireAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { inquirySchema, inquiryStatusSchema } from "../validators/inquiry.validator";

export const inquiryRouter = Router();

const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 15,
  message: { error: "Too many messages from this address. Please try again later." },
});

// Public — the short contact form on the site.
inquiryRouter.post("/", createLimiter, validateBody(inquirySchema), createInquiry);

// Admin.
inquiryRouter.get("/", requireAdmin, listInquiries);
inquiryRouter.get("/:id", requireAdmin, getInquiry);
inquiryRouter.patch("/:id", requireAdmin, validateBody(inquiryStatusSchema), updateInquiry);
inquiryRouter.delete("/:id", requireAdmin, deleteInquiry);
