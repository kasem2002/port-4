import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  loaderDone: boolean;
  mobileMenuOpen: boolean;
}

const initialState: UiState = {
  loaderDone: false,
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
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
  },
});

export const { finishLoader, toggleMobileMenu, closeMobileMenu } = uiSlice.actions;
export default uiSlice.reducer;
