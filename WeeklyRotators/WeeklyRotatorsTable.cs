using Microsoft.Data.SqlClient;
using System.Text;
using Serilog;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

public class WeeklyRotatorsTable{
    public static void BuildWeeklyRotatorsTable(PublicMilestonesResponse.RootObject PublicMilestonesObject, string Server, string Database, string UserId, string Password){
        // Create MS SQL Server connection
        string sqlConnectionString = $"Server={Server};Database={Database};TrustServerCertificate=True;Uid={UserId};Pwd={Password};";
        Log.Information(sqlConnectionString);

        // Dictionary to store weekly rotator milestones
        Dictionary<string, Dictionary<string, PublicMilestonesResponse.Milestone>> rawWeeklyRotatorsDictionary = new Dictionary<string, Dictionary<string, PublicMilestonesResponse.Milestone>>();


        foreach (KeyValuePair<string, PublicMilestonesResponse.Milestone> milestoneKVP in PublicMilestonesObject.Response){
            if (milestoneKVP.Value.Activities != null) {
                foreach (PublicMilestonesResponse.Activity activity in milestoneKVP.Value.Activities){
                    if(activity.ChallengeObjectiveHashes != null){
                        if(activity.ChallengeObjectiveHashes.Count > 0){ 
                            // Check if the key exist already if it does do not add it. This will eliminate the Legend versions from the dict
                            if (!rawWeeklyRotatorsDictionary.ContainsKey(milestoneKVP.Key)){
                                // Create a new dictionary to hold the milestone
                                Dictionary<string, PublicMilestonesResponse.Milestone> milestoneDict = new Dictionary<string, PublicMilestonesResponse.Milestone>();
                                // Add the milestone to the dictionary
                                milestoneDict.Add(milestoneKVP.Key, milestoneKVP.Value);
                                // Add the dictionary to the main dictionary
                                rawWeeklyRotatorsDictionary.Add(milestoneKVP.Key, milestoneDict);
                            }
                        }
                    }
                }
            }

        }
        Console.WriteLine(JsonConvert.SerializeObject(rawWeeklyRotatorsDictionary));
        // foreach (var dict in rawWeeklyRotatorsDictionary){
        //     Console.WriteLine(JsonConvert.SerializeObject(dict));
        // }
        // using (SqlConnection msSqlConnection = new SqlConnection(sqlConnectionString)){
        //     try{
        //         msSqlConnection.Open();
        //     }catch (Exception ex){
        //         Log.Error($"Error opening MySQL connection: {ex.Message}");
        //     }
        // }

    }
    private static bool TableExists(SqlConnection connection, string tableName) {
        using (SqlCommand command = new SqlCommand($"SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '{tableName}'", connection)) {
            return command.ExecuteScalar() != null;
        }
    }

}

// Weeklys this week
//1027301269

//1742973996

//1888320892