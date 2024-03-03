using System;
using System.Collections.Generic;
using System.Data.SQLite;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Text;

public class ManifestTableExtracter{
    public static void DataMigration(string Sqlite3DbPath, string Server, string Database, string UserId, string Password){
        // SQLite connection
        using (SQLiteConnection sqliteConnection = new SQLiteConnection($"Data Source={Sqlite3DbPath};Version=3;")){
            try {
                sqliteConnection.Open();
                Console.WriteLine("SQLite connection opened successfully.");

                // Get table names from sqlite_master
                List<string> tableNames = GetSQLiteTableNames(sqliteConnection);
                
                // foreach(string tableName in tableNames){
                //     Console.WriteLine(tableName);
                // }
                // Create MS SQL Server connection
                string sqlConnectionString = $"Server={Server};Database={Database};TrustServerCertificate=True;Uid={UserId};Pwd={Password};";
                //Console.WriteLine(sqlConnectionString);
                using (SqlConnection msSqlConnection = new SqlConnection(sqlConnectionString)){
                    try{
                        msSqlConnection.Open();
                        // loop through all tables and their rows
                        foreach (string tableName in tableNames){
                            // DestinyHistoricalStatsDefinition 
                            if (tableName == "DestinyHistoricalStatsDefinition"){
                                using (SQLiteCommand sqliteCommand = new SQLiteCommand($"SELECT * FROM {tableName}", sqliteConnection)){
                                    using (SQLiteDataReader reader = sqliteCommand.ExecuteReader()){
                                        bool doesTableExist = TableExists(connection:msSqlConnection, tableName:tableName);
                                        if(doesTableExist == false){
                                            using (SqlCommand createTableCommand = new SqlCommand($"CREATE TABLE {tableName} ([key] VARCHAR(MAX), Json VARCHAR(MAX))", msSqlConnection)) {
                                                createTableCommand.ExecuteNonQuery();
                                            }
                                        }else if (doesTableExist == true){
                                            using (SqlCommand deleteTableCommand = new SqlCommand($"DROP TABLE {tableName}", msSqlConnection)){
                                                deleteTableCommand.ExecuteNonQuery();
                                            }
                                            using (SqlCommand createTableCommand = new SqlCommand($"CREATE TABLE {tableName} ([key] VARCHAR(MAX), Json VARCHAR(MAX))", msSqlConnection)){
                                                createTableCommand.ExecuteNonQuery();
                                            }
                                        }     
                                        while (reader.Read()){
                                            string key = (string)reader["key"];
                                            byte[] jsonBytes = (byte[])reader["Json"];
                                            string jsonString = Encoding.UTF8.GetString(jsonBytes);
                                            
                                            // MySQL query
                                            using (SqlCommand sqlCommand = new SqlCommand($"INSERT INTO {tableName} ([key], Json) VALUES (@key, @Json)", msSqlConnection)){
                                                // Set parameter values and execute query
                                                sqlCommand.Parameters.AddWithValue("@key", key);
                                                sqlCommand.Parameters.AddWithValue("@Json", jsonBytes);
                                                sqlCommand.ExecuteNonQuery();
                                            }
                                        }
                                    }
                                }

                            }
                            else{
                                // SQLite query
                                using (SQLiteCommand sqliteCommand = new SQLiteCommand($"SELECT * FROM {tableName}", sqliteConnection)){
                                    using (SQLiteDataReader reader = sqliteCommand.ExecuteReader()){
                                        bool doesTableExist = TableExists(connection:msSqlConnection, tableName:tableName);
                                        if(doesTableExist == false){
                                            using (SqlCommand createTableCommand = new SqlCommand($"CREATE TABLE {tableName} (Id INT, Json VARCHAR(MAX))", msSqlConnection)) {
                                                createTableCommand.ExecuteNonQuery();
                                            }
                                        }else if (doesTableExist == true){
                                            using (SqlCommand deleteTableCommand = new SqlCommand($"DROP TABLE {tableName}", msSqlConnection)){
                                                deleteTableCommand.ExecuteNonQuery();
                                            }
                                            using (SqlCommand createTableCommand = new SqlCommand($"CREATE TABLE {tableName} (Id INT, Json VARCHAR(MAX))", msSqlConnection)){
                                                createTableCommand.ExecuteNonQuery();
                                            }
                                        }                                        
                                        // Read and process data
                                        while (reader.Read()){
                                            // Assuming 'column1' and 'column2' are column names in SQLite
                                            int Id = Convert.ToInt32(reader["Id"]);
                                            byte[] jsonBytes = (byte[])reader["Json"];
                                            string jsonString = Encoding.UTF8.GetString(jsonBytes);

                                            // MySQL query
                                            using (SqlCommand sqlCommand = new SqlCommand($"INSERT INTO {tableName} (Id, Json) VALUES (@Id, @Json)", msSqlConnection)){
                                                // Set parameter values and execute query
                                                sqlCommand.Parameters.AddWithValue("@Id", Id);
                                                sqlCommand.Parameters.AddWithValue("@Json", jsonBytes);
                                                sqlCommand.ExecuteNonQuery();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }catch (Exception ex) {
                        Console.WriteLine($"Error opening MySQL connection: {ex.Message}");
                    }
                }
            }catch (Exception ex) {
                Console.WriteLine($"Error opening SQLite connection: {ex.Message}");
            }
        }
    }
    private static bool TableExists(SqlConnection connection, string tableName) {
    using (SqlCommand command = new SqlCommand($"SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '{tableName}'", connection)) {
        return command.ExecuteScalar() != null;
    }
}
 
    private static List<string> GetSQLiteTableNames(SQLiteConnection connection){
        List<string> tableNames = new List<string>();
        using (SQLiteCommand command = new SQLiteCommand("SELECT name FROM sqlite_master WHERE type='table'", connection)){
            using (SQLiteDataReader reader = command.ExecuteReader()){
                while (reader.Read()){
                    string tableName = (string)reader["name"];
                    tableNames.Add(tableName);
                }
            }
        }
        return tableNames;
    }
}
