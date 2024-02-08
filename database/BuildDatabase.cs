using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using Nett;


class Program{
    static async Task Main(){
        var table = Toml.ReadFile("config.toml");
        string BungieRootPath = table.Get<string>("BungieRootPath");
        string BungieApiRootPath = table.Get<string>("BungieAPIRootPath");
        string GetManifestEndpoint = table.Get<string>("GetManifestEndpoint");
        string DestinationFolderPath = table.Get<string>("DestinationFolderPath");
        string manifestEndpoint = await Worker.GetManifestEndpoint(BungieApiRootPath, GetManifestEndpoint);
        Console.WriteLine(manifestEndpoint);
        await Worker.DownloadManifest(BungieRootPath:BungieRootPath, ManifestEndpoint:manifestEndpoint, DestinationFolderPath:DestinationFolderPath);
    }
}