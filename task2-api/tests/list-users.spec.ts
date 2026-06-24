import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.REQRES_BASE_URL;
const API_KEY = process.env.REQRES_API_KEY;

describe('GET /users?page=2', () => {
  it('returns the second page with the expected pagination metadata', async () => {
    const res = await fetch(`${BASE_URL}/users?page=2`, {
      headers: { 'x-api-key': API_KEY! },
    });

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.page).toBe(2);
    expect(body.per_page).toBe(6);
    expect(body.total).toBe(12);
    expect(body.data).toHaveLength(body.per_page);
  });
});
