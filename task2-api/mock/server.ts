import { createServer, IncomingMessage, ServerResponse } from 'node:http';

const PAGE_2 = [
  { id: 7, email: 'pavol.lukac@reqres.in', first_name: 'Pavol', last_name: 'Lukáč' },
  { id: 8, email: 'andrea.polak@reqres.in', first_name: 'Andrea', last_name: 'Polák' },
  { id: 9, email: 'tomas.hudak@reqres.in', first_name: 'Tomáš', last_name: 'Hudák' },
  { id: 10, email: 'katarina.hruba@reqres.in', first_name: 'Katarína', last_name: 'Hrubá' },
  { id: 11, email: 'michal.bartos@reqres.in', first_name: 'Michal', last_name: 'Bartoš' },
  { id: 12, email: 'veronika.mucha@reqres.in', first_name: 'Veronika', last_name: 'Mucha' },
];

function pageBody(page: number) {
  return {
    page,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: page === 2 ? PAGE_2 : [],
  };
}

function handle(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      const payload = JSON.parse(body || '{}');
      res.writeHead(201, { 'content-type': 'application/json' });
      res.end(
        JSON.stringify({
          ...payload,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }),
      );
    });
    return;
  }

  const url = new URL(req.url ?? '/', 'http://localhost');
  const page = Number(url.searchParams.get('page') ?? '1');
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify(pageBody(page)));
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
