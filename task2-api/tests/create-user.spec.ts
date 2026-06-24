import { describe, it, expect } from 'vitest';
import users from '../data/users.json' with { type: 'json' };

const BASE_URL = process.env.REQRES_BASE_URL;
const API_KEY = process.env.REQRES_API_KEY;

describe('POST /users', () => {
  users.forEach((payload) => {
    it(`creates user ${payload.name}`, async () => {
      const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      expect(res.status).toBe(201);

      const body = await res.json();
      expect(body.id).toBeTruthy();
      expect(body.name).toBe(payload.name);
      expect(body.job).toBe(payload.job);
      expect(new Date(body.createdAt).getTime()).toBeGreaterThan(0);
    });
  });
});
