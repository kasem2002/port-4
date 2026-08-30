import { createSlice } from '@reduxjs/toolkit';

// A submission is a snapshot of the entire brief form + metadata: id (uuid),
// receivedAt (owner's clock when imported), submittedAt (client's clock),
// businessName (denormalized so the list can render without opening each row).
const initialState = {
  items: [],   // newest-first
  seen: {},    // { id: true } — the owner has opened this brief at least once
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    importSubmission(state, action) {
      const payload = action.payload;
      if (!payload || !payload.form) return;

      // De-dupe by id if the same file is dropped twice.
      const existing = state.items.find((x) => x.id === payload.id);
      if (existing) {
        Object.assign(existing, payload);
        return;
      }
      state.items.unshift(payload);
    },
    removeSubmission(state, action) {
      state.items = state.items.filter((x) => x.id !== action.payload);
      delete state.seen[action.payload];
    },
    markSeen(state, action) {
      state.seen[action.payload] = true;
    },
    hydrateSubmissions(state, action) {
      const p = action.payload;
      if (!p) return;
      if (Array.isArray(p.items)) state.items = p.items;
      if (p.seen && typeof p.seen === 'object') state.seen = p.seen;
    },
    clearAll() {
      return initialState;
    },
  },
});

export const {
  importSubmission,
  removeSubmission,
  markSeen,
  hydrateSubmissions,
  clearAll,
} = submissionsSlice.actions;

export default submissionsSlice.reducer;
