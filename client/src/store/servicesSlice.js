import { createSlice } from '@reduxjs/toolkit';

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    activeIndex: 0,
  },
  reducers: {
    setActiveService(state, action) {
      state.activeIndex = action.payload;
    },
  },
});

export const { setActiveService } = servicesSlice.actions;
export default servicesSlice.reducer;
