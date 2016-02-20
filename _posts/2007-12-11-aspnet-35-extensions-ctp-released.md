---
date: 2007-12-11 16:42:00
layout: post
title: ASP.NET 3.5 Extensions CTP Released
categories:
- ASP.NET
---

I downloaded and tested the new ASP.NET 3.5 Extensions today. There are many new and exciting features in the CTP. My favorite is the MVC (Model View Controller) Framework and its accompanying tools. The MVC framework is a complete 360 from traditional ASP.NET forms pages in a number of ways. First, there is a very clear separation of the layers of your ASP.NET web app. Second, you will notice the HTML output of a MVC app is extremely clean. There are not viewstate or other hidden tags among other things. Third, and probably most important, is the page life cycle is very different. While ASP.NET MVC is built on top of System.Web many events from the old System.Web.UI.Page class are not fired inside the new ViewPage class.

From a application development standpoint I think this new framework will help developers and designers work better together. I don't have to worry much about what goes into the .aspx page and the the designer doesn't have to worry about dependencies in my code. ("Is it okay to change this datalist to a repeater?") As a developer I am only responsible for passing objects into ViewData. The designer can insert these values wherever they please. For example, lets say I make a simple have a PersonController with the action Person. This action accepts an id value. So the url might be [http://www.example.com/People/Person/32](http://www.example.com/People/Person/32). Using my DataContext from my SQL to LINQ I use dc.GetPerson(id) to retreive a single person. From there I simply use RenderView(string viewName, object viewData) to render the view and pass the person object to ViewData. The Person object will be automatically placed into the ViewData dictionary and be accessible on the view using ViewData["FirstName"] for example.

**The controller.**

[![](/images/2009/01/image-21.png)](/images/2009/01/image-21.png)

**The view.**

[![](/images/2009/01/image-41.png)](/images/2009/01/image-41.png)

The end result is a very maintainable piece of software, a very nice URL for the end user and clean HTML output. It will be interesting to see how this project progresses and how it fits into our software at Atlas Bay.
