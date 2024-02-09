// TO-DO
// Surround methods with try blocks
// Maybe remove worker try blocks and just use external ones
// Research some file structures
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using Nett;


class Program{
    static async Task Main(){

        // Gets all the data from TOML File 
        var table = Toml.ReadFile("config.toml");

        // Converts TOML File data to strings
        string BungieRootPath = table.Get<string>("BungieRootPath");
        string BungieApiRootPath = table.Get<string>("BungieAPIRootPath");
        string GetManifestEndpoint = table.Get<string>("GetManifestEndpoint");
        string DestinationFolderPath = table.Get<string>("DestinationFolderPath");

        // Gets the Manifest Endpoint
        string manifestEndpoint = await ManifestEndpointRetrieval.GetManifestEndpoint(BungieApiRootPath, GetManifestEndpoint);
        Console.WriteLine(manifestEndpoint);

        // Recieves Manifest Endpoint and tries to download the manifest zip folder
        await ManifestZipDownloader.DownloadManifest(BungieRootPath:BungieRootPath, ManifestEndpoint:manifestEndpoint, DestinationFolderPath:DestinationFolderPath);
    }
}