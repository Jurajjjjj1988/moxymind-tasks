import { startMock } from './server.js';

const PORT = 4571;
let stopFn: (() => Promise<void>) | null = null;

export async function setup() {
  // Skip the mock when the reviewer points the suite at the live reqres.in
  // (requires a real x-api-key as of late 2024 - see README).
  if (process.env.REQRES_BASE_URL) {
    return;
  }
  const { stop } = await startMock(PORT);
  stopFn = stop;
}

export async function teardown() {
  if (stopFn) {
    await stopFn();
  }
}
