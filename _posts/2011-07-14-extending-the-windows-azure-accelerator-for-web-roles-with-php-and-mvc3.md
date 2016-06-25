---
date: '2011-07-14'
layout: post
title: Extending the Windows Azure Accelerator for Web Roles with PHP and MVC3
categories:
  - ASP.NET
  - Windows Azure
reirect_from: >-
  /2011/07/extending-the-windows-azure-accelerator-for-web-roles-with-php-and-mvc3/
---

A number of people have asked me if the Windows Azure Accelerator for Web Roles (WAAWR) supports PHP so I thought I would write a quick post on how to enable support. Out of the box we don’t install PHP on the WAAWR instances, but it is very easy to do so. While we are at it I will also show you how to install MVC3 on the server so you don’t have to do a bin deploy of the MVC3 references on every site deployment.

First, you will have to redeploy your WAAWR project to do this, but your state and sites will be preserved because they are stored in Windows Azure blob and table storage. So to get started open up your WAAWR solution in Visual Studio. Next locate and open the file /Startup/ConfigureIIS.cmd in the web role project.

By default the startup command uses the Web Platform Installer to install Web Deploy. See the script below.

[![image](/images/2011/07/image_thumb2.png)](/images/2011/07/image2.png)

To install PHP and MVC3 you just need to add a few lines to this command.

[![image](/images/2011/07/image_thumb3.png)](/images/2011/07/image3.png)

[Click here to download the updated ConfigureIIS.cmd file](https://gist.github.com/1082776).

After you have made the changes to the ConfigureIIS.cmd redeploy the accelerator and you are ready to use PHP and MVC3 in any of your web applications.

To test the configuration I am going to deploy a simple site that includes three pages: info.php, info.aspx, and info.cshtml.

[![image](/images/2011/07/image_thumb4.png)](/images/2011/07/image4.png)

I have this solution deployed to [http://info.demo.ntotten.com](http://info.demo.ntotten.com) so you can see the working results.

* [http://info.demo.ntotten.com/info.php](http://info.demo.ntotten.com/info.php)
* [http://info.demo.ntotten.com/info.cshtml](http://info.demo.ntotten.com/info.cshtml)
* [http://info.demo.ntotten.com/info.aspx](http://info.demo.ntotten.com/info.aspx)

[![SNAGHTML1f8620](/images/2011/07/snaghtml1f8620_thumb.png)](/images/2011/07/snaghtml1f8620.png)

Again, [here](https://gist.github.com/1082776) is the updated [ConfigureIIS.cmd](https://gist.github.com/1082776) file for you to use in your WAAWR project.

Let me know how this works for you.

