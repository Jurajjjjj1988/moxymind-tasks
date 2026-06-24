# task2

Vitest + TypeScript against the real reqres.in API. Keys live in `.env`.

```bash
npm install
# create a .env with your reqres key(s) — see the keys listed below
npm test
```

3 specs.

`list-users.spec.ts`

`GET /users?page=2`. Checks 200 and the pagination metadata (page, per_page, total, and that `data.length` matches `per_page`). Asserts the shape, not specific names — the data is reqres's, not mine.

`create-user.spec.ts`

`POST /users`, data-driven over `data/users.json` (3 rows: pavol, mária, tomáš). Each asserts 201, a truthy `id`, that `name` and `job` echo the payload, and a valid `createdAt`.

`products.spec.ts`

`GET /collections/products/records?project_id=...` — my own collection (uses the project key). Asserts exact values (Wireless Headphones $59.99, Cold Brew out of stock) because I own the data.

Keys come from `.env`: `REQRES_BASE_URL`, `REQRES_API_KEY` (free, classic API), `REQRES_PROJECT_KEY` (pro, collections), `REQRES_PROJECT_ID`. dotenv loads `.env` via vitest `setupFiles`. `.env` is gitignored.

The first version used a local `node:http` mock (self-contained, no keys needed). It was replaced by these real-API tests.
