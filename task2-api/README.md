# task2

Vitest + TypeScript.
reqres now needs a paid api key for every endpoint, so tests hit a small local mock on port 4571 with the same payload shapes.
`vitest.config.ts` boots it via
`globalSetup` and shuts it down after, so
`npm test` works on a clean clone with no env vars.

```bash
npm install
npm test
```

Two specs.

`list-users.spec.ts`

`GET /users?page=2`. Checks the 200, that `total` is 12, that the first two users on page 2 are Lukáč and Polák, and that `data.length` matches the returned `per_page`.

`create-user.spec.ts`

`POST /users`, data-driven over `data/users.json` (3 rows: pavol, mária, tomáš).
Each row asserts 201, a truthy `id`, that `name` and `job` echo the payload, and that `createdAt` parses as a valid date.

Folder layout is the usual:
`tests/` for specs,
`data/` for the JSON payload set,
`mock/` for the server and setup hook.
