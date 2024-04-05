using Microsoft.Data.SqlClient;
using System.Text;
using Serilog;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

public class MilestoneDefinitionJson{
    public class DisplayProperties{
        public string? description { get; set; }
        public string? name { get; set; }
        public string? icon { get; set; }
        public bool? hasIcon { get; set; }
    }

    public class Activity{
        public long? activityHash { get; set; }
    }

    public class Root{
        public DisplayProperties? displayProperties { get; set; }
        public string? friendlyName { get; set; }
        public Activity[]? activities { get; set; }
        public long? hash { get; set; }
        public long? index { get; set; }
        public bool? redacted { get; set; }
        public bool? blacklisted { get; set; }
    }
}

public class CollectibleDefinitionJson{
    public class DisplayProperties{
        public string? description { get; set; }
        public string? name { get; set; }
        public string? icon { get; set; }
        public bool? hasIcon { get; set; }
    }
    public class Root{
        public DisplayProperties? displayProperties { get; set; }
        public long itemHash { get; set; }
    }
}

public class ActivityDefinitionJson{
    public class OriginalDisplayProperties{
        public string? description { get; set; }
        public string? name { get; set; }
        public string? icon { get; set; }
        public bool? hasIcon { get; set; }
    }

    public class Root{
        public OriginalDisplayProperties? originalDisplayProperties { get; set; }
        public string? pgcrImage { get; set; }
        public int? hash { get; set; }
        public int activityTypeHash { get; set; }    
    }

}

public class ActivityTypeDefinitionJson{
    public class DisplayProperties{
        public string? name { get; set; }
    }
    
    public class Root{
        public DisplayProperties? displayProperties { get; set; }
    }
}

public class InventoryItemDefinitionJson{
    public class DisplayProperties{
        public string? description { get; set; }
        public string? name { get; set; }
        public string? icon { get; set; }
        public bool? hasIcon { get; set; }
    }
    public class Root{
        public DisplayProperties? displayProperties { get; set; }
        public long[]? itemCategoryHashes { get; set; }
    }
}

