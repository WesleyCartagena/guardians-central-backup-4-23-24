using System;
using System.Net.Http;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json;
// Figure out what to do with all the return nulls. That is terrible for debugging
public class ManifestResponse{
    public class mobileWorldContentPaths{
        public string? en { get; set; }
    }

    public class ResponseData{
        public mobileWorldContentPaths? mobileWorldContentPaths { get; set; }
    }

    public class RootObject{
        public ResponseData? Response { get; set; }
        public string? ErrorStatus { get; set; }
    }
}
public class Worker{
    // Method to get the Manifest Endpoint
    public static async Task <string> GetManifestEndpoint(string BungieApiRootPath, string GetManifestEndpoint){
        // Builds Manifest URL
        string getManifestURL = BungieApiRootPath + GetManifestEndpoint;

        using (HttpClient httpClient = new HttpClient()){
            try{
                // API Call for manifest URL
                HttpResponseMessage getManifestResponse = await httpClient.GetAsync(getManifestURL);

                // Checks if HTTP Request was sucessfull
                if (getManifestResponse.IsSuccessStatusCode){
                    //Converts ManifestResonse to a String
                    string manifestResponseAsString = await getManifestResponse.Content.ReadAsStringAsync();

                    // Deserailizes manifest Response and build a C# Object from it
                    ManifestResponse.RootObject manifestResponse = JsonSerializer.Deserialize<ManifestResponse.RootObject>(manifestResponseAsString);

                    // Access and return the Manifest Endpoint
                    // This if statement should be refactored to check status messages not whether or not a variable is null
                    if (manifestResponse.Response != null && manifestResponse.Response.mobileWorldContentPaths != null){
                        string englishManifestEndpoint = manifestResponse.Response.mobileWorldContentPaths.en;
                        return englishManifestEndpoint;
                    }else{
                        throw new ApplicationException("Unable to retrieve MobileWorldContentPaths.");// Not Tested
                    }
                    return null;

                }else{
                    throw new ApplicationException($"HTTP Status Code: {getManifestResponse.StatusCode}");// Not Tested
                }
                return null;
            }catch (HttpRequestException ex){
                Console.WriteLine($"Error: {ex.Message}");
                return ex.Message;
            }
        }
        return null;
    }
    
    // Method to Download Manifest URL
    public static async Task DownloadManifest(string BungieRootPath, string ManifestEndpoint, string DestinationFolderPath){
        // Builds the Download URL for Manifest
        string downloadManifestURL = BungieRootPath + ManifestEndpoint;
        string destinationFolderPath = DestinationFolderPath; // Move this to config file
        string fileName = "Sqlite3Destiny2DB.zip"; // Move to config file
        Console.WriteLine(downloadManifestURL);
        using (HttpClient httpClient = new HttpClient()){
            try{
                HttpResponseMessage downloadManifestResponse = await httpClient.GetAsync(downloadManifestURL);
                if (downloadManifestResponse.IsSuccessStatusCode){
                    byte[] fileContent = await downloadManifestResponse.Content.ReadAsByteArrayAsync();

                    // Combine the destination folder path and file name
                    string filePath = Path.Combine(destinationFolderPath, fileName);

                    // Write the file content to the specified file
                    File.WriteAllBytes(filePath, fileContent);

                    Console.WriteLine($"File downloaded and saved to: {filePath}");
                }else{
                    Console.WriteLine($"HTTP Status Code: {downloadManifestResponse.StatusCode}");
                }
            }catch (HttpRequestException ex){
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}