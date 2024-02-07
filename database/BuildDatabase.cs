using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;

public class ManifestResponse
{
    public class mobileWorldContentPaths
    {
        public string en { get; set; }
    }

    public class ResponseData
    {
        public mobileWorldContentPaths mobileWorldContentPaths { get; set; }
    }

    public class RootObject
    {
        public ResponseData Response { get; set; }
        public int ErrorCode { get; set; }
        public int ThrottleSeconds { get; set; }
        public string ErrorStatus { get; set; }
        public string Message { get; set; }
        public object MessageData { get; set; }
    }
}


class Program
{
    static async Task Main()
    {
        string getManifestURL = "https://www.bungie.net/Platform/Destiny2/Manifest/";

        using (HttpClient httpClient = new HttpClient()){
            try
            {
                HttpResponseMessage getManifestResponse = await httpClient.GetAsync(getManifestURL);

                if (getManifestResponse.IsSuccessStatusCode)
                {
                    Console.WriteLine(getManifestResponse);
                    string manifestResponseAsString = await getManifestResponse.Content.ReadAsStringAsync();
                    //Console.WriteLine(manifestResponseAsString); // This is printing because it is returning something
                    //Console.WriteLine(manifestResponseAsString.GetType()); // Type is System.String

                    ManifestResponse.RootObject manifestResponse = JsonSerializer.Deserialize<ManifestResponse.RootObject>(manifestResponseAsString);

                    // Log the deserialized object
                    Console.WriteLine("Deserialized Object:");
                    Console.WriteLine(JsonSerializer.Serialize(manifestResponse, new JsonSerializerOptions { WriteIndented = true }));

                    // Access and print MobileWorldContentPaths
                    if (manifestResponse.Response != null && manifestResponse.Response.mobileWorldContentPaths != null)
                    {
                        Console.WriteLine($"English Content Path: {manifestResponse.Response.mobileWorldContentPaths.en}");
                    }
                    else
                    {
                        Console.WriteLine("Unable to retrieve MobileWorldContentPaths.");
                    }

                }
                else
                {
                    Console.WriteLine($"HTTP Status Code: {getManifestResponse.StatusCode}");
                }
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}