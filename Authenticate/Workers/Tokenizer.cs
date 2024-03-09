using Newtonsoft.Json;

public class Tokenizer{
    public static async Task<(AccessToken accessToken, RefreshToken refreshToken)> GetAccessToken(string? ClientID, string? ClientSecret, string? code){

        using (HttpClient httpClient = new HttpClient()){
            try{
                if(ClientID == null || ClientSecret == null || code == null){
                    throw new Exception("Failed to parse JSON response.");
                }

                var requestContent = new FormUrlEncodedContent(new Dictionary<string, string>{
                    { "grant_type", "authorization_code" },
                    { "client_id", ClientID},
                    { "client_secret", ClientSecret},
                    { "code", code}
                });

                var response = await httpClient.PostAsync("https://www.bungie.net/Platform/App/OAuth/token/", requestContent);

                if(response.IsSuccessStatusCode){
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var responseContentDictionary = ParseTokenResponse(responseContent);
                    (AccessToken accessToken, RefreshToken refreshToken) = SetAccessToken(responseContentDictionary);
                    return (accessToken, refreshToken);

                }
                else{
                    throw new Exception($"Failed to get access token: {response.StatusCode} - {response.ReasonPhrase}");
                }
            }
            catch (HttpRequestException ex){
                Console.WriteLine($"Error: {ex.Message}");
                return (new AccessToken(), new RefreshToken());
            }
        }
    }

    private static Dictionary<string, string> ParseTokenResponse(string responseContent){

        // Parse the JSON response to extract the access token, refresh token, and expiration time
        // For simplicity, assuming the response is a JSON object with fields "access_token", "refresh_token", and "expires_in"
        // You might need to use a JSON parsing library like Newtonsoft.Json for proper parsing
        // Example parsing logic (replace with actual parsing)

        // Parse the JSON string into a dictionary
        Dictionary<string, string>? acessTokenDict = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseContent);

        if(acessTokenDict == null){
            // Throw an exception if JSON parsing fails
            throw new Exception("Failed to parse JSON response.");
        }

        return acessTokenDict;
    }

    private static (AccessToken accessToken, RefreshToken refreshToken) SetAccessToken(Dictionary<string, string> accessTokenDict){
        AccessToken accessToken = new AccessToken{
            Token = accessTokenDict["access_token"],
            TokenType = accessTokenDict["token_type"],
            ExpiresIn = int.Parse(accessTokenDict["expires_in"]),

        };
        accessToken.Expiration = DateTime.UtcNow.AddSeconds(accessToken.ExpiresIn);
        //Console.WriteLine(accessToken.Expiration);


        RefreshToken refreshToken = new RefreshToken{
            Token = accessTokenDict["refresh_token"],
            TokenType = accessTokenDict["token_type"],
            ExpiresIn = int.Parse(accessTokenDict["refresh_expires_in"]),
        };
        refreshToken.Expiration = DateTime.UtcNow.AddSeconds(refreshToken.ExpiresIn);

        return (accessToken, refreshToken);
    }

    public static bool IsTokenValid(DateTime accessTokenExpiresAt){
        if(DateTime.UtcNow >= accessTokenExpiresAt){
            return false;
        }
        return true;
    }
    
    public static async Task<(AccessToken accessToken, RefreshToken refreshToken)> RefreshAccessToken(string? ClientID, string? ClientSecret, string? RefreshToken){

        using (HttpClient httpClient = new HttpClient()){
            try{

                if (ClientID == null || ClientSecret == null || RefreshToken == null){
                    throw new Exception("Failed to parse JSON response.");
                }

                var requestContent = new FormUrlEncodedContent(new Dictionary<string, string>{
                    { "grant_type", "refresh_token" },
                    { "client_id", ClientID },
                    { "client_secret", ClientSecret },
                    { "refresh_token", RefreshToken }

                });

                var response = await httpClient.PostAsync("https://www.bungie.net/Platform/App/OAuth/token/", requestContent);

                if (response.IsSuccessStatusCode){
                    var responseContent = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(responseContent);
                    var responseContentDictionary = ParseTokenResponse(responseContent);
                    (AccessToken accessToken, RefreshToken refreshToken) = SetAccessToken(responseContentDictionary);
                    return (accessToken, refreshToken);
                }
                else{
                    throw new Exception($"Failed to get access token: {response.StatusCode} - {response.ReasonPhrase}");
                }
            }
            catch(HttpRequestException ex){
                Console.WriteLine($"Error: {ex.Message}");
                return (new AccessToken(), new RefreshToken());
            }
        }
    }

    public class AccessToken{
        public string? Token { get; set; }
        public string? TokenType { get; set; }
        public int ExpiresIn { get; set; }
        public string? MembershipId { get; set; }
        public DateTime Expiration { get; set;}

    }

    public class RefreshToken{
        public string? Token { get; set; }
        public string? TokenType { get; set; }
        public int ExpiresIn { get; set; }
        public string? MembershipId { get; set; }
        public DateTime Expiration { get; set; }
    }
}

