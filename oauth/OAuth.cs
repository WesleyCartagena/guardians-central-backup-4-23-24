using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;

class Program
{
    static void Main()
    {
        var chromeDriverPath = @"C:\Users\Wesley\Desktop\chromedriver\chromedriver_win32\chromedriver.exe";
        using (var driver = new ChromeDriver(chromeDriverPath))
        {
            // Navigate to the initial page where you select the login provider
            driver.Navigate().GoToUrl("https://bungie.net/en/oauth/authorize?client_id=45607&response_type=code");  // Replace with your actual URL

            // Click on the Steam login provider
            var steamProviderLink = driver.FindElement(By.CssSelector("a[href*='/en/User/SignIn/SteamId']"));
            steamProviderLink.Click();

            // Wait for the Steam login page to load (modify according to your webpage's structure)
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            //wait.Until(d => d.Url.Contains("steamcommunity"));
            //wait.Until(ExpectedConditions.ElementIsVisible(By.ClassName("_2eKVn6g5Yysx9JmutQe7WV")));


            // Interact with the Steam login fields
            var steamUsernameField = wait.Until(d =>
                d.FindElement(By.ClassName("_2eKVn6g5Yysx9JmutQe7WV")));
            var steamPasswordField = wait.Until(d =>
                d.FindElement(By.CssSelector("input[type='password']._2eKVn6g5Yysx9JmutQe7WV")));
            
            // Input Steam credentials
            steamUsernameField.SendKeys("your_steam_username");
            steamPasswordField.SendKeys("your_steam_password");

            // Find and interact with the "Next" or similar button to proceed to the code step
            var signInButton = wait.Until(d => d.FindElement(By.CssSelector("button._2QgFEj17t677s3x299PNJQ")));
            signInButton.Click();

            // Wait for the page to load after selecting the provider
            wait.Until(d => !d.Url.Contains("guardians-central"));  // Assuming the URL changes after successful login

            // Extract the code from the URL
            string urlWithCode = driver.Url;
            string code = ExtractCodeFromUrl(urlWithCode);

            // Do something with the extracted code
            Console.WriteLine("Code from URL: " + code);

            driver.Quit();
        }
    }

    // Extract code from URL (customize according to your URL structure)
    static string ExtractCodeFromUrl(string url)
    {
        var uri = new Uri(url);
        var code = System.Web.HttpUtility.ParseQueryString(uri.Query).Get("code");

        return code;
    }
}