import { Router } from "express";
import { getSiteContent } from "../controllers/content.controller";
import { getSettings, updateSettings } from "../controllers/settings.controller";
import { requireAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { settingsSchema } from "../validators/settings.validator";
import { createCrudRouter } from "../utils/crudRouter";
import { aboutBulletSchema, aboutBulletUpdateSchema, teamRoleSchema, teamRoleUpdateSchema } from "../validators/about.validator";
import { budgetRangeSchema, budgetRangeUpdateSchema, projectTypeSchema, projectTypeUpdateSchema } from "../validators/contact.validator";
import { marqueeItemSchema, marqueeItemUpdateSchema } from "../validators/marquee.validator";
import { navItemSchema, navItemUpdateSchema } from "../validators/nav.validator";
import { partnerSchema, partnerUpdateSchema } from "../validators/partner.validator";
import { processStepSchema, processStepUpdateSchema } from "../validators/process.validator";
import { projectSchema, projectUpdateSchema } from "../validators/project.validator";
import { serviceSchema, serviceUpdateSchema } from "../validators/service.validator";
import { socialLinkSchema, socialLinkUpdateSchema } from "../validators/social.validator";
import { statSchema, statUpdateSchema } from "../validators/stats.validator";

/** GET /api/content — everything the public site renders, in one request. */
export const contentRouter = Router();
contentRouter.get("/", getSiteContent);

/** GET/PUT /api/settings — the single settings row. */
export const settingsRouter = Router();
settingsRouter.get("/", getSettings);
settingsRouter.put("/", requireAdmin, validateBody(settingsSchema), updateSettings);

/**
 * Every ordered content collection shares the same route shape, so each is one
 * line here rather than its own near-identical file.
 */
export const navRouter = createCrudRouter({
  model: "navItem",
  label: "Navigation item",
  createSchema: navItemSchema,
  updateSchema: navItemUpdateSchema,
});

export const socialRouter = createCrudRouter({
  model: "socialLink",
  label: "Social link",
  createSchema: socialLinkSchema,
  updateSchema: socialLinkUpdateSchema,
});

export const marqueeRouter = createCrudRouter({
  model: "marqueeItem",
  label: "Marquee item",
  createSchema: marqueeItemSchema,
  updateSchema: marqueeItemUpdateSchema,
});

export const statsRouter = createCrudRouter({
  model: "stat",
  label: "Stat",
  createSchema: statSchema,
  updateSchema: statUpdateSchema,
});

export const aboutBulletsRouter = createCrudRouter({
  model: "aboutBullet",
  label: "About bullet",
  createSchema: aboutBulletSchema,
  updateSchema: aboutBulletUpdateSchema,
});

export const teamRolesRouter = createCrudRouter({
  model: "teamRole",
  label: "Team role",
  createSchema: teamRoleSchema,
  updateSchema: teamRoleUpdateSchema,
});

export const servicesRouter = createCrudRouter({
  model: "service",
  label: "Service",
  createSchema: serviceSchema,
  updateSchema: serviceUpdateSchema,
  activeFlag: true,
  jsonFields: ["outcomes", "stack"],
});

export const processRouter = createCrudRouter({
  model: "processStep",
  label: "Process step",
  createSchema: processStepSchema,
  updateSchema: processStepUpdateSchema,
  jsonFields: ["tokens"],
});

export const projectsRouter = createCrudRouter({
  model: "project",
  label: "Project",
  createSchema: projectSchema,
  updateSchema: projectUpdateSchema,
  activeFlag: true,
  jsonFields: ["stack"],
});

export const partnersRouter = createCrudRouter({
  model: "partner",
  label: "Partner",
  createSchema: partnerSchema,
  updateSchema: partnerUpdateSchema,
});

export const projectTypesRouter = createCrudRouter({
  model: "projectType",
  label: "Project type",
  createSchema: projectTypeSchema,
  updateSchema: projectTypeUpdateSchema,
});

export const budgetsRouter = createCrudRouter({
  model: "budgetRange",
  label: "Budget range",
  createSchema: budgetRangeSchema,
  updateSchema: budgetRangeUpdateSchema,
});
