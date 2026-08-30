import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { asyncHandler } from "../utils/asyncHandler";
import { decodeRows } from "../utils/json";

/**
 * One call returning everything the public site renders. The site is a single
 * page, so fetching twelve collections separately would mean twelve round
 * trips before the first paint.
 */
export const getSiteContent = asyncHandler(async (_req: Request, res: Response) => {
  const byOrder = { orderBy: { order: "asc" } } as const;

  const [
    settings,
    nav,
    social,
    marquee,
    stats,
    aboutBullets,
    teamRoles,
    services,
    processSteps,
    projects,
    partners,
    projectTypes,
    budgets,
  ] = await Promise.all([
    prisma.siteSettings.upsert({
      where: { id: "settings" },
      update: {},
      create: { id: "settings" },
    }),
    prisma.navItem.findMany(byOrder),
    prisma.socialLink.findMany(byOrder),
    prisma.marqueeItem.findMany(byOrder),
    prisma.stat.findMany(byOrder),
    prisma.aboutBullet.findMany(byOrder),
    prisma.teamRole.findMany(byOrder),
    prisma.service.findMany({ where: { active: true }, ...byOrder }),
    prisma.processStep.findMany(byOrder),
    prisma.project.findMany({ where: { active: true }, ...byOrder }),
    prisma.partner.findMany(byOrder),
    prisma.projectType.findMany(byOrder),
    prisma.budgetRange.findMany(byOrder),
  ]);

  res.json({
    settings,
    nav,
    social,
    marquee,
    stats,
    aboutBullets,
    teamRoles,
    services: decodeRows(services, ["outcomes", "stack"]),
    processSteps: decodeRows(processSteps, ["tokens"]),
    projects: decodeRows(projects, ["stack"]),
    partners,
    projectTypes,
    budgets,
  });
});
