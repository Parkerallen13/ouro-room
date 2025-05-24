// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 5173, // You can change this if needed
    open: true,
  }
})