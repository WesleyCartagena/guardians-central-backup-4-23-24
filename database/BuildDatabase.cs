// TO-DO
// Surround methods with try blocks
// Maybe remove worker try blocks and just use external ones
// Research some file structures
// Connect to SQLLite DB and extract tables and transfer them to MySqlServer
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
        string ManifestZipPath = table.Get<string>("ManifestZipPath");
        string ExtractionPath = table.Get<string>("ExtractionPath");
        string Sqlite3DbPath = table.Get<string>("Sqlite3DbPath");
        string Server = table.Get<string>("Server");
        Console.WriteLine(Server);
        string Database = table.Get<string>("Database");
        Console.WriteLine(Database);
        string UserId = table.Get<string>("UserId");
        string Password = table.Get<string>("Password");
        Console.WriteLine(UserId);
        Console.WriteLine(Sqlite3DbPath);

        // Gets the Manifest Endpoint
        string manifestEndpoint = await ManifestEndpointRetrieval.GetManifestEndpoint(BungieApiRootPath, GetManifestEndpoint);
        //Console.WriteLine(manifestEndpoint);

        // Recieves Manifest Endpoint and tries to download the manifest zip folder
        await ManifestZipDownloader.DownloadManifest(BungieRootPath:BungieRootPath, ManifestEndpoint:manifestEndpoint, DestinationFolderPath:DestinationFolderPath);

        ManifestFileExtractor.ExtractingManifest(ZipPath:ManifestZipPath, ExtractPath:ExtractionPath);
        //Console.WriteLine(ExtractedFilePathList);
        ExtensionChanger.ChangingFileExtension(ExtractPath:ExtractionPath);

        ManifestTableExtracter.DataMigration(Sqlite3DbPath:Sqlite3DbPath, Server:Server, Database:Database, UserId:UserId, Password:Password);
    }
}