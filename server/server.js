const express = require('express');
const cors = require('cors');
const fs = require('fs');
const toml = require('toml');
const { Connection, Request } = require('tedious');
const SqlServerConnection = require('./connection');

const getWeeklyRotatorsJS = require('./getWeeklyRotatorsJS');

const app = express();
const sql = require('mssql');

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

app.get('/weeklyrotators', async (req, res) => {
    let getWeeklyRotators = await getWeeklyRotatorsJS();
    res.json({getWeeklyRotators});
    console.log(getWeeklyRotators);
});