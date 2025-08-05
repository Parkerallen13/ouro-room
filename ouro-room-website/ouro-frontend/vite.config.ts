import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // ⬅️ Add this

export default defineConfig({
  plugins: [react()],
  base: "/",
  root: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ⬅️ Add this
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: false,
    watch: {
      usePolling: true,
    },
  },
});