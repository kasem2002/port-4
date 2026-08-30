import { z } from "zod";
import { localizedPair, optionalLocalizedPair, orderField } from "./common";

export const aboutBulletSchema = z.object({
  ...localizedPair("text"),
  order: orderField,
});

export const aboutBulletUpdateSchema = aboutBulletSchema.partial();

export const teamRoleSchema = z.object({
  ...localizedPair("role"),
  count: z.number().int().min(0).default(1),
  ...optionalLocalizedPair("note"),
  order: orderField,
});

export const teamRoleUpdateSchema = teamRoleSchema.partial();
