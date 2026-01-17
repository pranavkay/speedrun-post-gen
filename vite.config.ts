import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/speedrun-post-gen/',
  plugins: [react()],
});
