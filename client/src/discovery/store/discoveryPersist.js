import { hydrateDiscovery } from './discoverySlice.js';

const KEY = 'port4:discovery:v1';

export function loadDiscovery() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveDiscovery(state) {
  try {
    // Assets can hold base64 dataURLs — cap what we persist to stay under quota.
    const persistable = {
      step: state.step,
      furthestStep: state.furthestStep,
      touchedSteps: state.touchedSteps,
      form: {
        ...state.form,
        // Drop dataUrls on assets and product images when persisting; they can
        // fill localStorage quickly. The metadata (name/size) stays.
        assets: state.form.assets.map((a) => ({ ...a, dataUrl: null })),
        brand: {
          ...state.form.brand,
          logo: state.form.brand.logo ? { ...state.form.brand.logo, dataUrl: null } : null,
        },
        services: {
          ...state.form.services,
          products: state.form.services.products.map((p) => ({
            ...p,
            image: p.image ? { ...p.image, dataUrl: null } : null,
          })),
        },
        team: {
          ...state.form.team,
          members: state.form.team.members.map((m) => ({
            ...m,
            photo: m.photo ? { ...m.photo, dataUrl: null } : null,
          })),
        },
      },
    };
    localStorage.setItem(KEY, JSON.stringify(persistable));
  } catch {
    /* quota exceeded or blocked */
  }
}

export function clearDiscovery() {
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
}

// Middleware: persists discovery state after each mutating action.
export const discoveryPersistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (typeof action.type === 'string' && action.type.startsWith('discovery/')) {
    const state = store.getState();
    if (state.discovery) saveDiscovery(state.discovery);
  }
  return result;
};

export function hydrateDiscoveryStore(store) {
  const data = loadDiscovery();
  if (!data) return;
  store.dispatch(hydrateDiscovery(data));
}
