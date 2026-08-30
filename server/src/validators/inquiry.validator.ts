import { z } from "zod";

export const INQUIRY_STATUSES = ["new", "reviewing", "contacted", "archived"] as const;

/** The short "start a project" form on the public site. */
export const inquirySchema = z.object({
  name: z.string().min(1, "Please tell us your name"),
  email: z.string().email("That email address does not look right"),
  company: z.string().default(""),
  projectType: z.string().default(""),
  budget: z.string().default(""),
  message: z.string().min(10, "Tell us a little about the project"),
});

export const inquiryStatusSchema = z.object({
  status: z.enum(INQUIRY_STATUSES).optional(),
  isRead: z.boolean().optional(),
});
