---
date: 2012-10-24 12:22:21
layout: post
title: ASP.NET 4.5 on Windows Azure Web Sites
categories:
- Windows Azure
---

As of today [Windows Azure Web Sites](https://www.windowsazure.com/en-us/home/scenarios/web-sites/) now supports .Net Framework 4.5. This gives you the ability to use [all kinds of new features](http://msdn.microsoft.com/en-us/library/vstudio/hh420390.aspx#whatsnew_feature) with your web app. The most important feature for web developers with .Net 4.5 is the new asynchronous methods available in ASP.NET. This asynchronous support enables developers to easily build high scale and high performance web applications without all the hassle normally associated with asynchronous programming. In this post I will walk you through how to build a simple ASP.NET MVC 4 web application using .Net 4.5 and how to deploy that application to Windows Azure Web Sites.

If you don't already have it you should install Visual Studio 2012. You can download[ Visual Studio Express 2012 for Web](http://msdn.microsoft.com/en-us/library/dd537667(v=VS.110)) using the [Web Platform installer](http://www.microsoft.com/web/downloads/platform.aspx). This version of Visual Studio is completely free.

After you are setup with Visual Studio create a new MVC 4 web app and use the internet template.

[![](/images/2012/10/newproject.png)](/images/2012/10/newproject.png)
After you create the project, add a new Controller to the project that to serve our results asynchronously  Change the controller to inherit from AsyncController rather than Controller. Below you will see this controller along with a simple method that utilizes async to server content asynchronously.

```cs
public class MyServiceController : AsyncController {
  // GET: /MyService/
  public async Task<ActionResult> Index() {
    return await Task.Factory.StartNew(() => {
      Thread.Sleep(3000);
      return Content("Hello");
    });
  }
}
```

You can see this controller returns a Task<ActionResult> rather than just the ActionResult object. The beauty of all this is that with just a few changes to how you write your controllers you can easily build services and actions that are non-blocking. This will increase the capacity of your services and improve overall performance of your application.

In addition to the new asynchronous features, another cool feature that .Net 4.5 allows is the use of [spacial data types in Entity Framework](http://msdn.microsoft.com/en-us/data/hh859721). Spacial data types allow you to store data such as longitude and latitude coordinates of an object and query them in geographically appropriate ways. To use this feature with Entity Framework code-first you simply need to create an object like the one shown below that has a property of type DbGeography. You can see an example of a location object below.

```cs
public class Location {
  public int Id { get; set; }
  public string Name { get; set; }
  public DbGeography Coordinates { get; set; }
}
```

You can read more about how geospatial data works in [this blog post](http://dotnetdevdude.com/Blog/2012/01/23/EntityFrameworkCodeFirstSpatialData.aspx).

In order to deploy your application to Windows Azure Web Sites you simply need to download the publish profile from the portal and publish using WebDeploy. You can [read more](https://www.windowsazure.com/en-us/develop/net/tutorials/web-site-with-sql-database/) about how to create and deploy a web site to Windows Azure [here](https://www.windowsazure.com/en-us/develop/net/tutorials/web-site-with-sql-database/).

After the site is deployed you can see how the AsyncController serves the "Hello" content after waiting for 3 seconds.

[![](/images/2012/10/hello.png)](/images/2012/10/hello.png)

And that's all we need to do in order to publish a .Net 4.5 site to Windows Azure.
