using Nett;

class Program{
    static async Task Main(){

        // Gets all the data from TOML File 
        var table = Toml.ReadFile<Config>("config.toml");
        
        string? ClientID = table.ClientID;
        string? ClientSecret = table.ClientSecret;

        try{

            string? Code = table.Code;
            string? AccessToken = table.AccessToken;
            // No value for Access token is not in toml file
            if (string.IsNullOrEmpty(AccessToken)){
                var (accessToken, refreshToken) = await Tokenizer.GetAccessToken(ClientID, ClientSecret, Code);

                Console.WriteLine("Access Token: " + accessToken.Token);
                Console.WriteLine("Refresh Token: " + refreshToken.Token);
                // Create a TomlObject with the access token string value
                //var accessTokenTomlObject = Toml.Create<string?>(accessToken.Token);

                //var config = Toml.ReadFile<Config>("config.toml");
                table.AccessToken = accessToken.Token;
                table.AccessTokenExpiresAt = accessToken.Expiration;

                table.RefreshToken = refreshToken.Token;
                table.RefreshTokenExpiresAt = refreshToken.Expiration;

                // Console.WriteLine(accessTokenTomlObject);

                // Update the AccessToken value in the TOML table
                //table["AccessToken"] = accessTokenTomlObject;
                //table["AccessToken"] = accessToken.Token;
                Toml.WriteFile(table, "config.toml");
            } else{
                DateTime AccessTokenExpiresAt = table.AccessTokenExpiresAt;

                bool x = Tokenizer.IsTokenValid(AccessTokenExpiresAt);
                //Console.WriteLine(x);

                string? RefreshToken = table.RefreshToken;

                if (x == false){
                    var (accessToken, refreshToken) = await Tokenizer.RefreshAccessToken(ClientID, ClientSecret, RefreshToken);

                    table.AccessToken = accessToken.Token;
                    table.AccessTokenExpiresAt = accessToken.Expiration;

                    table.RefreshToken = refreshToken.Token;
                    table.RefreshTokenExpiresAt = refreshToken.Expiration;

                    Toml.WriteFile(table, "config.toml");
                }
            }
        }catch (Exception ex){
            // Handle exceptions
            Console.WriteLine("An error occurred: " + ex.Message);
        }


        // try{

        //     string? ac = table.AccessToken;
        //     //Console.WriteLine(ac);


        //     var client = new HttpClient();
        //     var request = new HttpRequestMessage(HttpMethod.Get, "https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018535858854/Character/2305843010570074059/Vendors/?components=402,400");
        //     request.Headers.Add("x-api-key", "7ddcabf7cd694545a9bb133e99271e2b");
        //     Console.WriteLine("Authorization", "Bearer " + ac);
        //     request.Headers.Add("Authorization", "Bearer " + ac);
        //     //request.Headers.Add("Cookie", "Q6dA7j3mn3WPBQVV61rt5CrQXv0q+I9ddZfGro+PognXQwjWM8PS+VE_=v1Dt5Rgw__GIi; __cflb=0H28vP5GxS7vgVH4MZT6rB7QcDNQ8jpmH3RxfoVrjqm; bungleanon=sv=BAAAAAAfcwAAAAAAAETybQIAAAAAAAAAAAAAAAAEVHJaHDTcCEAAAAD+WcSXifhvt0oiGPkWyUq/v+u1uUD2AyDV04C2oc/yrYX9pLOfXCMoL9l0hpmbzV6J3VQrle5tsWuJEDYAUvXA&cl=MC4yOTQ3MS40MDc1OTg3Ng==; bungled=1905676033292804210; bungledid=B2fw1zY6i+tAhPcNS7ZsA63vLHJaHDTcCAAA");
        //     var response = await client.SendAsync(request);
        //     if (!response.IsSuccessStatusCode)
        //     {
        //         Console.WriteLine($"Request failed with status code {response.StatusCode}: {await response.Content.ReadAsStringAsync()}");
        //         // Handle the error gracefully, perhaps retry or log the issue.
        //     }
        //     else
        //     {
        //         Console.WriteLine("yes");
        //         Console.WriteLine(await response.Content.ReadAsStringAsync());
        //     }
        //     //Console.WriteLine(await response.Content.ReadAsStringAsync());

        // }
        // catch (Exception ex)
        // {
        //     Console.WriteLine($"An error occurred: {ex.Message}");
        //     // Handle the error gracefully, perhaps retry or log the issue.
        // }



        using (HttpClient httpClient = new HttpClient()){

            try
            {
                string? ac = table.AccessToken;
                Console.WriteLine(ac);

                httpClient.DefaultRequestHeaders.Add("x-api-key", "7ddcabf7cd694545a9bb133e99271e2b");
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + ac);
                var rq = await httpClient.GetAsync("https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018535858854/Character/2305843010570074059/Vendors/?components=402,400");
                Console.WriteLine(rq);
                if (rq.IsSuccessStatusCode){
                    //var responseContent = await rq.Content.ReadAsStringAsync();
                    Console.WriteLine(await rq.Content.ReadAsStringAsync());
                    Console.WriteLine("yes");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }
        


        //string? ac = "CM/5BRKGAgAgBM7wjiFhd6ZTHvD0THBqi0Jt3v7htoNh8fNh6ouGRx3gAAAAL3o1WChcCONEXC8dWsz6wld7eURZdTMSEPyCKAtQB4fm7/EuH9vF/rVYUCmfEEziBFYxzcMjVO7A4TmD4xvCGVLC8EWd8BHt6QPHxv2tUP4tLj1DX4Pks2Bt8SgN6tCm5BHwuLS+ixWHM7wwg+aPJjsiKqOgHldQekJHMznrT0PvzsbZeWzGb/8u3wur+lIej5hIS1bgWIPqrz6rW6j/S1mdQrYfH6swccqykqKqFpComPn7zzrBsh9OaVNdRZFw3Rn+J/aDiuFviE+KYQldZrpjMPHODAv1cpqOyqS3u30=";
        // string? ac = table.AccessToken;
        // var client = new HttpClient();
        // var request = new HttpRequestMessage(HttpMethod.Get, "https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018535858854/Character/2305843010570074059/Vendors/?components=402,400");
        // request.Headers.Add("x-api-key", "7ddcabf7cd694545a9bb133e99271e2b");
        // request.Headers.Add("Authorization", "Bearer " + ac);
        // //request.Headers.Add("Cookie", "Q6dA7j3mn3WPBQVV61rt5CrQXv0q+I9ddZfGro+PognXQwjWM8PS+VE_=v1P95Rgw__rcb; __cflb=0H28vP5GxS7vgVH4MZGXUj1cFxeg3iUzxMGB9xTsnTM; bungleanon=sv=BAAAAAAfcwAAAAAAAETybQIAAAAAAAAAAAAAAAAEVHJaHDTcCEAAAAD+WcSXifhvt0oiGPkWyUq/v+u1uUD2AyDV04C2oc/yrYX9pLOfXCMoL9l0hpmbzV6J3VQrle5tsWuJEDYAUvXA&cl=MC4yOTQ3MS40MDc1OTg3Ng==; bungled=1905676033292804210; bungledid=B2fw1zY6i+tAhPcNS7ZsA63vLHJaHDTcCAAA");
        // var response = await client.SendAsync(request);
        // response.EnsureSuccessStatusCode();
        // Console.WriteLine(await response.Content.ReadAsStringAsync());





        // if (string.IsNullOrEmpty(AccessToken)){
        //     //Console.WriteLine("yes it is");



        //     Console.WriteLine(tokens);


        // }

        // Console.WriteLine("Access Token: "+ AccessToken);
        // //string AccessTokenExpiresIn = table.Get<string>("AccessTokenExpiresIn");
        // string RefreshToken = table.Get<string>("RefreshToken");
        // string RefreshTokenExpiresIn = table.Get<string>("RefreshTokenExpiresIn");

        // try
        // {

        //     string token = await TokenChecker.CheckAccessToken(AccessToken, AccessTokenExpiresIn, RefreshToken, RefreshTokenExpiresIn);

        // }
        // catch(Exception ex){

        // }

        // BungieOAuthClient newer = new BungieOAuthClient("45607", "oED8GHE600tyO3jjt-CtSAhlmTkG1ix3VL.dkXTrXOk");

        // string accessToken = await newer.GetAccessToken("e15afe2b30c9b608e07b22b1066d586a");

        // Console.WriteLine(accessToken);

        // string validToken = await newer.GetValidAccessToken();

        // Console.WriteLine(validToken);
    }
}

class Config {
    public string? ClientID { get; set; }
    public string? ClientSecret { get; set; }
    public string? Code { get; set; }
    public string? AccessToken { get; set; }
    public DateTime AccessTokenExpiresAt { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiresAt { get; set; }
    
}