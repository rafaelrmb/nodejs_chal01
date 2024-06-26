import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  markTaskAsCompleted,
  updateTaskHandler,
} from './handlers.js';

export const routes = [
  {
    method: 'GET',
    path: 'tasks',
    handler: getTasksHandler,
  },
  {
    method: 'POST',
    path: 'tasks',
    handler: createTaskHandler,
  },
  {
    method: 'DELETE',
    path: 'tasks',
    handler: deleteTaskHandler,
  },
  {
    method: 'PUT',
    path: 'tasks',
    handler: updateTaskHandler,
  },
  {
    method: 'PATCH',
    path: 'tasks/complete',
    handler: markTaskAsCompleted,
  },
];
