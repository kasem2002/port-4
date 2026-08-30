import { useCallback } from "react";
import { useAppSelector } from "@/app/hooks";
import { translations } from "@/i18n/translations";
import type { Lang, LocalizedEntry } from "@/types";

/** The active language. */
export function useLang(): Lang {
  return useAppSelector((s) => s.language.lang);
}

/** True when the active language reads right-to-left. */
export function useIsRtl(): boolean {
  return useLang() === "ar";
}

/**
 * Reads the localized half of a `…En` / `…Ar` column pair:
 *
 *   const l = useL();
 *   l(service, "title")   // service.titleEn | service.titleAr
 *
 * Falls back to English when the Arabic value is blank, so a half-translated
 * record still renders something.
 */
export function useL() {
  const lang = useLang();
  return useCallback(
    (row: object | null | undefined, base: string): string => {
      if (!row) return "";
      // Interfaces have no index signature, so widen once here rather than
      // forcing every model type to declare one.
      const record = row as Record<string, unknown>;
      const value = record[`${base}${lang === "ar" ? "Ar" : "En"}`];
      if (typeof value === "string" && value.length > 0) return value;
      const fallback = record[`${base}En`];
      return typeof fallback === "string" ? fallback : "";
    },
    [lang],
  );
}

/** Picks the active language out of an `{ en, ar }` entry from a JSON column. */
export function useLE() {
  const lang = useLang();
  return useCallback(
    (entry: LocalizedEntry | null | undefined): string => {
      if (!entry) return "";
      return (lang === "ar" ? entry.ar : entry.en) || entry.en || "";
    },
    [lang],
  );
}

/** UI chrome strings — labels and buttons that aren't editable content. */
export function useT() {
  const lang = useLang();
  return useCallback(
    (key: string): string => {
      const table = translations[lang] ?? translations.en;
      return table[key] ?? translations.en[key] ?? key;
    },
    [lang],
  );
}

/** Splits a "||"-delimited headline into its lines. */
export function splitHeadline(value: string): string[] {
  return (value || "").split("||").map((s) => s.trim());
}
