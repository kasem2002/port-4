import { createSlice } from '@reduxjs/toolkit';

const i18nSlice = createSlice({
  name: 'i18n',
  initialState: {
    lang: 'en',
  },
  reducers: {
    setLang(state, action) {
      state.lang = action.payload === 'ar' ? 'ar' : 'en';
    },
    toggleLang(state) {
      state.lang = state.lang === 'en' ? 'ar' : 'en';
    },
  },
});

export const { setLang, toggleLang } = i18nSlice.actions;
export default i18nSlice.reducer;
