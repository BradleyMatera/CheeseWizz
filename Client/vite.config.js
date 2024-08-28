import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration with buffer polyfill
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  optimizeDeps: {
    include: ['buffer'],
  },
});