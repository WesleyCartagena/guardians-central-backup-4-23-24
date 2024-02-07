using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Collections.Generic;


public class ManifestClass
{
    public Dictionary<string, string> ManifestObject { get; set; } = new Dictionary<string, string>();
    public Dictionary<string, string> MobileWorldContentPaths { get; set; } = new Dictionary<string, string>();
}



class Program
{
    static async Task Main()
    {
        // Replace this URL with the actual endpoint you want to request
        string getManifestURL = "https://www.bungie.net/Platform/Destiny2/Manifest/";

        using (HttpClient httpClient = new HttpClient())
        {
            try
            {
                // Send GET request
                HttpResponseMessage getManifestResponse = await httpClient.GetAsync(getManifestURL);

                // Check if the request was successful (status code 200 OK)
                if (getManifestResponse.IsSuccessStatusCode)
                {
                    string getManifestResponseJson = await getManifestResponse.Content.ReadAsStringAsync();

                    ManifestClass getManifestJson = JsonSerializer.Deserialize<ManifestClass>(getManifestResponseJson);
                    Console.WriteLine($"ManifestObject: {getManifestJson.ManifestObject}");
                    //string enPath = getManifestJson.MobileWorldContentPaths["en"];
                    //Console.WriteLine($"Path for 'en': {enPath}");
                    // Process the result
                    //Console.WriteLine(getManifestResponseJson);
                    //Console.WriteLine(typeof(getManifestResponseJson));
                    //Console.WriteLine($"ManifestObject: {getManifestJson.ManifestObject}");
                    //Console.WriteLine($"ManifestObject: {getManifestJson.ManifestObject}");
                    
                }
                else
                {
                    // Handle unsuccessful response
                    Console.WriteLine($"HTTP Status Code: {getManifestResponse.StatusCode}");
                }
            }
            catch (HttpRequestException ex)
            {
                // Handle exceptions
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}
