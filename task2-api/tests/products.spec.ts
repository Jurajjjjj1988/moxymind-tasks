import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.REQRES_BASE_URL;
const PROJECT_KEY = process.env.REQRES_PROJECT_KEY;
const PROJECT_ID = process.env.REQRES_PROJECT_ID;

describe('GET /collections/products/records', () => {
  it('returns the 3 products from my collection', async () => {
    const res = await fetch(
      `${BASE_URL}/collections/products/records?project_id=${PROJECT_ID}`,
      { headers: { 'x-api-key': PROJECT_KEY! } },
    );

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.meta.total).toBe(3);
    expect(body.data).toHaveLength(3);

    const headphones = body.data.find((r) => r.data.name === 'Wireless Headphones');
    expect(headphones.data.price).toBe(59.99);
    expect(headphones.data.category).toBe('Electronics');
    expect(headphones.data.in_stock).toBe(true);

    const coffee = body.data.find((r) => r.data.name === 'Cold Brew Coffee Kit');
    expect(coffee.data.in_stock).toBe(false);
  });
});
