import { hydrateSubmissions } from './submissionsSlice.js';

const KEY = 'port4:submissions:v1';

// Persist submissions to their own localStorage key. Kept separate from the
// in-flight discovery form so an owner viewing their dashboard can't clobber
// or be clobbered by a client filling the form in the same browser tab.

export function loadSubmissions() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveSubmissions(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* quota exceeded or blocked */
  }
}

export const submissionsPersistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (typeof action.type === 'string' && action.type.startsWith('submissions/')) {
    const state = store.getState();
    if (state.submissions) saveSubmissions(state.submissions);
  }
  return result;
};

export function hydrateSubmissionsStore(store) {
  const data = loadSubmissions();
  if (!data) return;
  store.dispatch(hydrateSubmissions(data));
}
