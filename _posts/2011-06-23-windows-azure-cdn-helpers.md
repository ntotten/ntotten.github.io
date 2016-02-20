---
date: 2011-06-23 19:14:40
layout: post
title: Windows Azure CDN Helpers
categories:
- ASP.NET
- Windows Azure
---

Speed is critical for a modern web application. Users don’t wait around for your page to load or respond. If you don’t deliver speed to your users/customers/etc. you will lose them. Conveniently, I don’t need to go into too much detail on why you need to speed up your page because [Jeff Atwood](https://twitter.com/#!/codinghorror) just wrote [a post](http://www.codinghorror.com/blog/2011/06/performance-is-a-feature.html) on this very thing. I would highly suggest reading that post and implementing the recommendations made by [Yahoo ](http://developer.yahoo.com/yslow/)and [Google](http://code.google.com/speed/page-speed/) for performance.

However, what I will talk about is how to utilize the Windows Azure CDN to get great performance for a small price tag from your web application. The Windows Azure CDN has 26 nodes worldwide, and like all of Windows Azure, you only pay for what you use. This means that using the Windows Azure CDN is affordable no matter the amount of traffic your site generates.

Today I published a new open source project on Github called the [Windows Azure CDN Helpers](https://github.com/ntotten/wa-cdnhelpers). This is a simple library of MVC helper methods that will allow you to quickly integrate the [Windows Azure CDN](http://www.microsoft.com/windowsazure/cdn/) into your web application to speed up your site. Full instructions on how to use the CDN Helpers are available here. Utilizing these simple tools should result in a fairly significant performance increase on your site. I tested a simple website and went from about 80/100 on Google Page Speed Test to 96/100 by implementing these helpers and the Windows Azure CDN.

To get started with the Windows Azure CDN Helpers install one of two Nuget packages. If you are using the Razor view engine install "[CdnHelpers.Razor](http://nuget.org/List/Packages/CdnHelpers.Razor)" and if you are using the ASPX view engine install "[CdnHelpers.ASPX](http://nuget.org/List/Packages/CdnHelpers.ASPX)". These packages are exactly the same except for a few minor Web.Config differences.

After you install the packages you will need to setup your configuration. The configuration is all done using code that runs at your applications startup. You can find this code in /App_Start/CdnHelpers.cs.
The two big things to change are your Cdn Endpoing Url and to enable blob storage backing if you are not hosting your website on Windows Azure. Here is the default configuration. Notice the CdnEndpointUrl is set to "[namespace].vo.msecdn.net". You must change this to your CDN endpoing URL.

```cs
public static void Start() {

  CdnHelpersContext.Current.Configure(c => {
    c.CdnEndointUrl = "[namespace].vo.msecnd.net";
    //c.EnableBlobStorageBacking(CloudStorageAccount.DevelopmentStorageAccount);
    c.EnableImageOptimizations();
    c.UseCdnForContentFolder();
    c.UseCdnForScriptsFolder();
    c.HashKey = Assembly.GetExecutingAssembly().GetName().Version.ToString();
    c.DebuggingEnabled = () => { return System.Web.HttpContext.Current.Request.IsLocal; };
  });

  CdnHelpersContext.Current.RegisterCombinedJsFiles("core",
    "~/scripts/modernizr-1.7.js"
  );

  CdnHelpersContext.Current.RegisterCombinedCssFiles("site",
    "~/content/Site.css"
  );
}
```

The two methods called here "RegisterCombinedJsFiles" and "RegisterCombinedCssFiles" are used to build combined and minimized JS and CSS files. You set the key of the file and enumerate all the files you want combined into that key. Then to use the files you set your CSS and JS files in your Master Page or Layout Page like this:

```html
@ViewBag.Title
<script type="text/javascript" src="@Url.CdnContent("/Scripts/jquery-1.5.1.min.js")"></script>
<script type="text/javascript" src="@Url.CdnCombinedJs("core")"></script>
```

After that you are ready to go. You will see that your static files are now combined and served from the Windows Azure CDN.

Home Page

```html
<script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.1.min.js"></script>
<script type="text/javascript" src="http://[namespace].vo.msecnd.net/a87341b5b4c095639e86220e2db79980.js"></script>
```

You will also notice that the JQuery file is served from the [Microsoft Ajax CDN](http://www.asp.net/ajaxlibrary/CDN.ashx). Any file that is available in that CDN will automatically be used as this CDN is preferred to your own since it is likely the user already has that file cached on their local computer. You can define additional CDN files in the /App_Data/CdnHelpers.xml file.

Additionally, this sample integrates with the [Sprite and Image Optimization Framework](http://aspnet.codeplex.com/releases/view/65787) to generate image sprites and serve them from the CDN. You can read more about how to use that tool on the [wiki](https://github.com/ntotten/wa-cdnhelpers/wiki).

Give it a try and let me know what your page speed increases to. I suspect that most of you will receive a 10-15% bump in your score by using this tool and the Windows Azure CDN.
