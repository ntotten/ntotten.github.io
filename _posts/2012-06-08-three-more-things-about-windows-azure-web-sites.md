---
date: '2012-06-08'
layout: post
title: Three more Things about Windows Azure Web Sites
categories:
  - Windows Azure
reirect_from: /2012/06/three-more-things-about-windows-azure-web-sites/
---

Yesterday, I wrote a post titled [10 Things about Windows Azure Web Sites](/2012/06/07/10-things-about-windows-azure-web-sites). After people read that article there were several common questions that came up that I thought I would answer.

# SSL Certificates
Windows Azure Web Sites currently has a wildcard SSL certificate for *.azurewebsites.net. This means that you can use SSL today on your web site by piggybacking off our domain and certificate. However, we know that this doesn't really work for most apps as people will want to use their own domain. We fully intend on providing rich support for custom SSL certificates. I don't currently have a firm date to announce as to when this will be added, but you can be assured that it is a high priority.

[![](/images/2012/06/certificate.png)](/images/2012/06/certificate.png)

# Custom Domains
Custom domains are another feature that people have asked me about. Currently, we support custom domains when running your site in reserved mode. We are working on a solution to allow custom domains in shared mode as well.

[![](/images/2012/06/screen-shot-2012-06-08-at-3-45-27-pm.png)](/images/2012/06/screen-shot-2012-06-08-at-3-45-27-pm.png)

# .Net 4.5, IIS 8, and Windows Server 2012
We current don't support .Net 4.5 in Windows Azure Web Sites nor do we offer hosting on Windows Server 2012 or IIS8 at this time. This is something that will certainly be coming. We continue to invest in improving the .Net framework, IIS, and our server platform and you will see these improvements coming to Windows Azure. We currently don't have a firm date for this, but presumably it will be sometime after Windows Server 2012 and .Net 4.5 hit RTM.

# End.
Hopefully these additional points clear up some of the questions you had regarding Windows Azure Web Sites. I know that many of you want to use these features today, but as with any software project we can't always get every feature - no matter how important - in the first preview release. The engineering team is hard at work to make Windows Azure Web Sites a rich and powerful platform for web developers so you can expect to see these, and more improvements, coming.

