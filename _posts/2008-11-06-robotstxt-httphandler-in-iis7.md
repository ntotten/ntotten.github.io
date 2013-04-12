---
date: 2008-11-06 16:29:00
layout: post
title: Robots.txt HttpHandler in IIS7
categories:
- ASP.NET
---

In a ongoing effort to automate more of my work I decided to build a HttpHandler for IIS that automatically creates my robots.txt files. This particular handler will create robots.txt files that block all search robots. This handler will be installed on our projects web server which is used for development purposes only, and as such we don't want these pages being listed in search engines.

First, we create a class project in visual studio. Next, add a reference to System.Web. Then create one class titled RobotsHandler.cs and add the following code.

[![](/images/2009/01/capture-1.jpg?w=300)](/images/2009/01/capture-1.jpg)

Next, we need to strongly sign the assembly. This is required because we are going to add this assembly to the GAC on our web server. See this link for instructions if you are not familiar with this concept. [http://msdn.microsoft.com/en-us/library/xwb8f617.aspx](http://msdn.microsoft.com/en-us/library/xwb8f617.aspx)

Now that our little class library is completed we need to build. Remember to change the compilation to Release. Now, copy the assembly to the web server and register it in the GAC. See this link for more details on using gacutil. [http://msdn.microsoft.com/en-us/library/ex0ss12c(VS.80).aspx](http://msdn.microsoft.com/en-us/library/ex0ss12c(VS.80).aspx)

After the assembly has been registered, we will register the handler in IIS7. See this link for instructions on how register a custom handler. [http://technet.microsoft.com/en-us/library/cc753249.aspx](http://technet.microsoft.com/en-us/library/cc753249.aspx). Remember to set the path of the handler to "robots.txt". This will intercept all requests to robots.txt and map them to your new handler.

Now, test to make sure everything worked correctly using your web browser. Go to [http://www.mysite.com/robots.txt](http://www.mysite.com/robots.txt). You should see this text:

User-agent: * Disallow: /

You could definitely expand this to use custom rules from a database or configuration file. You could also set the file to allow all robots by changing "Disallow: /" to "Disallow:".
