using System;
using System.Collections.Generic;
using System.Data.SQLite;
using MySql.Data.MySqlClient;

public class ManifestTableExtracter{
    public static void DataMigration(string Sqlite3DbPath, string Server, string Database, string UserId){
        // SQLite connection
        using (SQLiteConnection sqliteConnection = new SQLiteConnection($"Data Source={Sqlite3DbPath};Version=3;")){
            try {
                sqliteConnection.Open();
                Console.WriteLine("SQLite connection opened successfully.");

                // Get table names from sqlite_master
                List<string> tableNames = GetSQLiteTableNames(sqliteConnection);
                /*
                foreach(string tableName in tableNames){
                    Console.WriteLine(tableName);
                }*/
                // MySQL connection
                string mysqlConnectionString = $"Server={Server};Database={Database};User Id={UserId}";
                Console.WriteLine(mysqlConnectionString);
                using (MySqlConnection mysqlConnection = new MySqlConnection(mysqlConnectionString)){
                    mysqlConnection.Open();

                    foreach (string tableName in tableNames){
                        // SQLite query
                        using (SQLiteCommand sqliteCommand = new SQLiteCommand($"SELECT * FROM {tableName}", sqliteConnection)){
                            using (SQLiteDataReader reader = sqliteCommand.ExecuteReader()){
                                // Read and process data
                                while (reader.Read()){
                                    // Assuming 'column1' and 'column2' are column names in SQLite
                                    string Id = reader["Id"].ToString();
                                    string Json = reader["Json"].ToString();

                                    // MySQL query
                                    using (MySqlCommand mysqlCommand = new MySqlCommand($"INSERT INTO {tableName} (Id, Json) VALUES (@Id, @Json)", mysqlConnection)){
                                        // Set parameter values and execute query
                                        mysqlCommand.Parameters.AddWithValue("@Id", Id);
                                        mysqlCommand.Parameters.AddWithValue("@Json", Json);
                                        mysqlCommand.ExecuteNonQuery();
                                    }
                                }
                            }
                        }
                    }
                }
            }catch (Exception ex) {
                Console.WriteLine($"Error opening SQLite connection: {ex.Message}");
            }
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
