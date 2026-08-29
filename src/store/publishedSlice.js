import { createSlice } from '@reduxjs/toolkit';
import { defaultContent } from '../data/defaults.js';

const clone = (v) => JSON.parse(JSON.stringify(v));

// Published content is what the public site renders. Dashboard edits go to
// contentSlice (the draft); clicking Save publishes the draft here.
const publishedSlice = createSlice({
  name: 'published',
  initialState: clone(defaultContent),
  reducers: {
    // Copy the draft into the published slot.
    publish(state, action) {
      return clone(action.payload);
    },
    // Restore from persisted storage without going through publish flow.
    hydratePublished(state, action) {
      const next = action.payload;
      if (!next || typeof next !== 'object') return state;
      return next;
    },
  },
});

export const { publish, hydratePublished } = publishedSlice.actions;
export default publishedSlice.reducer;
