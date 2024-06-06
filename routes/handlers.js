import { randomUUID } from 'node:crypto';
import { Database } from '../database/database.js';

const db = new Database();

export const getTasksHandler = (req, res, data) => {
  const id = data.params.id;
  let tasks = [];

  if (id) {
    tasks = db.findById('tasks', id);
  } else {
    tasks = db.findAll('tasks');
  }

  return res
    .writeHead(200, { 'Content-type': 'application/json' })
    .end(JSON.stringify(tasks));
};

export const createTaskHandler = (req, res, data) => {
  const { title, description } = data.payload;

  if (title && description) {
    const newTask = {
      id: randomUUID(),
      title,
      description,
      created_at: new Date(),
      updated_at: new Date(),
      completed_at: null,
    };

    db.insert('tasks', newTask);

    res
      .writeHead(201, { 'Content-type': 'application/json' })
      .end(JSON.stringify(newTask));
    return newTask;
  }

  res.writeHead(400, { 'Content-type': 'application/json' });
  res.end(
    JSON.stringify({ message: 'Please send the correct data to the server.' })
  );
};

export const deleteTaskHandler = (req, res, data) => {
  const { id } = data.params;
  const foundTask = db.findById('tasks', id);

  if (foundTask) {
    db.deleteTask('tasks', foundTask);
    return res.writeHead(204, { 'Content-type': 'application/json' }).end();
  }

  return res
    .writeHead(404, { 'Content-type': 'application/json' })
    .end(JSON.stringify({ message: 'No task find with the id', id }));
};
