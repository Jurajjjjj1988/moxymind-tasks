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

- **GET pagination metadata** - page 2, asserts `data.length === per_page`
  and that the first two `last_name` values are "Lawson" and "Ferguson".
  A classic off-by-one sentinel.
- **GET cross-page total** - sums rows across all pages and compares to
  `total`. Catches pagination math drift.
- **GET schema** - the whole response through Zod. The most important test
  in the file - new nullable fields, renamed keys, or type changes show up
  here in one shot.
- **POST data-driven** - three payloads via `describe.each`. Per payload:
  status 201, echo of name/job, `createdAt` younger than 60s, response time,
  and the response schema.

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
