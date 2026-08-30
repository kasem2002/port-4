import { z } from "zod";
import { localizedPair, orderField } from "./common";

export const navItemSchema = z.object({
  ...localizedPair("label"),
  href: z.string().min(1),
  order: orderField,
});

export const navItemUpdateSchema = navItemSchema.partial();
