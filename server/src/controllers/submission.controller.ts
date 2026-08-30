import { Request, Response } from "express";
import { removeStoredFile } from "../middleware/upload";
import { prisma } from "../prismaClient";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { decodeJson, encodeJson } from "../utils/json";
import type { SubmissionInput } from "../validators/submission.validator";

interface CollectedFile {
  field: string;
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
}

/**
 * Files live in four places inside a brief. Pulling them into their own rows
 * gives the dashboard a flat list to render and a reliable set of paths to
 * clean up when a submission is deleted.
 */
function collectFiles(brief: SubmissionInput): CollectedFile[] {
  const files: CollectedFile[] = [];

  const push = (field: string, ref: SubmissionInput["brand"]["logo"]) => {
    if (!ref?.url) return;
    files.push({
      field,
      url: ref.url,
      originalName: ref.originalName ?? "",
      mimeType: ref.mimeType ?? "",
      size: ref.size ?? 0,
    });
  };

  push("logo", brief.brand.logo);
  brief.services.products.forEach((p) => push("productImage", p.image));
  brief.team.members.forEach((m) => push("teamPhoto", m.photo));
  brief.assets.forEach((a) =>
    files.push({
      field: "asset",
      url: a.url,
      originalName: a.originalName,
      mimeType: a.mimeType,
      size: a.size,
    }),
  );

  return files;
}

export const createSubmission = asyncHandler(async (req: Request, res: Response) => {
  const brief = req.body as SubmissionInput;

  const submission = await prisma.submission.create({
    data: {
      // Denormalized so the dashboard list can filter and sort without
      // reaching into the JSON payload.
      businessName: brief.business.name,
      businessType:
        brief.business.type === "Other" ? brief.business.typeOther : brief.business.type,
      contactEmail: brief.contact.email,
      contactPhone: brief.contact.phone,
      contactWhatsapp: brief.contact.whatsapp,
      primaryGoal:
        brief.goals.primaryGoal === "Other"
          ? brief.goals.primaryGoalOther
          : brief.goals.primaryGoal,
      locale: brief.locale,
      data: encodeJson(brief),
      files: { create: collectFiles(brief) },
    },
    include: { files: true },
  });

  // The public response stays deliberately thin — a client has no reason to
  // read back the stored record.
  res.status(201).json({ id: submission.id, submittedAt: submission.submittedAt });
});

export const listSubmissions = asyncHandler(async (req: Request, res: Response) => {
  const { status, search } = req.query as { status?: string; search?: string };

  const submissions = await prisma.submission.findMany({
    where: {
      status: status || undefined,
      OR: search
        ? [
            { businessName: { contains: search } },
            { businessType: { contains: search } },
            { contactEmail: { contains: search } },
            { contactPhone: { contains: search } },
            { contactWhatsapp: { contains: search } },
          ]
        : undefined,
    },
    // The list view never needs the full brief; omitting it keeps the
    // response small even with hundreds of submissions.
    select: {
      id: true,
      businessName: true,
      businessType: true,
      contactEmail: true,
      contactPhone: true,
      contactWhatsapp: true,
      primaryGoal: true,
      locale: true,
      status: true,
      isRead: true,
      submittedAt: true,
      _count: { select: { files: true } },
    },
    orderBy: { submittedAt: "desc" },
  });

  res.json(submissions);
});

export const getSubmission = asyncHandler(async (req: Request, res: Response) => {
  const submission = await prisma.submission.findUnique({
    where: { id: req.params.id },
    include: { files: true },
  });
  if (!submission) throw ApiError.notFound("Submission not found");
  res.json({ ...submission, data: decodeJson(submission.data, {}) });
});

export const updateSubmission = asyncHandler(async (req: Request, res: Response) => {
  const submission = await prisma.submission
    .update({ where: { id: req.params.id }, data: req.body })
    .catch(() => null);
  if (!submission) throw ApiError.notFound("Submission not found");
  res.json(submission);
});

export const deleteSubmission = asyncHandler(async (req: Request, res: Response) => {
  const submission = await prisma.submission.findUnique({
    where: { id: req.params.id },
    include: { files: true },
  });
  if (!submission) throw ApiError.notFound("Submission not found");

  // Remove the row first: an orphaned file on disk is a much smaller problem
  // than a row pointing at files that no longer exist.
  await prisma.submission.delete({ where: { id: submission.id } });
  await Promise.all(submission.files.map((f) => removeStoredFile(f.url)));

  res.status(204).send();
});

/** Counts behind the dashboard's unread badge. */
export const getSubmissionStats = asyncHandler(async (_req: Request, res: Response) => {
  const [total, unread, byStatus] = await Promise.all([
    prisma.submission.count(),
    prisma.submission.count({ where: { isRead: false } }),
    prisma.submission.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  res.json({
    total,
    unread,
    byStatus: Object.fromEntries(byStatus.map((s) => [s.status, s._count._all])),
  });
});
