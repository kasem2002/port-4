import { hydrate as hydrateContent } from './contentSlice.js';
import { hydrateAuth } from './authSlice.js';
import { setLang } from './i18nSlice.js';

const KEY = 'port4:v1';

export function loadPersisted() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function savePersisted(payload) {
  try {
    localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    /* storage full or blocked */
  }
}

export function clearPersisted() {
  try {
    localStorage.removeItem(KEY);
  } catch { /* noop */ }
}

// Middleware factory: writes a snapshot of content + i18n + auth to localStorage
// after every dispatch. Skips its own hydrate actions.
export const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  savePersisted({
    content: state.content,
    lang: state.i18n.lang,
    auth: { loggedIn: state.auth.loggedIn, passcode: state.auth.passcode },
  });
  return result;
};

export function hydrateStore(store) {
  const data = loadPersisted();
  if (!data) return;
  if (data.content) store.dispatch(hydrateContent(data.content));
  if (data.lang) store.dispatch(setLang(data.lang));
  if (data.auth) store.dispatch(hydrateAuth(data.auth));
}
