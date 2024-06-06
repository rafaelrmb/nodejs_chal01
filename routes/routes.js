import { createTaskHandler, getTasksHandler } from './handlers.js';

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: getTasksHandler,
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: createTaskHandler,
  },
];
