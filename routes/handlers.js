import { randomUUID } from 'node:crypto';
import { Database } from '../database/database.js';

const db = new Database();

export const getTasksHandler = (req, res, data) => {
  const { id } = data.params;
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
  const foundTask = findItemById('tasks', data);

  if (foundTask) {
    db.delete('tasks', foundTask);
    return res.writeHead(204, { 'Content-type': 'application/json' }).end();
  }

  returnNotFoundItem(res);
};

export const updateTaskHandler = (req, res, data) => {
  const foundTask = findItemById('tasks', data);

  const { title, description } = data.payload;

  if (foundTask) {
    const updatedTask = {
      title: title ?? foundTask.title,
      description: description ?? foundTask.description,
    };

    const changedDbResult = db.update('tasks', foundTask, updatedTask);

    return res
      .writeHead(200, { 'Content-type': 'application/json' })
      .end(JSON.stringify(changedDbResult));
  }

  returnNotFoundItem(res);
};

export const markTaskAsCompleted = (req, res, data) => {
  const foundTask = findItemById('tasks', data);

  if (foundTask) {
    const completedItem = db.patch('tasks', foundTask);

    return res
      .writeHead(200, { 'Content-type': 'application/json' })
      .end(JSON.stringify(completedItem));
  }

  returnNotFoundItem(res);
};

const findItemById = (table, data) => {
  const { id } = data.params;
  return db.findById(table, id);
};

const returnNotFoundItem = (res) => {
  return res
    .writeHead(404, { 'Content-type': 'application/json' })
    .end(JSON.stringify({ message: 'No resources found with the id' }));
};
