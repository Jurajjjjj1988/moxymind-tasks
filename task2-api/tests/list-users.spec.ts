import { describe, it, expect } from 'vitest';
import { listUsersSchema } from '../schemas/user.js';

// Default target is the bundled local mock (mock/server.ts) so `npm test`
// works out of the box. Point at the live API by exporting REQRES_BASE_URL
// and REQRES_API_KEY - see README.
const BASE_URL = process.env.REQRES_BASE_URL ?? 'http://127.0.0.1:4571/api';
const API_KEY = process.env.REQRES_API_KEY ?? 'mock';

describe('GET /users', () => {
  it('returns page 2 with the expected users and pagination metadata', async () => {
    const res = await fetch(`${BASE_URL}/users?page=2`, {
      headers: { 'x-api-key': API_KEY },
    });

    expect(res.status).toBe(200);

    const body = await res.json();

    expect(body.total).toBe(12);
    expect(body.data[0].last_name).toBe('Lawson');
    expect(body.data[1].last_name).toBe('Ferguson');

    // data.length matches per_page on a single page, not total.
    // total is the row count across the whole collection.
    expect(body.data.length).toBe(body.per_page);
  });

  it('returns combined row count equal to total across all pages', async () => {
    const page1 = await fetch(`${BASE_URL}/users?page=1`, {
      headers: { 'x-api-key': API_KEY },
    }).then((r) => r.json());

    const page2 = await fetch(`${BASE_URL}/users?page=2`, {
      headers: { 'x-api-key': API_KEY },
    }).then((r) => r.json());

    const combined = page1.data.length + page2.data.length;
    expect(combined).toBe(page1.total);
  });

  it('matches the full response schema', async () => {
    const res = await fetch(`${BASE_URL}/users?page=2`, {
      headers: { 'x-api-key': API_KEY },
    });
    const body = await res.json();

    const parsed = listUsersSchema.safeParse(body);
    if (!parsed.success) {
      throw new Error(`Schema mismatch: ${parsed.error.message}`);
    }
  });
});
