import { startMock } from './server.js';

let stop: () => Promise<void> = async () => {};

export async function setup() {
  const server = await startMock(4571);
  stop = server.stop;
}

export async function teardown() {
  await stop();
}
