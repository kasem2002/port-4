import { z } from "zod";
import { localizedEntry, localizedPair, orderField } from "./common";

export const processStepSchema = z.object({
  /** The number shown in the UI ("01", "02"…). */
  stepId: z.string().min(1),
  ...localizedPair("title"),
  ...localizedPair("body"),
  /** Chips rendered under each step. */
  tokens: z.array(localizedEntry).default([]),
  order: orderField,
});

export const processStepUpdateSchema = processStepSchema.partial();
