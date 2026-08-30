import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { asyncHandler } from "../utils/asyncHandler";

/** Headline numbers and recent activity for the dashboard's Overview screen. */
export const getOverview = asyncHandler(async (_req: Request, res: Response) => {
  const [
    submissionsTotal,
    submissionsUnread,
    inquiriesTotal,
    inquiriesUnread,
    servicesCount,
    projectsCount,
    recentSubmissions,
    recentInquiries,
  ] = await Promise.all([
    prisma.submission.count(),
    prisma.submission.count({ where: { isRead: false } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { isRead: false } }),
    prisma.service.count({ where: { active: true } }),
    prisma.project.count({ where: { active: true } }),
    prisma.submission.findMany({
      select: {
        id: true,
        businessName: true,
        businessType: true,
        status: true,
        isRead: true,
        submittedAt: true,
      },
      orderBy: { submittedAt: "desc" },
      take: 5,
    }),
    prisma.inquiry.findMany({
      select: { id: true, name: true, company: true, status: true, isRead: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  res.json({
    submissions: { total: submissionsTotal, unread: submissionsUnread },
    inquiries: { total: inquiriesTotal, unread: inquiriesUnread },
    content: { services: servicesCount, projects: projectsCount },
    recentSubmissions,
    recentInquiries,
  });
});
