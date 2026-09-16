import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['src/**/*.spec.ts', 'src/**/*.e2e-spec.ts'],
    environment: 'node',
    // Force Vitest to inline tsconfig path mappings & ESM transforms
    server: {
      deps: {
        fallbackCJS: true,
      },
    },
  },
  resolve: {
    // Allows importing .js extensions in TypeScript files under ESM
    extensions: ['.ts', '.js', '.json', '.node'],
    alias: [
      {
        find: /^(.*)\.js$/,
        replacement: '$1',
      },
    ],
  },
});