// public class BungieOAuthClient
// {
//     private readonly HttpClient _httpClient;
//     private readonly string _clientId;
//     private readonly string _clientSecret;
//     private readonly string _apiKey;
//     private string _accessToken;
//     private string _refreshToken;
//     private DateTime _accessTokenExpiration;

//     public BungieOAuthClient(string clientId, string clientSecret)
//     {
//         //_httpClient = new HttpClient();
//         _clientId = clientId;
//         _clientSecret = clientSecret;
//     }

//     public async Task<string> GetAccessToken(string code)
//     {
//         var requestContent = new FormUrlEncodedContent(new Dictionary<string, string>
//         {
//             { "grant_type", "authorization_code" },
//             { "client_id", _clientId },
//             { "client_secret", _clientSecret },
//             { "code", code }
//         });

//         // Include x-api-key header
//         //_httpClient.DefaultRequestHeaders.Add("x-api-key", _apiKey);

//         var response = await _httpClient.PostAsync("https://www.bungie.net/Platform/App/OAuth/token/", requestContent);

//         if (response.IsSuccessStatusCode)
//         {
//             var responseContent = await response.Content.ReadAsStringAsync();
//             var tokenResponse = ParseTokenResponse(responseContent);
//             Console.WriteLine(responseContent);
//             SetAccessToken(tokenResponse);
//             return _accessToken;
//         }
//         else
//         {
//             throw new Exception($"Failed to get access token: {response.StatusCode} - {response.ReasonPhrase}");
//         }
//     }

// private void SetAccessToken(TokenResponse tokenResponse)
// {
//     _accessToken = tokenResponse.AccessToken;
//     _refreshToken = tokenResponse.RefreshToken;
//     _accessTokenExpiration = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresIn);
// }

//     private async Task<string> RefreshAccessToken()
//     {
//         var requestContent = new FormUrlEncodedContent(new Dictionary<string, string>
//         {
//             { "grant_type", "refresh_token" },
//             { "client_id", _clientId },
//             { "client_secret", _clientSecret },
//             { "refresh_token", _refreshToken }
//         });

//         // Include x-api-key header
//         //_httpClient.DefaultRequestHeaders.Add("x-api-key", _apiKey);

//         var response = await _httpClient.PostAsync("https://www.bungie.net/Platform/App/OAuth/token/", requestContent);

//         if (response.IsSuccessStatusCode)
//         {
//             var responseContent = await response.Content.ReadAsStringAsync();
//             var tokenResponse = ParseTokenResponse(responseContent);
//             SetAccessToken(tokenResponse);
//             return _accessToken;
//         }
//         else
//         {
//             throw new Exception($"Failed to refresh access token: {response.StatusCode} - {response.ReasonPhrase}");
//         }
//     }

//     private TokenResponse ParseTokenResponse(string responseContent)
//     {
//     // Parse the JSON response to extract the access token, refresh token, and expiration time
//     // For simplicity, assuming the response is a JSON object with fields "access_token", "refresh_token", and "expires_in"
//     // You might need to use a JSON parsing library like Newtonsoft.Json for proper parsing
//     // Example parsing logic (replace with actual parsing)
//     // var tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(responseContent);
//     // return tokenResponse;

//     // Example parsing logic (for simplicity)
//     var parts = responseContent.Split(',', StringSplitOptions.RemoveEmptyEntries);
//     var accessToken = parts[0].Split(':')[1].Trim('"');
//     var refreshToken = parts[1].Split(':')[1].Trim('"');
//     var expiresIn = int.Parse(parts[2].Split(':')[1]);
//     return new TokenResponse
//     {
//         AccessToken = accessToken,
//         RefreshToken = refreshToken,
//         ExpiresIn = expiresIn
//     };
// }

//     public async Task<string> GetValidAccessToken()
//     {
//         if (_accessToken == null || DateTime.UtcNow >= _accessTokenExpiration) <- accessToken.AccessTokenExpiresAt
//         {
//             // Access token expired or not available, refresh it
//             return await RefreshAccessToken();
//         }
//         else
//         {
//             return _accessToken;
//         }
//     }

//     private class TokenResponse
//     {
//         public string AccessToken { get; set; }
//         public string RefreshToken { get; set; }
//         public int ExpiresIn { get; set; }
//     }
// }
