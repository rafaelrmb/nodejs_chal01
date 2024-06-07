import fs from 'node:fs/promises';

const dbPath = new URL('./db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(dbPath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(dbPath, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (data) {
      if (Array.isArray(this.#database[table])) {
        this.#database[table].push(data);
      } else {
        this.#database[table] = [data];
      }
    }

    this.#persist();

    return data ?? [];
  }

  findAll(table) {
    return this.#database[table] ?? [];
  }

  findById(table, id) {
    if (!this.#database[table]) {
      return {};
    }

    return this.#database[table].find((row) => {
      return row.id === id;
    });
  }

  delete(table, itemToRemove) {
    const itemsSet = new Set(this.#database[table]);

    itemsSet.delete(itemToRemove);
    this.#database[table] = [...itemsSet];
    this.#persist();

    return this.#database[table];
  }

  update(table, itemToUpdate, updatedItem) {
    const { item, itemIndex } = this.#getItemById(table, itemToUpdate);

    const newItem = {
      ...item,
      ...updatedItem,
      updated_at: new Date(),
    };

    this.#database[table][itemIndex] = newItem;

    this.#persist();

    return newItem;
  }

  patch(table, itemToUpdate) {
    const { item, itemIndex } = this.#getItemById(table, itemToUpdate);

    const currentItem = this.#database[table][itemIndex];

    currentItem.completed_at = currentItem.completed_at ? null : new Date();

    this.#persist();

    return this.#database[table][itemIndex];
  }

  #getItemById(table, itemToUpdate) {
    const tableData = this.#database[table];
    const itemIndex = this.#database[table].findIndex(
      (el) => el.id === itemToUpdate.id
    );

    return {
      item: tableData[itemIndex],
      itemIndex,
    };
  }
}
