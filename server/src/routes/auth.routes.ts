import { Router } from "express";
import rateLimit from "express-rate-limit";
import { changePassword, login, me } from "../controllers/auth.controller";
import { requireAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { changePasswordSchema, loginSchema } from "../validators/auth.validator";

export const authRouter = Router();

/** Tight limit on login specifically — the rest of the API is far looser. */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: "Too many login attempts. Try again in a few minutes." },
});

authRouter.post("/login", loginLimiter, validateBody(loginSchema), login);
authRouter.get("/me", requireAdmin, me);
authRouter.post("/password", requireAdmin, validateBody(changePasswordSchema), changePassword);
