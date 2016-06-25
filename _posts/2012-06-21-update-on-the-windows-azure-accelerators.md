---
date: '2012-06-21'
layout: post
title: Update on the Windows Azure Accelerators
categories:
  - Windows Azure
redirect_from: /2012/06/update-on-the-windows-azure-accelerators/
---

# TL;DR
The Windows Azure Accelerators for [Umbraco](https://github.com/microsoft-dpe/wa-accelerator-umbraco) and [Web Roles](https://github.com/microsoft-dpe/wa-accelerator-webroles) have had a succesfull run over the past 18 months. They have enabled developers to build a variety of applications on Windows Azure quickly and easiliy. With the release of [Windows Azure Web Sites](https://www.windowsazure.com/en-us/home/scenarios/web-sites/), we have marked these accelerators as deprecated and have no plans to continue to add features or improve them. If you use these projects, they will continue to work and will remain open sourced on Github. We will accept pull requests and will fix critical bugs as time allows. If you are considering using these accelerators on future projects, we recommend [Windows Azure Web Sites](https://www.windowsazure.com/en-us/home/scenarios/web-sites/) instead.

# What is a Windows Azure Accelerator?
A Windows Azure Accelerator is a sample or proof-of-concept that we build to help developers enable certain scenarios on the Windows Azure Platform. These scenarios are generally specific and temporary. For example, the Web Role Accelerator for Web roles was designed to allow developers to rapidly deploy web sites to multiple Web Role instances using Web Deploy. When we built this accelerator more than a year ago, this feature was not available on the Windows Azure Platform.

An accelerator should not be confused with a feature of the platform. The Windows Azure Accelerators for Web Roles and Umbraco were built as example implementations for developers to use, modify, or learn from. These projects are always open source and  updated in public on either CodePlex or Github.

# Why Build Accelerators?
The reason we build accelerators is to 'accelerate' a developer's ability to deliver a specific scenario on Windows Azure. Generally speaking you can think of an accelerator as a tool to fill a gap in the Windows Azure platform. In every case we have built an accelerator after listening to feedback from our customers.

# Success
There are two measures we use to determine if an accelerator is successful. First, does it solve a problem that people need solved. We measure this by number of downloads and user adoption. The second measure of success actually results in the deprecating of the accelerator. If we have successfully found and solved a problem with the Windows Azure platform, this means that this feature should likely be part of Windows Azure. When that feature is added, the accelerator is deprecated.

We have considered the Umbraco and Web Role accelerators to be a great successes. Both projects were downloaded thousands of times and helped hundreds of customers implement their solutions on Windows Azure. Some customers used the accelerators as is while others modified them to fit their specific needs - either way the accelerators helped. Customers have deployed large production Umbraco sites on Windows Azure using the Umbraco accelerator and others have used the Web Role accelerator to host large numbers of smaller sites on a single Web Role and save hundreds of dollars per month on compute costs.

Under our second criteria we have also achieved success. With the announcement of Windows Azure Web Sites the problems that were solved by both the Umbraco and Web Role accelerators have been solved by the core platform. In the case of each accelerator, the primary issue was actually the same - running stateful applications on stateless Web Roles. The Web Role accelerator also enabled rapid deployment of web sites to Windows Azure. Windows Azure Web Sites provides a highly scalable, stateful hosting environment that supports rapid deployment. As such, Windows Azure Web Sites is a favorable replacement for both accelerators. Developers can host CMS systems like Umbraco and Wordpress on Windows Azure Web Sites and they can deploy these sites in just a few seconds using Web Deploy, Git, or FTP.

# Deprecating the Accelerators
As I mentioned above, if our accelerators are successful the problem they solved will be implemented as part of the core features of Windows Azure and the accelerator will be deprecated. With the release of Windows Azure Web Sites we want to be very clear that we are recommending developers use Web Sites in favor of the accelerators and as such are marking the accelerators as deprecated. Windows Azure Web Sites solves the same problems (and more) that both the Umbraco and Web Sites were designed to solve, but Web Sites is a core part of the Windows Azure Platform that is built, maintained, and supported by Windows Azure engineering.

Now, we do understand that Windows Azure Web Sites is still in preview so it is not yet a viable option for your mission critical production sites. This is a temporary, but important problem. For those that need to deploy a stateful site immediately to Windows Azure feel free to use the accelerators. These projects still work and are available for download. The reason that we marked these projects as deprecated now instead of waiting until Windows Azure Web Sites is released was help developers better plan their future projects.  If you need something right away, you can still use the accelerator. If you are planning a project that is a ways out, you may want to use Web Sites.

# Now What?
If you are a developer who has built a solution on one of our accelerators the idea that we are deprecating it may be troubling. We understand that you have invested time and money into building your system and don't want to have to rebuilt it just because Windows Azure offers new features. The good news is that if your system works, it isn't going to stop working. Web Roles aren't going away and are still a preferred platform for many developers.

Several individuals have told me that they plan on continuing to use one of the accelerators  because they make sense for their particular solution. If you want to continue to use either accelerator that is completely okay. Us deprecating the project simply means that we have no plans to add features or patching bugs. This doesn't mean that the projects are broken and this doesn't mean that you can't continue to update the projects yourself. Both accelerators are hosted on Github and I will be happy to accept pull requests.

For those people that use the accelerators, but would like to migrate to Windows Azure Web Sites the good news is that this should be fairly easy. In the coming weeks I will write posts on how to migrate from the Windows Azure Accelerator for Umbraco to Windows Azure Web Sites and how to migrate from the Windows Azure Accelerator for Web Roles to Windows Azure Web Sites.

# Conclusion
I hope that this post has cleared up some of the confusion around the Windows Azure Accelerators and their relationship to Windows Azure Web Sites. I am incredibly excited about the future of Windows Azure and Windows Azure Web Sites and look forward to seeing what you develop on our platform.  If you have any questions or feedback please feel free to post a comment or send me an email.

