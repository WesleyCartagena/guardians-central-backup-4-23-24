const express = require('express');
const cors = require('cors');
const fs = require('fs');
const toml = require('toml');
const { Connection, Request } = require('tedious');
const SqlServerConnection = require('./connection');

const app = express();

const configFile = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));
const server = configFile.Server;
const user = configFile.UserId;
const password = configFile.Password;
const database = configFile.Database;
const databasePort = configFile.Port;

var serverConfig = {  
    server: server,  
    authentication: {
        type: 'default',
        options: {
            userName: user, 
            password: password  
        }
    },
    options: {
        database: database,
        port: databasePort,
        trustServerCertificate: true
    }
}; 


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

app.get('/testConnection', (req, res) => {
    // Create a connection to the database
    const connection = new Connection(serverConfig);

    // Event handler for a successful connection
    connection.on('connect', function (err) {
        if (err) {
            console.error('Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log("Connected to the database");

            // Perform the query when the connection is stable
            const query = 'SELECT * FROM DestinyVendorDefinition WHERE id = 672118013';
            const rows = [];

            // Event handler for row data
            const request = new Request(query, function (err, rowCount) {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log('Query result:', rowCount + ' rows returned');
                    console.log(rows);

                    // Send the response with the data
                    res.json({ testConnectionData: rows });
                }

                // Close the connection when done
                connection.close();
            });

            request.on('row', function (columns) {
                const rowData = {};
                columns.forEach(column => {
                    rowData[column.metadata.colName] = column.value;
                });
                rows.push(rowData);
            });

            // Execute the request
            connection.execSql(request);
        }
    });

    // Connect to the database
    connection.connect();
});

app.get('/testConnection2', (req, res) => {});