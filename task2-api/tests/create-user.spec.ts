import { describe, it, expect } from 'vitest';
import { createUserResponseSchema } from '../schemas/create-user.js';
import users from '../data/users.json' with { type: 'json' };

const BASE_URL = process.env.REQRES_BASE_URL ?? 'http://127.0.0.1:4571/api';
const API_KEY = process.env.REQRES_API_KEY ?? 'mock';

// 1000ms cap instead of the 100ms in the spec sheet.
// reqres is served from US-East and EU clients routinely see 200-600ms RTT,
// plus TLS handshake on cold connections. 100ms is unrealistic from outside US.
const MAX_RESPONSE_MS = 1000;

describe.each(users)('POST /users with payload %o', (payload) => {
  it(`creates a user with name=${payload.name}`, async () => {
    const sentAt = Date.now();

    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const elapsed = Date.now() - sentAt;

    expect(res.status).toBe(201);
    expect(elapsed).toBeLessThan(MAX_RESPONSE_MS);

    const body = await res.json();

    expect(body.id).toBeTruthy();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);

    const createdAt = new Date(body.createdAt);
    expect(Number.isNaN(createdAt.getTime())).toBe(false);

    const ageMs = Date.now() - createdAt.getTime();
    expect(ageMs).toBeGreaterThanOrEqual(0);
    expect(ageMs).toBeLessThan(60_000);

    const parsed = createUserResponseSchema.safeParse(body);
    if (!parsed.success) {
      throw new Error(`Schema mismatch: ${parsed.error.message}`);
    }
  });
});
