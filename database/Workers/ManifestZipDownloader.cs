using System;
using System.Net.Http;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json;

public class ManifestZipDownloader{    
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