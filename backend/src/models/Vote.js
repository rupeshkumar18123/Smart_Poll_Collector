const db = require('../config/db');

class Vote {
  static create(pollId, optionIndex, voterId) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO votes (pollId, optionIndex, voterId) VALUES (?, ?, ?)',
        [pollId, optionIndex, voterId],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  }

  static hasVoted(pollId, voterId) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM votes WHERE pollId = ? AND voterId = ?',
        [pollId, voterId],
        (err, row) => {
          if (err) reject(err);
          else resolve(!!row);
        }
      );
    });
  }

  static getResults(pollId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT optionIndex, COUNT(*) as count 
        FROM votes 
        WHERE pollId = ? 
        GROUP BY optionIndex`,
        [pollId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
}

module.exports = Vote;