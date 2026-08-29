import { hydrate as hydrateContent } from './contentSlice.js';
import { hydratePublished } from './publishedSlice.js';
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

// Middleware factory: writes a snapshot of content + published + i18n + auth
// to localStorage after every dispatch.
export const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  savePersisted({
    content: state.content,
    published: state.published,
    lang: state.i18n.lang,
    auth: { loggedIn: state.auth.loggedIn, passcode: state.auth.passcode },
  });
  return result;
};

export function hydrateStore(store) {
  const data = loadPersisted();
  if (!data) return;

  if (data.content) store.dispatch(hydrateContent(data.content));

  // Migration: existing users who saved content before draft/publish existed
  // have no `published` field. Seed it from their existing content so the
  // public site keeps rendering their previous edits instead of resetting
  // to defaults.
  if (data.published) {
    store.dispatch(hydratePublished(data.published));
  } else if (data.content) {
    store.dispatch(hydratePublished(data.content));
  }

  if (data.lang) store.dispatch(setLang(data.lang));
  if (data.auth) store.dispatch(hydrateAuth(data.auth));
}
