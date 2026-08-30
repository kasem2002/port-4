import { z } from "zod";
import { localizedPair, orderField } from "./common";

export const projectTypeSchema = z.object({
  ...localizedPair("label"),
  order: orderField,
});

export const projectTypeUpdateSchema = projectTypeSchema.partial();

export const budgetRangeSchema = z.object({
  label: z.string().min(1),
  order: orderField,
});

export const budgetRangeUpdateSchema = budgetRangeSchema.partial();
