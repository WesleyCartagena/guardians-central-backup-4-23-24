const sqlite3 = require('sqlite3').verbose();

let db = null;

class DatabaseConnection {
    constructor(fileName) {
        this.fileName = fileName;
    }

    Connect(){
        db = new sqlite3.Database(this.fileName, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });
    }

    All(stringQuery, res){
        db.all(stringQuery, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to fetch data' });
                console.log('error')
              } else {
                res.json(rows);
              }
        });
    }
}

module.exports = DatabaseConnection;

