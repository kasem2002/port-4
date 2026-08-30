import { z } from "zod";

/** Optional display order; controllers default it to the end of the list. */
export const orderField = z.number().int().min(0).optional();

/** A required bilingual pair, e.g. `localizedPair("label")` → labelEn/labelAr. */
export function localizedPair(base: string, min = 1) {
  return {
    [`${base}En`]: z.string().min(min),
    [`${base}Ar`]: z.string().min(min),
  } as const;
}

/** A bilingual pair that may be empty, defaulting to "". */
export function optionalLocalizedPair(base: string) {
  return {
    [`${base}En`]: z.string().default(""),
    [`${base}Ar`]: z.string().default(""),
  } as const;
}

/** `{ en, ar }` objects stored inside Json columns (outcomes, tokens). */
export const localizedEntry = z.object({
  en: z.string().default(""),
  ar: z.string().default(""),
});

/** Plain string arrays stored inside Json columns (tech stacks). */
export const stringList = z.array(z.string()).default([]);

/** Which line of a headline renders in the accent style; -1 means none. */
export const accentLine = z.number().int().min(-1).max(5).default(-1);

/** Reordering payload shared by every sortable collection. */
export const reorderSchema = z.object({
  ids: z.array(z.string().min(1)).min(1),
});
