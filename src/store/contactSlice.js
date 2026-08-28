import { createSlice } from '@reduxjs/toolkit';

const initialForm = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
};

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    form: initialForm,
    status: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
  },
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    resetForm(state) {
      state.form = initialForm;
      state.status = 'idle';
    },
  },
});

export const { updateField, setStatus, resetForm } = contactSlice.actions;
export default contactSlice.reducer;
