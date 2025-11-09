import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const enableElectron = process.env.ELECTRON !== 'false'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),

    // Only include the Electron pipeline when enabled
    ...(enableElectron
      ? [
          electron({
            main: {
              // Shortcut of `build.lib.entry`.
              entry: 'electron/main.ts',
            },
            preload: {
              // Preload scripts may contain Web assets, so use `build.rollupOptions.input`
              input: path.join(__dirname, 'electron/preload.ts'),
            },
            // Polyfill Electron/Node APIs for the renderer only when Electron is on.
            // When disabled, omit to keep the browser build clean.
            renderer: process.env.NODE_ENV === 'test' ? undefined : {},
          }),
        ]
      : []),
  ],
})