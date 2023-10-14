const sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('world_sql_content_683f6ecb4976bed01885c945993321d8.sqlite3', (err) =>{
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Database connection closed.');
});
