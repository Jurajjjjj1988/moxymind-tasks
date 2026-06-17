import { describe, it, expect } from 'vitest';
import users from '../data/users.json' with { type: 'json' };

const BASE_URL = 'http://127.0.0.1:4571/api';
const API_KEY = 'mock';

describe('POST /users', () => {
  users.forEach((payload) => {
    it(`creates user ${payload.name}`, async () => {
      const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      expect(res.status).toBe(201);

      const body = await res.json();
      expect(body.id).toBeTruthy();
      expect(body.name).toBe(payload.name);
      expect(body.job).toBe(payload.job);

      const createdAt = new Date(body.createdAt);
      expect(Number.isNaN(createdAt.getTime())).toBe(false);
    });
  });
});
