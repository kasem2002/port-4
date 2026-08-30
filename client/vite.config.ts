import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Both are served by the API in development; in production the API
      // serves this build from the same origin, so no proxy is involved.
      "/api": { target: "http://localhost:4000", changeOrigin: true },
      "/uploads": { target: "http://localhost:4000", changeOrigin: true },
    },
  },
  build: {
    // The public site, the dashboard and the discovery form are separate
    // routes; splitting them keeps a client opening the form from downloading
    // the admin UI.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
