---
date: '2011-02-01'
layout: post
title: 'Facebook C# SDK V5.0.0 (BETA) Released'
categories:
  - Facebook
redirect_from: /2011/02/facebook-c-sdk-v5-0-0-beta-released/
---

Earlier today we released the beta version of our V5 branch of the [Facebook C# SDK](https://github.com/facebook-csharp-sdk/facebook-csharp-sdk). We have been working on this version for over a month and hope it is a significant improvement over the 4.X versions. I will be writing a series of posts over the next few days about this update. First, I wanted to talk a little about the general ideas behind this new release.

To start, I want to address some of the criticism we have faced in the past few days. There have been a number of developers that have either given us poor reviews or contacted me directly about their poor experiences using my software. First, I want to apologize to anyone who is having trouble using this SDK. I know that Facebook development can be frustrating especially when your chosen tool doesn’t work the way you expect. We are always looking for [feedback](http://twitter.com/ntotten) and trying to make the SDK [better](https://github.com/facebook-csharp-sdk/facebook-csharp-sdk).

As some people have observed, the quality of the Facebook C# SDK has somewhat deteriorated in the last few versions. Not deteriorated in the sense that it doesn’t work (I assure you it does), but in the sense that it was confusing to setup and use. I don’t want to pass the blame entirely off on this, but it is important to understand that Facebook has changed their authentication about 5 times since we started this project 8 months ago. This project is done on our free time, and it has been somewhat of a struggle to keep up with all their changes.

That being said, I want to assure developers that we are not going anywhere. We are continuing to support the most current authentication systems Facebook has in place. We will continue to be fixing bugs and adding features when necessary. We use this software every day in production applications that receive many many visitors and high loads of traffic hosted on Windows Azure. The Facebook C# SDK continues to be an integral part of the software we write professionally and will be maintained and updated.

Getting back to the initial issues of confusion and difficulty using this SDK. This is something that we have felt for a while now. We have actually been working on fixing these issues for some time. As was pointed out to me, we probably should have let more people know our plans and the weaknesses of the current version of the Facebook C# SDK. This new version that was posted today contains a complete rework of the authentication system. Unfortunately, there are many breaking changes with authentication, but we felt like to continue forward these changes were needed. Hopefully you will also agree.

Version 5 is the first version that was build entirely for Facebook’s newest OAuth system across all .Net platforms. Our goal was to keep authentication as consistent as possible regardless of whether you are developing a web application or a Windows Phone 7 application. It is my hope that our implementation is more intuitive to learn and much easier to setup.

I would encourage everyone to download the [Facebook C# SDK Version 5.0.0 (BETA)](https://github.com/facebook-csharp-sdk/facebook-csharp-sdk) and give it a try. We want to receive as much community feedback as possible before we release the next stable version of this SDK.

