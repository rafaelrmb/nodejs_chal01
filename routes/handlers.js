import { randomUUID } from 'node:crypto';
import { Database } from '../database/database.js';

const db = new Database();

export const createTaskHandler = (req, res, data) => {
  console.log(data);
  const { title, description } = data.payload;
  const { url } = req;

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
    res.writeHead(201, { 'Content-type': 'application/json' }).end();
    return newTask;
  }

  res.writeHead(400, { 'Content-type': 'application/json' });
  res.end(
    JSON.stringify({ message: 'Please send the correct data to the server.' })
  );
};