public class WeeklyRotatorsTable{
    public static void BuildWeeklyRotatorsTable(PublicMilestonesResponse.RootObject PublicMilestonesObject, string Server, string Database, string UserId, string Password){
        // Create MS SQL Server connection
        //string sqlConnectionString = $"Server={Server};Database={Database};TrustServerCertificate=True;Uid={UserId};Pwd={Password};";
        string sqlConnectionString = $"Server=localhost;Database=WesleyTestDB;Integrated Security=True;TrustServerCertificate=True;";
        Log.Information(sqlConnectionString);
        string tableName = "WeeklyRotatorsTable";
        // Dictionary to store weekly rotator milestones
        Dictionary<string, PublicMilestonesResponse.Milestone> rawWeeklyRotatorsDictionary = new Dictionary<string, PublicMilestonesResponse.Milestone>();

        // Loops through all milestones and checks for the 3 Weekly Rotators and adds them to a list
        foreach (KeyValuePair<string, PublicMilestonesResponse.Milestone> milestoneKVP in PublicMilestonesObject.Response){
            if (milestoneKVP.Value.Activities != null) {
                foreach (PublicMilestonesResponse.Activity activity in milestoneKVP.Value.Activities){
                    if(activity.ChallengeObjectiveHashes != null){
                        if(activity.ChallengeObjectiveHashes.Count > 0){ 
                            // Check if the key exist already if it does do not add it. This will eliminate the Legend versions from the dict
                            if (!rawWeeklyRotatorsDictionary.ContainsKey(milestoneKVP.Key)){
                                // Create a new dictionary to hold the milestone
                                rawWeeklyRotatorsDictionary.Add(milestoneKVP.Key, milestoneKVP.Value);
                            }
                        }
                    }
                }
            }

        }


        long? activityId = null;
        long? activityTypeId = null;
        string? activityName = null;
        long? milestoneHash = null;
        long? milestoneHashInTable = null;
        List<Dictionary<string, object>> weapons = new List<Dictionary<string, object>>();
        List<Dictionary<string, object>> hunterArmor = new List<Dictionary<string, object>>();
        List<Dictionary<string, object>> warlockArmor = new List<Dictionary<string, object>>();
        List<Dictionary<string, object>> titanArmor = new List<Dictionary<string, object>>();
        using (SqlConnection msSqlConnection = new SqlConnection(sqlConnectionString)){
            try{
                msSqlConnection.Open();
                bool doesTableExist = TableExists(connection:msSqlConnection, tableName:tableName);
                if(doesTableExist == false){
                    Log.Information($"{tableName} not found");
                    using (SqlCommand createTableCommand = new SqlCommand($"CREATE TABLE {tableName} (MilestoneHash BIGINT, Json VARCHAR(MAX))", msSqlConnection)) {
                        createTableCommand.ExecuteNonQuery();
                    }
                }
                // Empty dictionary to add table information to
                Dictionary<string, object> weeklyRotatorTableJson = new Dictionary<string, object>();
                foreach(KeyValuePair<string, PublicMilestonesResponse.Milestone> weeklyRotatorKVP in rawWeeklyRotatorsDictionary){
                    weapons.Clear();
                    hunterArmor.Clear();
                    warlockArmor.Clear();
                    titanArmor.Clear();
                    weeklyRotatorTableJson.Clear();
                    var milestoneId = unchecked((int) weeklyRotatorKVP.Value.MilestoneHash);
                    using (SqlCommand sqlCommand = new SqlCommand($"SELECT * FROM DestinyMilestoneDefinition Where Id = {milestoneId}", msSqlConnection)){
                        using (SqlDataReader reader = sqlCommand.ExecuteReader()){
                            while (reader.Read()){
                                // Log the response using Serilog
                                Log.Information("SQL Query Response: {@Response}", new{
                                    LogId = reader["Id"],
                                    LogJson = reader["json"].ToString(),
                                });
                                string milestoneDefinitionJson = reader["json"].ToString();
                                Console.WriteLine(milestoneDefinitionJson);
                                MilestoneDefinitionJson.Root milestoneDefinitionRoot = JsonConvert.DeserializeObject<MilestoneDefinitionJson.Root>(milestoneDefinitionJson);
                                milestoneHash = milestoneDefinitionRoot.hash;
                                string activityHash = JsonConvert.SerializeObject(milestoneDefinitionRoot.activities[0].activityHash);
                                activityId =  unchecked((int) int.Parse(activityHash));
                                string iconUrl = milestoneDefinitionRoot.displayProperties.icon;
                                weeklyRotatorTableJson.Add("icon_url",iconUrl);
                            }
                        }
                    }

                    using (SqlCommand checkIfRowExistCommand = new SqlCommand($"SELECT * FROM {tableName} Where MilestoneHash = {milestoneHash}", msSqlConnection)){
                          using (SqlDataReader rowExistreader = checkIfRowExistCommand.ExecuteReader()){
                            while (rowExistreader.Read()){
                                milestoneHashInTable = rowExistreader["MilestoneHash"] as long?;
                            }
                        }
                    }

                    if(milestoneHash == milestoneHashInTable){
                        Log.Information($"{milestoneHash} is already in table");
                        continue;
                    }

                    using (SqlCommand sqlCommand = new SqlCommand($"SELECT * FROM DestinyActivityDefinition Where Id = {activityId}", msSqlConnection)){
                        using (SqlDataReader reader = sqlCommand.ExecuteReader()){
                            while (reader.Read()){
                                string activityDefinitionJson = reader["json"].ToString();
                                Console.WriteLine(activityDefinitionJson);
                                ActivityDefinitionJson.Root activityDefinitionRoot = JsonConvert.DeserializeObject<ActivityDefinitionJson.Root>(activityDefinitionJson);
                                activityName = activityDefinitionRoot.originalDisplayProperties.name;
                                activityName = activityName.Replace(":", "");
                                string pgcrImage = activityDefinitionRoot.pgcrImage;
                                int activityTypeHash = activityDefinitionRoot.activityTypeHash;
                                activityTypeId = unchecked((int) activityTypeHash);
                                Console.WriteLine(activityTypeId);
                                weeklyRotatorTableJson.Add("activity_name",activityName);
                                weeklyRotatorTableJson.Add("pcgr_image",pgcrImage);
                            }
                        }
                    }
                    
                    using (SqlCommand sqlCommand = new SqlCommand($"SELECT * FROM DestinyActivityTypeDefinition Where Id = {activityTypeId}", msSqlConnection)){
                        using (SqlDataReader reader = sqlCommand.ExecuteReader()){
                            while (reader.Read()){
                                string activityTypeDefinitionJson = reader["json"].ToString();
                                ActivityTypeDefinitionJson.Root activityTypeDefinitionRoot = JsonConvert.DeserializeObject<ActivityTypeDefinitionJson.Root>(activityTypeDefinitionJson);
                                string activityType = activityTypeDefinitionRoot.displayProperties.name;
                                weeklyRotatorTableJson.Add("activity_type", activityType);
                            }
                        }

                    }
                    List<long> inventoryItemIdList = new List<long>();
                    using (SqlCommand sqlCommand = new SqlCommand($"SELECT * FROM DestinyCollectibleDefinition WHERE Json LIKE @activityName", msSqlConnection)){
                        sqlCommand.Parameters.AddWithValue("@activityName", "%" + activityName + "%");
                        using (SqlDataReader reader = sqlCommand.ExecuteReader()){
                            while (reader.Read()){
                                string collectibleDefinitionJson = reader["json"].ToString();
                                CollectibleDefinitionJson.Root collectibleDefinitionRoot = JsonConvert.DeserializeObject<CollectibleDefinitionJson.Root>(collectibleDefinitionJson);
                                long collectibleItemHash = collectibleDefinitionRoot.itemHash;
                                long inventoryItemId = unchecked((int) collectibleItemHash);
                                inventoryItemIdList.Add(inventoryItemId);
                            }
                        }
                    }
                    foreach(long itemId in inventoryItemIdList){
                        using (SqlCommand sqlCommand= new SqlCommand($"SELECT * FROM DestinyInventoryItemDefinition WHERE Id = {itemId}", msSqlConnection)){
                            using (SqlDataReader reader = sqlCommand.ExecuteReader()){
                                while (reader.Read()){
                                    string inventoryItemDefinitionJson = reader["json"].ToString();
                                    InventoryItemDefinitionJson.Root inventoryItemDefinitionRoot = JsonConvert.DeserializeObject<InventoryItemDefinitionJson.Root>(inventoryItemDefinitionJson);
                                    string iventoryItemName = inventoryItemDefinitionRoot.displayProperties.name;
                                    string inventoryIcon = inventoryItemDefinitionRoot.displayProperties.icon;
                                    string inventoryItemType = null;
                                    
                                    if(inventoryItemDefinitionRoot.itemCategoryHashes.Contains(22) && inventoryItemDefinitionRoot.itemCategoryHashes.Contains(20)){
                                        inventoryItemType = "TitanArmor";
                                    }else if(inventoryItemDefinitionRoot.itemCategoryHashes.Contains(23) && inventoryItemDefinitionRoot.itemCategoryHashes.Contains(20)){
                                        inventoryItemType = "HunterArmor";
                                    }else if (inventoryItemDefinitionRoot.itemCategoryHashes.Contains(21) && inventoryItemDefinitionRoot.itemCategoryHashes.Contains(20)){
                                        inventoryItemType = "WarlockArmor";
                                    }else if (inventoryItemDefinitionRoot.itemCategoryHashes.Contains(1)){
                                        inventoryItemType = "Weapon";
                                    }
                                    Dictionary<string, object> itemObject = new Dictionary<string, object>{
                                        { iventoryItemName, new Dictionary<string, string>
                                            {
                                                { "Icon", inventoryIcon }
                                            }
                                        }
                                    };
                                    if (inventoryItemType == "TitanArmor"){
                                        titanArmor.Add(itemObject);
                                    }else if (inventoryItemType == "HunterArmor"){
                                        hunterArmor.Add(itemObject);
                                    }else if (inventoryItemType == "WarlockArmor"){
                                        warlockArmor.Add(itemObject);
                                    }else if (inventoryItemType == "Weapon"){
                                        weapons.Add(itemObject);
                                    }

                                }
                            }
                        }
                    }
                    weeklyRotatorTableJson.Add("hunter_armor", hunterArmor);
                    weeklyRotatorTableJson.Add("titan_armor", titanArmor);
                    weeklyRotatorTableJson.Add("warlock_armor", warlockArmor);
                    weeklyRotatorTableJson.Add("weapons", weapons);      
                    string jsonString = JsonConvert.SerializeObject(weeklyRotatorTableJson);
                    using (SqlCommand insertRowCommand = new SqlCommand($"INSERT INTO {tableName} (MilestoneHash, Json) VALUES (@MilestoneHash, @Json)", msSqlConnection)){
                        // Set parameter values and execute query
                        insertRowCommand.Parameters.AddWithValue("@MilestoneHash", milestoneHash);
                        insertRowCommand.Parameters.AddWithValue("@Json", jsonString);
                        insertRowCommand.ExecuteNonQuery();
                    }
                    Console.WriteLine(jsonString);
                }

            }catch (Exception ex){
                Log.Error($"Error opening MySQL connection: {ex.Message}");
            }
        }

    }
    private static bool TableExists(SqlConnection connection, string tableName) {
        using (SqlCommand command = new SqlCommand($"SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '{tableName}'", connection)) {
            return command.ExecuteScalar() != null;
        }
    }

}

// Item Categories
// Titan 22
// Hunter 23
// Warlock 21
// Armor 20
// Weapon 1