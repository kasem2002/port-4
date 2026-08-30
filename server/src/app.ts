import path from "path";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { UPLOADS_DIR } from "./middleware/upload";
import { authRouter } from "./routes/auth.routes";
import {
  aboutBulletsRouter,
  budgetsRouter,
  contentRouter,
  marqueeRouter,
  navRouter,
  partnersRouter,
  processRouter,
  projectTypesRouter,
  projectsRouter,
  servicesRouter,
  settingsRouter,
  socialRouter,
  statsRouter,
  teamRolesRouter,
} from "./routes/content.routes";
import { inquiryRouter } from "./routes/inquiry.routes";
import { overviewRouter } from "./routes/overview.routes";
import { submissionRouter } from "./routes/submission.routes";
import { uploadRouter } from "./routes/upload.routes";

export const app = express();

// Uploaded images are served from this origin, so the default same-origin
// resource policy would block the Vite dev server from rendering them.
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(express.json({ limit: "4mb" }));
app.use(morgan(env.isProduction ? "combined" : "dev"));

app.use("/uploads", express.static(UPLOADS_DIR, { maxAge: "7d" }));

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 600 });
const uploadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 120 });

app.use("/api", apiLimiter);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ── Public reads ───────────────────────────────────────────────────────────
app.use("/api/content", contentRouter);

// ── Content collections (public GET, admin writes) ─────────────────────────
app.use("/api/settings", settingsRouter);
app.use("/api/nav", navRouter);
app.use("/api/social", socialRouter);
app.use("/api/marquee", marqueeRouter);
app.use("/api/stats", statsRouter);
app.use("/api/about-bullets", aboutBulletsRouter);
app.use("/api/team-roles", teamRolesRouter);
app.use("/api/services", servicesRouter);
app.use("/api/process", processRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/partners", partnersRouter);
app.use("/api/project-types", projectTypesRouter);
app.use("/api/budgets", budgetsRouter);

// ── Inbound ────────────────────────────────────────────────────────────────
app.use("/api/submissions", submissionRouter);
app.use("/api/inquiries", inquiryRouter);
app.use("/api/uploads", uploadLimiter, uploadRouter);

// ── Admin ──────────────────────────────────────────────────────────────────
app.use("/api/auth", authRouter);
app.use("/api/overview", overviewRouter);

/**
 * In production the API also serves the built client, so Hostinger runs one
 * process on one origin — no CORS, no second service to keep alive. Anything
 * that isn't an API route falls through to the SPA's index.html so client-side
 * routing works on a hard refresh.
 */
if (env.isProduction) {
  const clientDist = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(clientDist));
  app.get(/^\/(?!api|uploads).*/, (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.use(notFoundHandler);
app.use(errorHandler);
