// frontend/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    host: "0.0.0.0", // Required: allows access from host
    port: 5173,
    open: false, // Prevent error from trying to auto-open browser in Docker
    watch: {
      usePolling: true, // Required for file changes to be detected in Docker
    },
  },
});
