import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice.js';
import servicesReducer from './servicesSlice.js';
import contactReducer from './contactSlice.js';
import contentReducer from './contentSlice.js';
import i18nReducer from './i18nSlice.js';
import authReducer from './authSlice.js';
import discoveryReducer from '../discovery/store/discoverySlice.js';
import { persistMiddleware } from './persist.js';
import { discoveryPersistMiddleware } from '../discovery/store/discoveryPersist.js';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    services: servicesReducer,
    contact: contactReducer,
    content: contentReducer,
    i18n: i18nReducer,
    auth: authReducer,
    discovery: discoveryReducer,
  },
  middleware: (getDefault) =>
    getDefault({ serializableCheck: false }).concat(persistMiddleware, discoveryPersistMiddleware),
});
