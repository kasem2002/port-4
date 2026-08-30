import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { ApiError } from "./ApiError";
import { asyncHandler } from "./asyncHandler";
import { decodeRow, decodeRows, encodeFields } from "./json";

/**
 * Most PORT-4 content is an ordered, bilingual list with identical mechanics:
 * read in `order`, append on create, patch on update, delete, and reorder by
 * an array of ids. Rather than nine near-identical controllers, each of those
 * collections is built from this factory. Anything with real domain logic
 * (auth, settings, submissions, inquiries) gets its own controller instead.
 */

/** The subset of a Prisma delegate this factory needs. */
interface OrderedDelegate {
  findMany(args?: unknown): Promise<Record<string, unknown>[]>;
  create(args: unknown): Promise<Record<string, unknown>>;
  update(args: unknown): Promise<Record<string, unknown>>;
  delete(args: unknown): Promise<Record<string, unknown>>;
  aggregate(args: unknown): Promise<{ _max: { order: number | null } }>;
}

export type OrderedModel =
  | "navItem"
  | "socialLink"
  | "marqueeItem"
  | "stat"
  | "aboutBullet"
  | "teamRole"
  | "service"
  | "processStep"
  | "project"
  | "partner"
  | "projectType"
  | "budgetRange";

function delegate(model: OrderedModel): OrderedDelegate {
  return prisma[model] as unknown as OrderedDelegate;
}

interface CrudOptions {
  model: OrderedModel;
  /** Human-readable name used in 404 messages, e.g. "Service". */
  label: string;
  /**
   * When set, `list` accepts `?active=true` and filters on this boolean
   * column. Used by services and projects, which can be hidden from the site
   * without being deleted.
   */
  activeFlag?: boolean;
  /**
   * Columns stored as JSON text (SQLite has no Json type). They are decoded
   * on the way out and encoded on the way in, so the API speaks real arrays.
   */
  jsonFields?: readonly string[];
}

export function createCrudController({
  model,
  label,
  activeFlag = false,
  jsonFields = [],
}: CrudOptions) {
  const db = delegate(model);

  /** Next order value: one past the current maximum, so creates append. */
  async function nextOrder(): Promise<number> {
    const result = await db.aggregate({ _max: { order: true } });
    return (result._max.order ?? -1) + 1;
  }

  const list = asyncHandler(async (req: Request, res: Response) => {
    const onlyActive = activeFlag && req.query.active === "true";
    const rows = await db.findMany({
      where: onlyActive ? { active: true } : undefined,
      orderBy: { order: "asc" },
    });
    res.json(decodeRows(rows, jsonFields));
  });

  const create = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown>;
    const order = typeof body.order === "number" ? body.order : await nextOrder();
    const row = await db.create({ data: encodeFields({ ...body, order }, jsonFields) });
    res.status(201).json(decodeRow(row, jsonFields));
  });

  const update = asyncHandler(async (req: Request, res: Response) => {
    const row = await db
      .update({
        where: { id: req.params.id },
        data: encodeFields(req.body as Record<string, unknown>, jsonFields),
      })
      .catch(() => null);
    if (!row) throw ApiError.notFound(`${label} not found`);
    res.json(decodeRow(row, jsonFields));
  });

  const remove = asyncHandler(async (req: Request, res: Response) => {
    const row = await db.delete({ where: { id: req.params.id } }).catch(() => null);
    if (!row) throw ApiError.notFound(`${label} not found`);
    res.status(204).send();
  });

  /**
   * Accepts the full list of ids in their new order and rewrites `order` to
   * match. Wrapped in a transaction so a partial failure can't leave the list
   * with duplicate or missing positions.
   */
  const reorder = asyncHandler(async (req: Request, res: Response) => {
    const { ids } = req.body as { ids: string[] };
    await prisma.$transaction(async (tx) => {
      const txDb = tx[model] as unknown as OrderedDelegate;
      for (const [index, id] of ids.entries()) {
        await txDb.update({ where: { id }, data: { order: index } });
      }
    });
    const rows = await db.findMany({ orderBy: { order: "asc" } });
    res.json(decodeRows(rows, jsonFields));
  });

  return { list, create, update, remove, reorder };
}
