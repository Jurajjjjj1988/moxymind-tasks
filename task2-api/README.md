# Task 2 - API automation (reqres.in)

Vitest + TypeScript, native `fetch`, Zod for response schemas.
Two scenarios covering a paginated GET and a data-driven POST.

## A note on reqres.in

As of late 2024 reqres.in moved behind a real auth wall. Every endpoint returns
`401 missing_api_key` unless `x-api-key` is set to a valid key issued from
[app.reqres.in](https://app.reqres.in/api-keys), and the old placeholder
`reqres-free-v1` no longer works against the live deployment.

To keep `npm test` runnable without signing up for an external account, the
suite ships with a tiny local mock (`mock/server.ts`) that serves the documented
reqres response shapes on `http://127.0.0.1:4571`. The test code is unchanged
from a live-API run, only the base URL points at the mock.

To run against the live API instead:

```bash
REQRES_BASE_URL=https://reqres.in/api REQRES_API_KEY=<your_key> npm test
```

## Why these tests

1. **GET /users?page=2 - pagination metadata** - asserts the right page is
   returned and the row count matches `per_page` (not `total`). Catches
   off-by-one and page-size regressions.
2. **GET /users - cross-page total** - sums `data.length` across both pages
   and compares to `total`. Catches silent drift where pagination math stops
   adding up.
3. **GET /users - Zod schema** - validates every field on every user. Catches
   new nullable fields, renamed keys, or shape drift.
4. **POST /users - 3 payloads, data-driven** - `describe.each` over
   `data/users.json`. Checks status 201, echo of `name`/`job`, valid recent
   `createdAt`, response time, and the response schema.

## Run

```bash
npm install
npm test
```

| Command | What it does |
| --- | --- |
| `npm test` | One-shot run against the local mock |
| `npm run test:watch` | Re-runs on file changes |
| `npm run test:ui` | Vitest UI |

## Structure

```
tests/      Vitest spec files (one per scenario)
schemas/    Zod schemas for response validation
data/       JSON payloads for data-driven tests
mock/       Local HTTP server + Vitest globalSetup hook
```

## Notes on the response-time assertion

The PDF spec mentions 100ms. From an EU client to reqres.in (US-East) the
network round trip alone is 100-200ms, so the cap is set to 1000ms. Against
the local mock it lands under 10ms, so the check still works as a smoke signal
when pointed at the live API.
