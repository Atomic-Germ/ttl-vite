import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const host: string | boolean = process.env.TAURI_DEV_HOST || false;

export default defineConfig({
  plugins: [
    // Allows creating service workers
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      }
    })
  ],
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
