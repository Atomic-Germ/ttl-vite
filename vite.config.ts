import { defineConfig } from 'vite';

const host: string | boolean = process.env.TAURI_DEV_HOST || false;

export default defineConfig({
  clearScreen: false,
  server: {
    strictPort: true,
    host: host,
    port: 5173,
  },
  envPrefix: ['VITE_', 'TAURI_ENV_*'],
  build: {
    target: process.env.TAURI_ENV_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
    minify: process.env.TAURI_ENV_DEBUG ? false : 'esbuild',
    sourcemap: !!process.env.TAURI_ENV_DEBUG,
  },
});