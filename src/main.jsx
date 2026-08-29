import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store.js';
import { hydrateStore } from './store/persist.js';
import App from './App.jsx';
import './index.css';

// Hydrate persisted content/lang/auth BEFORE the first render so the site
// paints in the correct language and with saved edits already applied.
hydrateStore(store);

// When served under a sub-path (e.g. GitHub Pages), Vite injects BASE_URL like
// "/port-4/". Trim the trailing slash for react-router's basename.
const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
