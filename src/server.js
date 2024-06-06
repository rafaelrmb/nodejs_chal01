import http from 'node:http';
import { jsonParse } from '../middleware/parser.js';
import { routes } from '../routes/routes.js';

const PORT = 3333;
const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  await jsonParse(req, res);

  if (route) {
    const data = {
      url,
      method,
      headers: req.headers,
      payload: req.body,
    };

    route.handler(req, res, data);
  }

  const notFound = (req, res) => {
    res.writeHead(404, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'The provided path was not found.' }));
  };

  return notFound;
});

server.listen(PORT, () => {
  console.log('Server running on port: ', PORT);
});
