---
date: 2012-06-07 16:09:45
layout: post
title: 10 Things about Windows Azure Web Sites
categories:
- Windows Azure
---

[Windows Azure Web Sites](https://www.windowsazure.com/en-us/home/scenarios/web-sites/) (WAWS) is a feature I have been wanting for a while. Before I was at Microsoft I was a web developer building applications on Windows Azure. Cloud Services are great for many different types of applications, but many times you don't need or care about startup tasks, full system access, or tweaking the web server. For many projects, you just want to deploy your application to a high-scale environment that just works - this is were Windows Azure Web Sites comes in. In this post I will show you ten awesome features available with Windows Azure Web Sites.

# Git Deployment

[![](/images/2012/06/gitpublish.png)](/images/2012/06/gitpublish.png)

One of my favorite features with WAWS is the ability to deploy using Git. This works on any OS and is extremely quick and easy. In order to deploy a site to WAWS using Git simply click "Set up Git Publishing" on your website and Windows Azure will create a Git repository on the server. Next run a few simple commands in the console or terminal.

[![](/images/2012/06/gitconsole.png)](/images/2012/06/gitconsole.png)

# Deployment Rollback
When you deploy your site to WAWS using Git or TFS you will see the deployment history in the portal. You can select a previous deployment and roll your site back in just a few seconds. If you ever deploy a broken version of your site this can save you and your users a lot of headaches.

[![](/images/2012/06/deployments.png)](/images/2012/06/deployments.png)

# Standard Web.config
With Windows Azure Web Sites, you don't need to move your configuration settings to a special file or use any special tool to manage your different environments. Simply use your standard Web.config file to store your configuration settings. You can use the different transforms such as debug and release to store settings for each deployment. Additionally, you can edit your configuration settings of your live site in the portal... if you are into that sort of thing.

[![](/images/2012/06/settings.png)](/images/2012/06/settings.png)

# Download Log Files
With Windows Azure Web Sites you have access to the log files for your site. You can access these logs either through FTP or through the command line tool. I prefer using the command line tool by running the command azure site log download [name].

[![](/images/2012/06/log.png)](/images/2012/06/log.png)

# MySQL Databases
Along with Windows Azure SQL Databases you can now create MySQL database to use in your Windows Azure Web Site. To enable this scenario Microsoft partnered with ClearDB to enable this create MySQL service. To create a MySQL database simply select "Create new MySQL database" from the dropdown list on the new web site dialog.

[![](/images/2012/06/mysql.png)](/images/2012/06/mysql.png)

# Scale Instantly
There are two options for scaling Windows Azure Web Sites. The first is to increase the number of processes available for your web site in shared mode. The second is to move to reserved mode. Reserved mode moves your site to dedicated virtual machines. In reserved mode you can select the number of virtual machines you would like as well as the size of the VMs. Regardless of how you scale your site, your site will remain only while  it scales and the scale process takes only a few seconds.

[![](/images/2012/06/scale.png)](/images/2012/06/scale.png)

# Full Trust
Windows Azure Web Sites is not just any high-density hosting environment. Windows Azure Web Sites was built to fully isolate each site on the same server using a new application virtualization technology - this isn't just shared hosting with AppPool isolation. Because of this you can run your applications under full trust. There are of course some restrictions as we need to keep the machines secure, but generally you can run any ASP.NET application unmodified in WAWS and be confident in your application's security.

# Classic ASP
You have heard that Windows Azure Web Sites supports a variety of new languages and frameworks such as ASP.NET MVC 4, Node.js, and PHP. What you might not know is that it also supports all kinds of old technology like ASP.NET 2.0 and even classic ASP. If you are running legacy code on an outdated server, now might be the time to move that site to the cloud.

# Web Deploy
In addition to Git, you can also deploy to Windows Azure Web Sites using Web Deploy. The updated Wep Deploy features in Visual Studio 2010 and Visual Studio 2012 RC allow you to import your publish profile and deploy your site to WAWS in just a few seconds. While not supported in the preview eventually you will also be able to use this new feature to perform database updates as well.

[![](/images/2012/06/webdeploy.png)](/images/2012/06/webdeploy.png)

# Package Managers
Last, when you deploy your application to Windows Azure Web Sites there is no need to include your NuGet or Node packages in your deployment. We will automatically pull in the correct versions of these packages and add them to your site on deployment. This means your deployment is smaller and will upload quickly. Additionally, we actually cache these packages on our servers to make your deployment even faster.

[![](/images/2012/06/nuget.png)](/images/2012/06/nuget.png)

# End.
Now that you have seen some of the new features and tips on using Windows Azure Web Sites I hope you will give it a try.[ Click here to sign up for the preview](https://www.windowsazure.com/en-us/pricing/3-month-trial/). Additionally, if you want to learn more about this and other new features in Windows Azure tune in next Monday and watch [Learn Windows Azure](http://channel9.msdn.com/Events/windowsazure/Learn-2012TechEd-NA) streamed live from TechEd North America.

**UPDATE: **[Three more Things about Windows Azure Web Sites](/2012/06/08/three-more-things-about-windows-azure-web-sites/)
