import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { asyncHandler } from "../utils/asyncHandler";

const SETTINGS_ID = "settings";

/**
 * Settings are a single row. Reading creates it on first access so a fresh
 * database never 404s, and every dashboard section patches only its own fields.
 */
async function readSettings() {
  return prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    update: {},
    create: { id: SETTINGS_ID },
  });
}

export const getSettings = asyncHandler(async (_req: Request, res: Response) => {
  res.json(await readSettings());
});

export const updateSettings = asyncHandler(async (req: Request, res: Response) => {
  await readSettings();
  const settings = await prisma.siteSettings.update({
    where: { id: SETTINGS_ID },
    data: req.body,
  });
  res.json(settings);
});
