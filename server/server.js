
const express = require('express');
const cors = require('cors');

const app = express();
const DatabaseConnection = require('./connection.js');

let db = new DatabaseConnection('world_sql_content_683f6ecb4976bed01885c945993321d8.sqlite3');//.Connect('world_sql_content_683f6ecb4976bed01885c945993321d8.sqlite3');
db.Connect();

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
	db.All('SELECT json FROM DestinyClassDefinition WHERE id = -2023284724;', res);
});

app.get('/get-vendor-information', (req, res) => {
	db.All('SELECT json FROM DestinyVendorDefinition WHERE id = -133343406;', res);
});