import { z } from "zod";
import { localizedPair, optionalLocalizedPair, orderField } from "./common";

export const statSchema = z.object({
  value: z.string().min(1),
  ...localizedPair("label"),
  ...optionalLocalizedPair("hint"),
  order: orderField,
});

export const statUpdateSchema = statSchema.partial();
