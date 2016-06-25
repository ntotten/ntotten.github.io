---
date: '2011-07-28'
layout: post
title: Architecture of Tankster– Scale (Part 2)
categories:
  - ASP.NET
  - Windows Azure
redirect_from: /2011/07/architecture-of-tankster-scale-part-2/
---

This is the second post about the architecture of the [Tankster ](http://www.tankster.net)game that is included in the [Windows Azure Toolkit for Social Games](http://watgames.codeplex.com). My [last post](http://ntotten.com/2011/07/architecture-of-tankster-introduction-to-game-play-part-1/) mentioned that we have a goal to make the solution scale up to several hundred thousand concurrent user, but we have not yet achieved that goal. In this post I will explain why our current architecture will not scale that high and how the problem can be solved.

From my last post I explained how we use Windows Azure storage extensively. Specifically, queues to pass around messages and blobs to store user and game state. Below you will see the diagram of our storage use from the join game use case. I will refer back to this diagram and points A and B throughout this article.

[![image](/images/2011/07/image_thumb11.png)](/images/2011/07/image11.png)

So we know that we can scale out web roles and worker roles as much as we need to support demand, but the one thing we can control is Windows Azure storage. This is where our bottlenecks come in. Windows Azure storage is extremely scalable by default, but you can push it to the max and reach its limits. There is a great blog post about this topic on the Windows Azure Storage blog [here](http://blogs.msdn.com/b/windowsazurestorage/archive/2010/05/10/windows-azure-storage-abstractions-and-their-scalability-targets.aspx) that goes into detail about this topic. I will sum up the relevant parts below.

The top level of scale for Windows Azure storage is at the account level. A single Windows Azure storage account has the following scalability targets:

* Storage Capacity: Up to 100 TBs
* Transactions: Up to 5,000 entities/messages/blobs per second
* Bandwidth: Up to 3 gigabits per second

Additionally, a single Windows Azure queue can handle up to 500 messages per second and a single blob can handle up to 60 megabytes per second.

With the current architecture of the game we use only a single storage account and use only a single queue per message type. This means that our current architecture is limited by these numbers. So the absolute maximum number of transactions we can handle on storage is 5,000 per second. Each user of a game is likely causing about 2-3 transactions per second. This means that our game can really only handle about 1,700 concurrent users. Obviously, this is not that impressive of a number.

So how do we fix this? The first step will be to use multiple Windows Azure storage accounts. This is a pretty easy fix. We just need to provide configuration options for additional accounts and create a simple algorithm that defines which queues, blobs, and tables are stored on each account. This alone will greatly increase our scalability targets.

The next bottleneck after we split out storage accounts will be at the Windows Azure queues (A in the diagram). Currently, each message type, i.e. join game, uses only a single queue. This means that we are limited by 500 requests per second on that queue. To handle this we will need to split out these queues into n number of queues and distribute the messages across them. This process can be handled in several ways. First, we could just define a configuration setting that tells the system how many queues to distribute each message type across. This way a developer could just set the number based on some formula that accounts for the number of users their game has. The second approach is a bit more difficult. This would be to actually expand and contract the number of queues based on the load. This is the approach we would like to take and hopefully add to the toolkit and game.

The next bottleneck in the game has to do with the leaderboard. We are using SQL Azure to store leaderboard data. Using SQL Azure makes it very easy to do calculations, sort, and rank this data, but it limits the scale. We could solve this problem in several ways. First, we could move this data to table storage, but we would lose some of the flexibility. The other option would be to shard our database. Currently, there is not built in support for this in SQL Azure, but the feature has been [announced](http://social.technet.microsoft.com/wiki/contents/articles/2281.aspx). For now, you would have to manually federate this data across several SQL Azure databases.

As I mentioned, this is something that we are looking into and hope to add to the toolkit and game soon. For now the game should easily handle 1000+ concurrent users without any issues. One last thing to point out, most of the scale targets for storage accounts are not strictly enforced so you may get more scale depending on your exact use. For more detail I highly recommend reading the [blob post](http://blogs.msdn.com/b/windowsazurestorage/archive/2010/05/10/windows-azure-storage-abstractions-and-their-scalability-targets.aspx) about storage account scalability.

