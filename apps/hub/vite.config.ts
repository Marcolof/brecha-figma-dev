import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // El contenido vive en packages/content (fuera de apps/hub): permitir leerlo en dev.
  server: { port: 5173, fs: { allow: ['../..'] } },
  preview: { port: 4180, strictPort: true },
  // theme.ts y tokens.json se leen como texto (?raw) para descargarlos, no se ejecutan.
});
