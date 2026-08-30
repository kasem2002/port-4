import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loaderDone: false,
    mobileMenuOpen: false,
    language: 'EN',
  },
  reducers: {
    finishLoader(state) {
      state.loaderDone = true;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { finishLoader, toggleMobileMenu, closeMobileMenu, setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
