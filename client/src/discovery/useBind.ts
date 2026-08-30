import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearError, setField, toggleArrayField } from "./store/discoverySlice";

/** Reads one brief field by dot-path, e.g. `business.name`. */
export function useField<T = unknown>(path: string): T | undefined {
  return useAppSelector((s) => {
    let cursor: unknown = s.discovery.form;
    for (const key of path.split(".")) {
      if (cursor == null) return undefined;
      cursor = (cursor as Record<string, unknown>)[key];
    }
    return cursor as T;
  });
}

/**
 * Writers for the brief. Both clear any error sitting on the field being
 * edited, so a validation message disappears as soon as it's addressed.
 */
export function useBind() {
  const dispatch = useAppDispatch();

  const set = useCallback(
    (path: string, value: unknown) => {
      dispatch(setField({ path, value }));
      dispatch(clearError(path));
    },
    [dispatch],
  );

  const toggle = useCallback(
    (path: string, value: string) => {
      dispatch(toggleArrayField({ path, value }));
      dispatch(clearError(path));
    },
    [dispatch],
  );

  return { set, toggle };
}

export function useErrors(): Record<string, string> {
  return useAppSelector((s) => s.discovery.errors);
}

export function useStepTouched(step: number): boolean {
  return useAppSelector((s) => s.discovery.touchedSteps.includes(String(step)));
}
