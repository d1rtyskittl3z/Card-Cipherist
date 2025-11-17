/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // @ts-expect-error - Vitest bundles its own Vite version causing plugin type conflicts
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      all: true,
      include: ['src/store/**/*.ts', 'src/hooks/**/*.ts'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/__tests__/**',
        'dist/',
        'electron/',
        '*.config.{js,ts}',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/store/index.ts',
        'src/types/**',
      ],
    },
  },
});
