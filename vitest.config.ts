import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  plugins: [
    // SWC handles NestJS decorators (@Controller, @Injectable) seamlessly in Vitest
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  resolve: {
    // Native Vite 5+ tsconfig paths resolution
    tsconfigPaths: true,
    alias: [
      {
        find: /^(\.{1,2}\/.*)\.js$/,
        replacement: '$1',
      },
    ],
  },
  test: {
    globals: true,
    root: './',
    include: ['src/**/*.spec.ts', 'src/**/*.e2e-spec.ts'],
    environment: 'node',
  },
});