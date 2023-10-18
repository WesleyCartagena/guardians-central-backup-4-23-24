
const express = require('express');
const cors = require('cors');

const app = express();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('world_sql_content_683f6ecb4976bed01885c945993321d8.sqlite3', (err) =>{
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });

app.get('/', (req, res) => {
    res.json({ message: "Server is running on port 8000." });
});

app.get('/get-data', (req, res) => {
    db.all('SELECT json FROM DestinyClassDefinition WHERE id = -2023284724;', (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch data' });
        console.log('error')
      } else {
        res.json(rows);
      }
    });
});

app.get('/get-vendor-information', (req, res) => {
    db.all('SELECT json FROM DestinyVendorDefinition WHERE id = -133343406;', (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch data' });
        console.log('error')
      } else {
        res.json(rows);
      }
    });
});