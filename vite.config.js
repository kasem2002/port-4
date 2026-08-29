import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this repo under /port-4/. Locally we want '/'.
const base = process.env.GITHUB_ACTIONS ? '/port-4/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  server: { port: 5173, host: true },
});
