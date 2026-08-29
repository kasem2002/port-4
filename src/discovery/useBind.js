import { useSelector, useDispatch } from 'react-redux';
import { setField, toggleArrayField, clearError } from './store/discoverySlice.js';

// Select a form field by dot-path.
export function useField(path) {
  return useSelector((s) => {
    const keys = path.split('.');
    let cur = s.discovery?.form;
    for (const k of keys) {
      if (cur == null) return undefined;
      cur = cur[k];
    }
    return cur;
  });
}

// Binding helpers.
export function useBind() {
  const dispatch = useDispatch();
  return {
    set: (path, value) => {
      dispatch(setField({ path, value }));
      dispatch(clearError(path));
    },
    toggle: (path, value) => {
      dispatch(toggleArrayField({ path, value }));
      dispatch(clearError(path));
    },
  };
}

export function useErrors() {
  return useSelector((s) => s.discovery?.errors ?? {});
}

export function useStepTouched(step) {
  return useSelector((s) => (s.discovery?.touchedSteps ?? []).includes(String(step)));
}
