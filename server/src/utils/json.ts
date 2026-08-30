/**
 * Prisma's SQLite connector has no native Json type, so array and object
 * columns are stored as JSON text. These helpers are the only place that
 * knows about the encoding — controllers always see real values.
 */

/** Decodes a JSON column, falling back if the text is missing or corrupt. */
export function decodeJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string" || value.length === 0) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/** Encodes a value for storage in a JSON text column. */
export function encodeJson(value: unknown): string {
  return JSON.stringify(value ?? null);
}

/**
 * Returns a copy of `row` with the named columns decoded from JSON text.
 * Columns that aren't present are left alone, so it is safe to run over a
 * partial `select`.
 */
export function decodeRow<T extends Record<string, unknown>>(
  row: T,
  fields: readonly string[],
): T {
  if (fields.length === 0) return row;
  const out: Record<string, unknown> = { ...row };
  for (const field of fields) {
    if (field in out) out[field] = decodeJson(out[field], []);
  }
  return out as T;
}

/** Same, over a list. */
export function decodeRows<T extends Record<string, unknown>>(
  rows: T[],
  fields: readonly string[],
): T[] {
  if (fields.length === 0) return rows;
  return rows.map((row) => decodeRow(row, fields));
}

/**
 * Returns a copy of `data` with the named columns encoded to JSON text,
 * skipping any the caller didn't supply — so PATCH bodies stay partial.
 */
export function encodeFields<T extends Record<string, unknown>>(
  data: T,
  fields: readonly string[],
): T {
  if (fields.length === 0) return data;
  const out: Record<string, unknown> = { ...data };
  for (const field of fields) {
    if (field in out && out[field] !== undefined) out[field] = encodeJson(out[field]);
  }
  return out as T;
}
