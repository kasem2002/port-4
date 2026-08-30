import { z } from "zod";
import { localizedPair, orderField } from "./common";

export const marqueeItemSchema = z.object({
  ...localizedPair("text"),
  order: orderField,
});

export const marqueeItemUpdateSchema = marqueeItemSchema.partial();
