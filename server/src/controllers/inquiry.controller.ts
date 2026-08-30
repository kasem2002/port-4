import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

/** The short "start a project" form on the public site's contact section. */

export const createInquiry = asyncHandler(async (req: Request, res: Response) => {
  const inquiry = await prisma.inquiry.create({ data: req.body });
  res.status(201).json({ id: inquiry.id, createdAt: inquiry.createdAt });
});

export const listInquiries = asyncHandler(async (req: Request, res: Response) => {
  const { status, search } = req.query as { status?: string; search?: string };

  const inquiries = await prisma.inquiry.findMany({
    where: {
      status: status || undefined,
      OR: search
        ? [
            { name: { contains: search } },
            { email: { contains: search } },
            { company: { contains: search } },
          ]
        : undefined,
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(inquiries);
});

export const getInquiry = asyncHandler(async (req: Request, res: Response) => {
  const inquiry = await prisma.inquiry.findUnique({ where: { id: req.params.id } });
  if (!inquiry) throw ApiError.notFound("Inquiry not found");
  res.json(inquiry);
});

export const updateInquiry = asyncHandler(async (req: Request, res: Response) => {
  const inquiry = await prisma.inquiry
    .update({ where: { id: req.params.id }, data: req.body })
    .catch(() => null);
  if (!inquiry) throw ApiError.notFound("Inquiry not found");
  res.json(inquiry);
});

export const deleteInquiry = asyncHandler(async (req: Request, res: Response) => {
  const inquiry = await prisma.inquiry.delete({ where: { id: req.params.id } }).catch(() => null);
  if (!inquiry) throw ApiError.notFound("Inquiry not found");
  res.status(204).send();
});
