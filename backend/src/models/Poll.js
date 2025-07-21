const db = require('../config/db');

class Poll {
  static create(question, options) {
    const id = require('crypto').randomBytes(8).toString('hex');
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO polls (id, question, options) VALUES (?, ?, ?)',
        [id, question, JSON.stringify(options)],
        (err) => {
          if (err) reject(err);
          else resolve(id);
        }
      );
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM polls WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row ? {...row, options: JSON.parse(row.options)} : null);
      });
    });
  }
}

module.exports = Poll;