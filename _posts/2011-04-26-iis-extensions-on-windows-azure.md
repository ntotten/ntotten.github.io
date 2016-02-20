---
date: 2011-04-26 12:24:12
layout: post
title: IIS Extensions on Windows Azure
categories:
- Windows Azure
---

I have had a few questions recently about using IIS Extensions in Windows Azure. I thought it would be a good idea to clarify a few things and start a list of what extensions will work and which ones either won’t work or aren’t needed. First, off it is important to remember that a Windows Azure Web Role runs regular IIS so you can pretty much do anything you want to it.

The best way to browse and install [IIS Extensions](http://www.iis.net/download/) is using the [Web Platform Installer](http://www.microsoft.com/web/downloads/platform.aspx). WebPI allows you to easy select which IIS Extensions (and other useful software) you would like to install. Additionally, we can even use WebPI through the command line to install extensions on Windows Azure. For full instructions on how to use WebPI on Azure see this great [MSDN Article](http://msdn.microsoft.com/en-us/library/gg433059.aspx).

By default Windows Azure Web Roles already have FastCGI and Url Rewrite installed so you wont need to worry about those. Everything else is up to you.

If you are a PHP developer you can easily run [PHP in Windows Azure](http://php.iis.net/). I am not going to go into full detail on that because much has already been written about it. MSDN has a great [tutorial](http://msdn.microsoft.com/en-us/library/gg433059.aspx) that will get you started. Another great extension for PHP developers is the [Windows Cache Extensions for PHP](http://www.iis.net/download/WinCacheForPhp). This extension can greatly speed up your PHP application.

For those of you that are building video rich websites there is a large set of [extensions](http://www.iis.net/download/ServeMedia) available that will help you better [serve media](http://www.iis.net/download/ServeMedia). However, one thing to note is that [Windows Azure CDN will soon be supporting smooth streaming](http://www.microsoft.com/windowsazure/cdn/default.aspx) so if you are not rolling out for a while that will be your best bet. If you need to get setup now, I would recommend checking out this [article](http://blog.smarx.com/posts/smooth-streaming-with-windows-azure-blobs-and-cdn).

Another extension that can come in handy for some more advanced scenarios is the [Application Request Routing](http://www.iis.net/download/ApplicationRequestRouting) extension. AAR allows you to gain even greater control over load balancing within your application. Remember that Windows Azure will handle load balancing between your role instances for you, but if you need to do something more advanced like create a reverse proxy to host [Python, Ruby, and Node.js on the same server](http://blog.smarx.com/posts/node-js-ruby-and-python-in-windows-azure-my-mix-talk) then you will need this extension.

The final extension is called [UrlScan](http://www.iis.net/download/UrlScan). This extension is a security tool that will block potentially dangerous requests based on rules you set. This extension is absolutely worth using in all of your applications on Azure and other environments.

There is another extension in the security category worth mentioning. This extension is called [Dynamic IP Restrictions](http://www.iis.net/download/DynamicIPRestrictions). However, this extension is in beta and I have not tried it out. This extension helps mitigate or block Denial of Service Attacks and Brute-force attacks by temporarily blocking clients who trigger security flags. If you want to give it a try in Azure let me know how it works for you.

Thanks for reading.
