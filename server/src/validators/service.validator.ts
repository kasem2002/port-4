import { z } from "zod";
import { localizedEntry, localizedPair, orderField, stringList } from "./common";

export const serviceSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens only"),
  tag: z.string().min(1),
  ...localizedPair("title"),
  ...localizedPair("description"),
  /** "What we deliver" bullets. */
  outcomes: z.array(localizedEntry).default([]),
  /** Technology chips. */
  stack: stringList,
  active: z.boolean().default(true),
  order: orderField,
});

export const serviceUpdateSchema = serviceSchema.partial();
