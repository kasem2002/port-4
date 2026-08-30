import { z } from "zod";
import { localizedPair, orderField } from "./common";

export const socialLinkSchema = z.object({
  icon: z.string().min(1),
  ...localizedPair("label"),
  href: z.string().url("Enter a full URL, including https://"),
  abbr: z.string().max(4).default(""),
  order: orderField,
});

export const socialLinkUpdateSchema = socialLinkSchema.partial();
