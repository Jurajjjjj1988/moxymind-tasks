import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 15000,
    retry: process.env.CI ? 2 : 0,
    setupFiles: ['dotenv/config'],
  },
});
