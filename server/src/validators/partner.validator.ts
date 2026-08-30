import { z } from "zod";
import { localizedPair, orderField } from "./common";

export const partnerSchema = z.object({
  ...localizedPair("name"),
  /** Image URL, data URI, or inline SVG. Empty falls back to a wordmark. */
  logo: z.string().default(""),
  order: orderField,
});

export const partnerUpdateSchema = partnerSchema.partial();
