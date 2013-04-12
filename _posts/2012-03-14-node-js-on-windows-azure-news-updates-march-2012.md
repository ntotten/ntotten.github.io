---
date: 2012-03-14 13:50:32
layout: post
title: Node.js on Windows Azure News & Updates (March 2012)
categories: 
- NodeJS
---

[Node.js on Windows Azure](https://www.windowsazure.com/en-us/develop/nodejs/) continues to get better. The [Windows Azure SDK  for Node.js](https://github.com/WindowsAzure/azure-sdk-for-node) is already on its third release in just a few short months, the PowerShell Cmdlets for Node.js makes deploying to Windows Azure super easy, and improvements to Windows Azure continue to make the platform even more attractive to Node.js developers.

The post is a summary of some of the most recent news and updates around Node.js and Windows Azure.


# Windows Azure SDK for Node.js Version 0.5.2


The Windows Azure SDK for Node.js continues to be updated rapidly. The most recent update, version 0.5.2, adds support for Windows Azure Service Bus in addition to numerous bug fixes.

The addition of Windows Azure Service Bus support to the Node.js SDK enables a whole new set of scenarios for Node.js developers on Windows Azure. The Service Bus enables  developers to build large decoupled systems though relays and pub/sub queues. For more information on version 0.5.2 of the SDK as well as some examples of using Service Bus with Node.js I would recommend reading [this ](http://codebetter.com/glennblock/2012/02/14/servicebus-support-in-azure-npm-0-5-2/)post by Glenn Block.


# Reduced Pricing for Windows Azure Compute and Storage


This next bit of news isn't explicitly for Node.js developers, but it is still big. Recently, we [announced ](http://blogs.msdn.com/b/windowsazure/archive/2012/03/08/announcing-reduced-pricing-on-windows-azure-storage-and-compute.aspx)that the price for Windows Azure Compute and Storage would be reduced. The most notable reduction is that the Extra-Small Compute instance is now priced at $0.02 per hour. This means that you can run two servers with a 99.95% SLA for only about $30 per month.

Combining two extra-small instances with the power of Node.js makes for some serious computing for a great price. I am working on a few demos that will show what you can do with only 2 extra-small instances using Node.js that I will post shortly, but for now I challenge you to build something and see how much you can accomplish for $30 a month.  Remember - if you are a startup you can also use [BizSpark ](http://www.microsoft.com/bizspark)to get even more Windows Azure for FREE.


# Using Windows Azure Access Control Services with Node.js


The last bit of news is a great [post ](http://nodeblog.cloudapp.net/using-windows-azure-access-control-service-acs-from-a-node-app)that [Matias Woloski](https://twitter.com/#!/woloski) did showing how you can use Windows Azure Access Control Services (ACS) with Node.js. The process is really straight forward so if you are building an application that requires multiple identity providers   I recommend giving that a read.


# Coming Soon


Keep an eye out here for most posts like these. Additionally, I am starting a series of tutorials on Node.js and Windows Azure that you will see on my blog shortly.

Let me know if you have any questions or feedback.
