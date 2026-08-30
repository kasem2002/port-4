import { useCallback, useEffect, useRef, useState } from "react";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/services/api";
import type { SiteSettings } from "@/types";

export type SaveState = "idle" | "saving" | "saved" | "error";

const DEBOUNCE_MS = 700;

/**
 * Editing model for the settings singleton.
 *
 * Every section edits the same row, so keystrokes go into a local draft and
 * are flushed as one PATCH after a short pause. Only the fields actually
 * touched are sent, which keeps two sections open in two tabs from
 * overwriting each other.
 */
export function useSettingsForm() {
  const { data: settings, isLoading } = useGetSettingsQuery();
  const [updateSettings] = useUpdateSettingsMutation();

  const [draft, setDraft] = useState<Partial<SiteSettings>>({});
  const [saveState, setSaveState] = useState<SaveState>("idle");

  /** Fields edited since the last successful flush. */
  const pendingRef = useRef<Partial<SiteSettings>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Clears the "Saved" confirmation after a beat. */
  const clearRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Adopt server values, but never clobber edits still waiting to be sent.
  useEffect(() => {
    if (!settings) return;
    setDraft((current) => ({ ...settings, ...pendingRef.current, ...current }));
  }, [settings]);

  const flush = useCallback(async () => {
    const patch = pendingRef.current;
    if (Object.keys(patch).length === 0) return;
    pendingRef.current = {};
    setSaveState("saving");
    try {
      await updateSettings(patch).unwrap();
      setSaveState("saved");
      // Let the confirmation fade back to nothing so it doesn't read as a
      // permanent state.
      if (clearRef.current) clearTimeout(clearRef.current);
      clearRef.current = setTimeout(() => setSaveState("idle"), 2500);
    } catch {
      // Put the failed fields back so the next edit retries them.
      pendingRef.current = { ...patch, ...pendingRef.current };
      setSaveState("error");
    }
  }, [updateSettings]);

  const setField = useCallback(
    <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
      setDraft((current) => ({ ...current, [key]: value }));
      pendingRef.current = { ...pendingRef.current, [key]: value };

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => void flush(), DEBOUNCE_MS);
    },
    [flush],
  );

  // Hold the latest flush in a ref so the unmount effect below can stay
  // dependency-free. Depending on `flush` directly would re-run the cleanup
  // every time RTK Query hands back a new trigger, firing spurious saves.
  const flushRef = useRef(flush);
  flushRef.current = flush;

  // Don't lose a pending edit when the section unmounts.
  useEffect(() => {
    const timer = timerRef.current;
    return () => {
      if (timer) clearTimeout(timer);
      void flushRef.current();
    };
  }, []);

  /** Convenience for the `…En` / `…Ar` pairs the editors are full of. */
  const bindLocalized = useCallback(
    (base: string) => ({
      en: draft[`${base}En` as keyof SiteSettings] as string | undefined,
      ar: draft[`${base}Ar` as keyof SiteSettings] as string | undefined,
      onChangeEn: (value: string) => setField(`${base}En` as keyof SiteSettings, value as never),
      onChangeAr: (value: string) => setField(`${base}Ar` as keyof SiteSettings, value as never),
    }),
    [draft, setField],
  );

  return { draft, setField, bindLocalized, saveState, isLoading };
}
