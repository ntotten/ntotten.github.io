---
date: '2009-08-12'
layout: post
title: Google Apps Account Renaming Tool
categories:
  - Notes
reirect_from: /2009/08/google-apps-account-renaming-tool/
---

Yesterday a client of Atlas Bay asked me if it was possible to rename some of their user accounts in Google Apps. After a bit of digging I found that it was possible, but only using the Google’s provisioning API. Unfortunately, the provisioning API is only available for Google Apps Premier Edition users. I decided that the easiest way to complete this renaming of the user accounts was to build a tool using Google’s .Net SDK. After a few minutes I developed a simple command application that will allow me to rename any user account in a Google Apps domain. Using the tools is simple, and I have made it available for anyone to use. Here is how you complete an account rename.

First, you need to turn on the provisioning API on your Google Apps account. To do this, click on the Users and groups tab in your domain administration site. Next, check the box called “Enable provisioning API.”![ProvisionAPI](http://ntotten.com/wp-content/uploads/2009/08/ProvisionAPI1.png)

After the API is enabled you can use my tool to rename an account. If you are running Windows, Internet Explorer, and have .Net 3.5 installed simply [click here](http://atlasbay.com/downloads/GoogleAppsRenamingTool/Google%20Apps%20Renaming%20Tool.application) to run the application. If you are on Firefox or another browser you can download and install the application [here](http://atlasbay.com/downloads/GoogleAppsRenamingTool/setup.exe).

When the application opens you will be prompted to enter your domain, administrator email address, and password. As a note, this application is running on your computer and all data is being transmitted securely to Google so all your data should be safe.

![firstscreen](http://ntotten.com/wp-content/uploads/2009/08/firstscreen1.png)

After you have entered your administration credentials you will be prompted to enter the old username and new username. After you click enter, the request will be sent to rename the account. Be careful because there is no confirmation. However, if you make a mistake you can always just fix it with this tool.

After the account has been renamed you will receive a message that the operation completed successfully and asking you if you would like to rename another account using your same administrator credentials. If there is an error you will be told, however there is no detailed information about the cause of the error.

The only thing that is left is to turn off the provisioning API in your Google Apps administration site and you are done.

In case you would like to modify this program yourself here is the source code. You will need to download and reference the .Net library for the Google Data API [here](http://code.google.com/p/google-gdata/downloads/list). You will have to reference Google.GData.Apps, Google.GData.Client, and Google.GData.Extensions in your project.

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Google.GData.Apps;

namespace AtlasBay.GoogleAppsTools
{
  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Domain:");
      string domain = Console.ReadLine();
      Console.WriteLine("Administrator Email:");
      string adminEmail = Console.ReadLine();
      Console.WriteLine("Administrator Password:");
      string adminPass = Console.ReadLine();
      RenameUser(domain, adminEmail, adminPass);
    }

    static void RenameUser(string domain, string adminEmail, string adminPassword)
    {
      Console.WriteLine("Old Username:");
      string oldUsername = Console.ReadLine();
      Console.WriteLine("New Username:");
      string newUsername = Console.ReadLine();
      try
      {
        AppsService service = new AppsService(domain, adminEmail, adminPassword);
        UserEntry entry = service.RetrieveUser(oldUsername);
        entry.Login.UserName = newUsername;
        service.UpdateUser(entry);
        Console.WriteLine("Rename Successful. Perform another rename? y/n");
      }
      catch
      {
        Console.WriteLine("An error occurred while performing the update. Try another? y/n");
      }
      var key = Console.ReadKey();
      if (key.Key == ConsoleKey.Y)
      {
        Console.WriteLine();
        RenameUser(domain, adminEmail, adminPassword);
      }
    }
  }
}
```

This application and code are provided as is. The application [works on my machine](http://www.codinghorror.com/blog/archives/000818.html), but you are using this at your own risk.

