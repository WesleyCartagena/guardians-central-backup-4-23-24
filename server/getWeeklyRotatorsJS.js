const fs = require('fs');
const toml = require('toml');
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
        encrypt: false,
        trustServerCertificate: true
    }
}; 
async function getWeeklyRotatorsJS(){
    try {
        const pool = await sql.connect(serverConfig);

        // Call GetRotatorList stored procedure
        const rotatorListRequest = pool.request();
        const getAcvtiveWeeklyRotators = await rotatorListRequest.input('Name', sql.NVarChar, 'ActiveWeeklyRotators').execute('GetRotatorList');
        const rotatorListString = getAcvtiveWeeklyRotators.recordset[0].RotatorList;
        const milestonesHashList = JSON.parse(rotatorListString).map(String);

        // Call GetWeeklyRotators stored procedure
        const weeklyRotatorsRequest = pool.request();
        for (let i = 0; i < milestonesHashList.length; i++) {
            weeklyRotatorsRequest.input(`Milestone${i + 1}`, sql.BigInt, milestonesHashList[i]);
            console.log(milestonesHashList[i]);
        }

        const result = await weeklyRotatorsRequest.execute('GetWeeklyRotators');
        await pool.close();
        return result.recordset;
    
      } catch (err) {
        // Handle errors
        console.error('Error:', err);
      }
}
module.exports = getWeeklyRotatorsJS;
//Named with a JS prefix to differentiate it from the file in C#