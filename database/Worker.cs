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
    public static async Task <string> GetManifestEndpoint(string BungieApiRootPath, string GetManifestEndpoint){
        // string getManifestURL = "https://www.bungie.net/Platform/Destiny2/Manifest/";
        string getManifestURL = BungieApiRootPath + GetManifestEndpoint;

        using (HttpClient httpClient = new HttpClient()){
            try{
                HttpResponseMessage getManifestResponse = await httpClient.GetAsync(getManifestURL);

                if (getManifestResponse.IsSuccessStatusCode){
                    Console.WriteLine(getManifestResponse);
                    string manifestResponseAsString = await getManifestResponse.Content.ReadAsStringAsync();

                    ManifestResponse.RootObject manifestResponse = JsonSerializer.Deserialize<ManifestResponse.RootObject>(manifestResponseAsString);

                    // Log the deserialized object
                    Console.WriteLine("Deserialized Object:");
                    Console.WriteLine(JsonSerializer.Serialize(manifestResponse, new JsonSerializerOptions { WriteIndented = true }));

                    // Access and print MobileWorldContentPaths
                    if (manifestResponse.Response != null && manifestResponse.Response.mobileWorldContentPaths != null){
                        string englishManifestEndpoint = manifestResponse.Response.mobileWorldContentPaths.en;
                        Console.WriteLine(englishManifestEndpoint);
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
    
    public static async Task DownloadManifest(string BungieRootPath, string ManifestEndpoint, string DestinationFolderPath){
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