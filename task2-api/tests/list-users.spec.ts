import { describe, it, expect } from 'vitest';

const BASE_URL = 'http://127.0.0.1:4571/api';
const API_KEY = 'mock';

describe('GET /users?page=2', () => {
  it('returns the expected users and pagination metadata', async () => {
    const res = await fetch(`${BASE_URL}/users?page=2`, {
      headers: { 'x-api-key': API_KEY },
    });

    expect(res.status).toBe(200);

    const body = await res.json();
    const { total, per_page, data } = body;
    const [first, second] = data;

    expect(total).toBe(12);
    expect(first.last_name).toBe('Lukáč');
    expect(second.last_name).toBe('Polák');
    expect(data).toHaveLength(per_page);
  });
});
