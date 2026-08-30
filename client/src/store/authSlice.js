import { createSlice } from '@reduxjs/toolkit';

// Simple client-side gate for the dashboard. Not production security —
// wire a real backend before shipping.
const DEFAULT_PASSCODE = 'port4';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    passcode: DEFAULT_PASSCODE,
    error: null,
  },
  reducers: {
    attemptLogin(state, action) {
      if (action.payload === state.passcode) {
        state.loggedIn = true;
        state.error = null;
      } else {
        state.error = 'incorrect';
      }
    },
    logout(state) {
      state.loggedIn = false;
      state.error = null;
    },
    setPasscode(state, action) {
      state.passcode = action.payload || DEFAULT_PASSCODE;
    },
    hydrate(state, action) {
      const next = action.payload;
      if (!next) return state;
      return { ...state, ...next };
    },
  },
});

export const { attemptLogin, logout, setPasscode, hydrate: hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
