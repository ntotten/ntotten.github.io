---
date: '2011-04-17'
layout: post
title: MVC Extension Method for Hosting Static Content on a CDN
categories:
  - ASP.NET
  - Windows Azure
reirect_from: /2011/04/mvc-static-content-extensions/
---

I created a simple extension method that allows you to easily host your static content off the Microsoft ASP.NET Ajax CDN and Windows Azure CDN. This simple extension method will improve the performance of your website as well as saving server capacity (i.e. money).

As you may have heard Windows Azure now supports using your [Web Roles as a CDN backing](http://blog.smarx.com/posts/using-the-windows-azure-cdn-for-your-web-application). This allows you to use the Windows Azure CDN without the need to move your static content from your Content and Scripts folders to blob storage.

To get started with this extension, install one of the NuGet packages. There are two choices. The first is called [MvcStaticContentHelper.ASPX](http://nuget.org/List/Packages/MvcStaticContentHelper.ASPX) and should be used on sites that are using ASPX view syntax. The second is called [MvcStaticContentHelper.Razor](http://nuget.org/List/Packages/MvcStaticContentHelper.Razor) and should be used on sites that are using the new Razor view syntax. The source of this package is also available as a Gist here, but I would recommend using NuGet because it sets up your web.config file and such.

To use the extension simply replace your @Url.Content methods with @Url.StaticContent.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>@ViewBag.Title</title>
  <link href="@Url.StaticContent("~/Content/Site.css")" rel="stylesheet" type="text/css" />
  <script src="@Url.StaticContent("~/Scripts/jquery-1.5.1.min.js")" type="text/javascript"></script>
  <script src="@Url.StaticContent("~/Scripts/modernizr-1.7.min.js")" type="text/javascript"></script>
</head>
<body>
```

Using the StaticContent method renders the following html output.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Home Page</title>
  <link href="http://example1.cloudapp.net/cdn/Content/Site.css" rel="stylesheet" type="text/css" />
  <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.1.min.js" type="text/javascript"></script>
  <script src="http://example1.cloudapp.net/cdn/Scripts/modernizr-1.7.min.js" type="text/javascript"></script>
</head>
<body>
```

As you can see, the static files are now served using either the Windows Azure CDN or the ASP.NET Ajax CDN. The ASP.NET Ajax CDN is used whenever possible because it is completely free and most likely the files are already on your user's local cache.

Next you need to set your Windows Azure CDN namespace. Windows Azure CDN will host your files from a url such as http://mytest.cloudapp.net/cdn/. You must set the app setting in your web.config file as show.

```xml
<appSettings>
  <add key="WindowsAzureCdnNamespace" value="set_this_value" />
</appSettings>
```

NOTE: If you don't want to use Windows Azure CDN, then simply remove the entire app setting value. The extension method will only use content from the ASP.NET Ajax CDN if it is available, otherwise it will ues the normal content path from you web server.

There are few more things that might be nice to add to this plugin. First, the plugin should behave differently when you are debugging. When debugging you don't really want to use any CDN at all. Second, it might be good to set querystring values specifying the version number for files served from the Azure CDN. This will make sure that when you redeploy, users always have the correct static content. Last, I would like to move the static content to an external XML file stored in App_Data. This would make it easier to add new CDN files.

Let me know if you have any questions or feedback.

