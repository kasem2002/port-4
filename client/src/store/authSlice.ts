import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AdminUser } from "@/types";

const TOKEN_KEY = "port4:token";

/**
 * The JWT is the only thing kept in localStorage — it survives a reload so the
 * dashboard doesn't ask for a password on every refresh. Everything else the
 * dashboard shows comes from the server.
 */
function readToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

interface AuthState {
  token: string | null;
  admin: AdminUser | null;
}

const initialState: AuthState = {
  token: readToken(),
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; admin: AdminUser }>) {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
      try {
        localStorage.setItem(TOKEN_KEY, action.payload.token);
      } catch {
        // Private browsing or blocked storage — the session still works,
        // it just won't survive a reload.
      }
    },
    /** Fills in the admin profile after a `GET /auth/me` on a restored token. */
    setAdmin(state, action: PayloadAction<AdminUser>) {
      state.admin = action.payload;
    },
    logout(state) {
      state.token = null;
      state.admin = null;
      try {
        localStorage.removeItem(TOKEN_KEY);
      } catch {
        /* noop */
      }
    },
  },
});

export const { setCredentials, setAdmin, logout } = authSlice.actions;
export default authSlice.reducer;
