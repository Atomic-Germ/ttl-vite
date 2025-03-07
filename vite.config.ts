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
      },
      manifest: {
        'name': 'Time to Leave',
        'short_name': 'TTL',
        'icons': [
          {
            'src': '/src/assets/pwa-192x192.png',
            'sizes': '192x192',
            'type': 'image/png',
            'purpose': 'any'
          },
          {
            'src': '/src/assets/pwa-512x512.png',
            'sizes': '512x512',
            'type': 'image/png',
            'purpose': 'any'
          },
          {
            'src': '/src/assets/pwa-maskable-192x192.png',
            'sizes': '192x192',
            'type': 'image/png',
            'purpose': 'maskable'
          },
          {
            'src': '/src/assets/pwa-maskable-512x512.png',
            'sizes': '512x512',
            'type': 'image/png',
            'purpose': 'maskable'
          }
        ],
        'start_url': '/',
        'display': 'standalone',
        'background_color': '#363636',
        'theme_color': '#919191',
        'description': 'Timeclock that tells you when to leave'
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
