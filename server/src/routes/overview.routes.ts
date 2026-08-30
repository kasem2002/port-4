import { Router } from "express";
import { getOverview } from "../controllers/overview.controller";
import { requireAdmin } from "../middleware/auth";

export const overviewRouter = Router();

overviewRouter.get("/", requireAdmin, getOverview);
