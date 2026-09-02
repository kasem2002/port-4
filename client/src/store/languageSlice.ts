import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Lang } from "@/types";

const LANG_KEY = "port4:lang";

/** Arabic is the default; English is only used when explicitly chosen. */
export const DEFAULT_LANG: Lang = "ar";

function readLang(): Lang {
  try {
    return localStorage.getItem(LANG_KEY) === "en" ? "en" : DEFAULT_LANG;
  } catch {
    // Private browsing or blocked storage — fall back to the default.
    return DEFAULT_LANG;
  }
}

interface LanguageState {
  lang: Lang;
}

const initialState: LanguageState = { lang: readLang() };

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<Lang>) {
      state.lang = action.payload;
      try {
        localStorage.setItem(LANG_KEY, action.payload);
      } catch {
        /* noop */
      }
    },
    toggleLang(state) {
      state.lang = state.lang === "en" ? "ar" : "en";
      try {
        localStorage.setItem(LANG_KEY, state.lang);
      } catch {
        /* noop */
      }
    },
  },
});

export const { setLang, toggleLang } = languageSlice.actions;
export default languageSlice.reducer;
