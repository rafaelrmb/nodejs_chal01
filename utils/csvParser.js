import { parse } from 'csv-parse';
import fs from 'node:fs';
import { createTaskHandler } from '../routes/handlers.js';

const filePath = new URL('./fs_read.csv', import.meta.url);

export const processFile = async (req, res) => {
  const records = [];
  const parser = fs.createReadStream(filePath).pipe(parse({}));
  let currentIndex = 0;

  // Process each record
  for await (const record of parser) {
    if (currentIndex === 0) {
      currentIndex++;
      continue;
    }

    const [title, description] = record;

    const data = {
      payload: {
        title,
        description,
      },
    };

    createTaskHandler(req, res, data);

    records.push(record);
  }

  return records;
};
