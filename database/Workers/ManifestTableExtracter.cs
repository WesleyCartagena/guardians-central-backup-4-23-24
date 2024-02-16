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
                
                foreach(string tableName in tableNames){
                    Console.WriteLine(tableName);
                }
                // MySQL connection
                string sqlConnectionString = $"Server={Server};Database={Database};TrustServerCertificate=True;Uid={UserId};Pwd={Password};";
                Console.WriteLine(sqlConnectionString);
                using (SqlConnection mysqlConnection = new SqlConnection(sqlConnectionString)){
                    try{
                        mysqlConnection.Open();
                        
                        foreach (string tableName in tableNames){
                            // SQLite query
                            using (SQLiteCommand sqliteCommand = new SQLiteCommand($"SELECT * FROM {tableName}", sqliteConnection)){
                                using (SQLiteDataReader reader = sqliteCommand.ExecuteReader()){
                                    // Read and process data
                                    while (reader.Read()){
                                        // Assuming 'column1' and 'column2' are column names in SQLite
                                        int Id = Convert.ToInt32(reader["Id"]);
                                        byte[] jsonBytes = (byte[])reader["Json"];
                                        string jsonString = Encoding.UTF8.GetString(jsonBytes);
                                        
                                        if(TableExists(connection:mysqlConnection, tableName:tableName) == false){
                                            using (SqlCommand createTableCommand = new SqlCommand($"CREATE TABLE {tableName} (Id INT, Json VARCHAR(MAX))", mysqlConnection)) {
                                                createTableCommand.ExecuteNonQuery();
                                            }
                                        }


                                        // MySQL query
                                        using (SqlCommand sqlCommand = new SqlCommand($"INSERT INTO {tableName} (Id, Json) VALUES (@Id, @Json)", mysqlConnection)){
                                            // Set parameter values and execute query
                                            sqlCommand.Parameters.AddWithValue("@Id", Id);
                                            sqlCommand.Parameters.AddWithValue("@Json", jsonBytes);
                                            sqlCommand.ExecuteNonQuery();
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
                    string tableName = reader["name"].ToString();
                    tableNames.Add(tableName);
                }
            }
        }
        return tableNames;
    }
}
