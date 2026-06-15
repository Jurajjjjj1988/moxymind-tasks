import { createServer, IncomingMessage, ServerResponse } from 'node:http';

const SUPPORT = {
  url: 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral',
  text: 'Tired of writing endless social media content? Try Content Caddy.',
};

const PAGE_1 = [
  { id: 1, email: 'george.bluth@reqres.in', first_name: 'George', last_name: 'Bluth' },
  { id: 2, email: 'janet.weaver@reqres.in', first_name: 'Janet', last_name: 'Weaver' },
  { id: 3, email: 'emma.wong@reqres.in', first_name: 'Emma', last_name: 'Wong' },
  { id: 4, email: 'eve.holt@reqres.in', first_name: 'Eve', last_name: 'Holt' },
  { id: 5, email: 'charles.morris@reqres.in', first_name: 'Charles', last_name: 'Morris' },
  { id: 6, email: 'tracey.ramos@reqres.in', first_name: 'Tracey', last_name: 'Ramos' },
];

const PAGE_2 = [
  { id: 7, email: 'michael.lawson@reqres.in', first_name: 'Michael', last_name: 'Lawson' },
  { id: 8, email: 'lindsay.ferguson@reqres.in', first_name: 'Lindsay', last_name: 'Ferguson' },
  { id: 9, email: 'tobias.funke@reqres.in', first_name: 'Tobias', last_name: 'Funke' },
  { id: 10, email: 'byron.fields@reqres.in', first_name: 'Byron', last_name: 'Fields' },
  { id: 11, email: 'george.edwards@reqres.in', first_name: 'George', last_name: 'Edwards' },
  { id: 12, email: 'rachel.howell@reqres.in', first_name: 'Rachel', last_name: 'Howell' },
];

function withAvatars(rows: { id: number; email: string; first_name: string; last_name: string }[]) {
  return rows.map((r) => ({ ...r, avatar: `https://reqres.in/img/faces/${r.id}-image.jpg` }));
}

function pageBody(page: number) {
  const data = page === 1 ? PAGE_1 : page === 2 ? PAGE_2 : [];
  return {
    page,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: withAvatars(data),
    support: SUPPORT,
  };
}

function handle(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? '/', 'http://localhost');

  if (req.method === 'GET' && url.pathname === '/api/users') {
    const page = Number(url.searchParams.get('page') ?? '1');
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(pageBody(page)));
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/users') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      const payload = body ? JSON.parse(body) : {};
      res.writeHead(201, { 'content-type': 'application/json' });
      res.end(
        JSON.stringify({
          ...payload,
          id: String(Math.floor(Math.random() * 900) + 100),
          createdAt: new Date().toISOString(),
        }),
      );
    });
    return;
  }

  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: 'not_found' }));
}

export function startMock(port: number) {
  const server = createServer(handle);
  return new Promise<{ stop: () => Promise<void> }>((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      resolve({
        stop: () =>
          new Promise<void>((r) => {
            server.close(() => r());
          }),
      });
    });
  });
}
