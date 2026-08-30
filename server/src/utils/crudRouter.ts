import { Router } from "express";
import { ZodTypeAny } from "zod";
import { requireAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { reorderSchema } from "../validators/common";
import { createCrudController, OrderedModel } from "./crudController";

interface CrudRouterOptions {
  model: OrderedModel;
  /** Human-readable name used in 404 messages, e.g. "Service". */
  label: string;
  createSchema: ZodTypeAny;
  updateSchema: ZodTypeAny;
  /** Enables `GET ?active=true` filtering for models with an `active` column. */
  activeFlag?: boolean;
  /** Columns stored as JSON text — decoded on read, encoded on write. */
  jsonFields?: readonly string[];
}

/**
 * Builds the standard router for an ordered content collection:
 *
 *   GET    /            public  — the site reads content anonymously
 *   POST   /            admin
 *   PATCH  /:id         admin
 *   DELETE /:id         admin
 *   POST   /reorder     admin   — body: { ids: [...] } in the new order
 */
export function createCrudRouter(options: CrudRouterOptions): Router {
  const { model, label, createSchema, updateSchema, activeFlag, jsonFields } = options;
  const controller = createCrudController({ model, label, activeFlag, jsonFields });
  const router = Router();

  router.get("/", controller.list);
  router.post("/", requireAdmin, validateBody(createSchema), controller.create);
  router.post("/reorder", requireAdmin, validateBody(reorderSchema), controller.reorder);
  router.patch("/:id", requireAdmin, validateBody(updateSchema), controller.update);
  router.delete("/:id", requireAdmin, controller.remove);

  return router;
}
