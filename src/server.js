import http from 'node:http';
import { jsonParse } from '../middleware/parser.js';
import { routes } from '../routes/routes.js';
import { processFile } from '../utils/csvParser.js';
import { urlSplitter } from '../utils/urlSplitter.js';

const PORT = 3333;
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  let [routePath, id, action] = urlSplitter(url);

  if (action) {
    routePath = routePath + '/' + action;
  }

  if (method === 'POST' && routePath === 'tasks-csv') {
    await processFile(req, res);
    return;
  }

  const route = routes.find((route) => {
    return route.method === method && route.path === routePath;
  });

  await jsonParse(req, res);

  if (route) {
    const data = {
      url: routePath,
      method,
      params: { id } ?? {},
      headers: req.headers,
      payload: req.body,
    };

    route.handler(req, res, data);
    return;
  }

  const notFound = (req, res) => {
    res.writeHead(404, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'The provided path was not found.' }));
  };

  return notFound(req, res);
});

server.listen(PORT, () => {
  console.log('Server running on port: ', PORT);
});
