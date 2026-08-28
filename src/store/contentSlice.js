import { createSlice } from '@reduxjs/toolkit';
import { defaultContent } from '../data/defaults.js';

// Deep clone helper — plain JSON-safe values only.
const clone = (v) => JSON.parse(JSON.stringify(v));

const initialState = clone(defaultContent);

// Utility: walk a dot path within state (e.g. "hero.subcopy").
function setByPath(obj, path, value) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (cur[k] === undefined || cur[k] === null) cur[k] = {};
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
}

function getByPath(obj, path) {
  return path.split('.').reduce((a, k) => (a == null ? a : a[k]), obj);
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    // Set a single field by path. `value` can be anything (string, number, object, array).
    setField(state, action) {
      const { path, value } = action.payload;
      setByPath(state, path, value);
    },
    // Set one localized side of a field ({ en, ar }).
    setLocalized(state, action) {
      const { path, lang, value } = action.payload;
      const existing = getByPath(state, path);
      const merged =
        existing && typeof existing === 'object' && !Array.isArray(existing)
          ? { ...existing, [lang]: value }
          : { en: '', ar: '', [lang]: value };
      setByPath(state, path, merged);
    },
    // Append an item to a list.
    addListItem(state, action) {
      const { path, item } = action.payload;
      const arr = getByPath(state, path);
      if (Array.isArray(arr)) arr.push(clone(item));
    },
    // Remove an item at index from a list.
    removeListItem(state, action) {
      const { path, index } = action.payload;
      const arr = getByPath(state, path);
      if (Array.isArray(arr)) arr.splice(index, 1);
    },
    // Move item at `from` to `to` in a list.
    moveListItem(state, action) {
      const { path, from, to } = action.payload;
      const arr = getByPath(state, path);
      if (!Array.isArray(arr)) return;
      if (to < 0 || to >= arr.length) return;
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
    },
    // Set a whole list to a new array.
    setList(state, action) {
      const { path, list } = action.payload;
      setByPath(state, path, clone(list));
    },
    // For "featured" toggles: unset featured on every item except `index`.
    setFeatured(state, action) {
      const { path, index } = action.payload;
      const arr = getByPath(state, path);
      if (!Array.isArray(arr)) return;
      arr.forEach((item, i) => {
        if (item && typeof item === 'object') item.featured = i === index;
      });
    },
    // Wholesale reset back to defaults.
    resetAll() {
      return clone(defaultContent);
    },
    // Rehydrate from persisted storage — replace state entirely.
    hydrate(state, action) {
      const next = action.payload;
      if (!next || typeof next !== 'object') return state;
      return next;
    },
  },
});

export const {
  setField,
  setLocalized,
  addListItem,
  removeListItem,
  moveListItem,
  setList,
  setFeatured,
  resetAll,
  hydrate,
} = contentSlice.actions;

export default contentSlice.reducer;
