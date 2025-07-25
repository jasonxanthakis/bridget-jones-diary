const db = require('../db/connect');

class Entry {

  constructor({ id, title, content, category, created_at, last_edited_at  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.createdAt = created_at.getFullYear().toString()+'-'+created_at.getMonth().toString()+'-'+created_at.getDate().toString();
    this.lastEditedAt = last_edited_at.getFullYear().toString()+'-'+last_edited_at.getMonth().toString()+'-'+last_edited_at.getDate().toString();
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM entries ORDER BY created_at DESC;");

    if (response.rows.length === 0) {
      throw new Error("No entries found.")
    }

    return response.rows.map(g => new Entry(g));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM entries WHERE id = $1;", [id]);

    if (response.rows.length != 1) {
      throw new Error("Unable to locate diary entry.")
    }

    return new Entry(response.rows[0]);
  }

  static async getAllByCategory(category) {
    const response = await db.query("SELECT * FROM entries WHERE category = $1", [category]);

    if (response.rows.length != 1) {
      throw new Error("No entries found.")
    }

    return response.rows.map(g => new Entry(g));
  }

  static async create(data) {
    const { title, content, category, createdAt, lastEditedAt  } = data;
    const response = await db.query('INSERT INTO entries (title, content, category, created_at, last_edited_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
    [title, content, category, createdAt, lastEditedAt]);

    const entryId = response.rows[0].id;
    const newEntry = await Entry.getOneById(entryId);
    return newEntry;
  }

  async update(data) {
    const response = await db.query("UPDATE entries SET content = $1 WHERE id = $2 RETURNING *;",
    [data.content, this.id]);

    if (response.rows.length != 1) {
      throw new Error("Unable to update entry.")
    }

    return new Entry(response.rows[0]);
  }

  static async destroy(id) {
    const response = await db.query('DELETE FROM entries WHERE id = $1 RETURNING *;', [id]);

    if (response.rows.length != 1) {
      throw new Error("Unable to delete entry.")
    }

    return new Entry(response.rows[0]);
  }

}

module.exports = Entry;
