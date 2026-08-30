import { z } from "zod";
import { localizedPair, optionalLocalizedPair, orderField, stringList } from "./common";

export const projectSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens only"),
  /** Display index shown in the UI ("01 / 06"). */
  indexLabel: z.string().default(""),
  year: z.string().default(""),
  ...localizedPair("name"),
  ...optionalLocalizedPair("category"),
  ...optionalLocalizedPair("summary"),
  ...optionalLocalizedPair("result"),
  image: z.string().default(""),
  stack: stringList,
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  order: orderField,
});

export const projectUpdateSchema = projectSchema.partial();
