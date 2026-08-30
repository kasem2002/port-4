import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice.js';
import servicesReducer from './servicesSlice.js';
import contactReducer from './contactSlice.js';
import contentReducer from './contentSlice.js';
import publishedReducer from './publishedSlice.js';
import i18nReducer from './i18nSlice.js';
import authReducer from './authSlice.js';
import discoveryReducer from '../discovery/store/discoverySlice.js';
import submissionsReducer from '../discovery/store/submissionsSlice.js';
import { persistMiddleware } from './persist.js';
import { discoveryPersistMiddleware } from '../discovery/store/discoveryPersist.js';
import { submissionsPersistMiddleware } from '../discovery/store/submissionsPersist.js';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    services: servicesReducer,
    contact: contactReducer,
    content: contentReducer,
    published: publishedReducer,
    i18n: i18nReducer,
    auth: authReducer,
    discovery: discoveryReducer,
    submissions: submissionsReducer,
  },
  middleware: (getDefault) =>
    getDefault({ serializableCheck: false }).concat(
      persistMiddleware,
      discoveryPersistMiddleware,
      submissionsPersistMiddleware,
    ),
});
