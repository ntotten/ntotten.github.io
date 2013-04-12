---
date: 2010-11-22 08:32:40
layout: post
title: The State of .Net Facebook Development
categories:
- Facebook
---

I started the Facebook C# SDK about 7 months ago because I was working on a small project and really didn’t like the options that were available for .Net developers to build Facebook applications. Since that time a lot has happened. We have worked hard to create a flexible and powerful SDK that will allow developers on all .Net platforms quickly build Facebook applications and connect existing applications with Facebook. Facebook has also changed a lot since then. The Graph API was just rolling out, OAuth 2.0 authentication was new, and the platform was largely undocumented.

I am extremely pleased with the progress that we have made with the Facebook C# SDK. We have been endorsed by [Microsoft](http://www.microsoft.com) and have received a lot of great feedback from the community. We have had thousands of downloads, fixed a lot of bugs, add added many new features.

I have also been very happy with the work Facebook has been doing to stabilize their platform, fixing bugs, and improving their documentation. If you are developing with Facebook the [Facebook Developer](http://developers.facebook.com/) site is definitely the place to start regardless of what platform you use. It is amazing what you can do with Facebook with some simple [Javascript](http://developers.facebook.com/docs/reference/javascript/).


# Road Map


We have a few exciting plans for the future with our Facebook C# SDK. The first is that we are combining our efforts with  [Prabir Shrestha](http://prabir.me) and merging our SDK with his excellent [FacebookSharp](https://github.com/prabirshrestha/FacebookSharp) project. By combining the projects and our programming effort we believe we can build an even better Facebook SDK. Prabir has build some excellent strongly typed extensions and helpers for interacting with Facebook that allows new developers to learn the platform faster and for small projects to finish with less effort.

On top of adding support for strongly typed objects and methods we have also switched our JSON serialization to the excellent [Json.Net](http://json.codeplex.com/) library. [James Newton-King](http://james.newtonking.com/) has created by far the best Json library for .Net and in his latest version he has added support for dynamic objects. This allowed us to remove our custom dynamic objects and serialization from our project and focus on the core of the SDK rather than the serialization issues.

Next, we are planning on releasing a new version this week that supports all the new features Facebook has introduced up to the [Nov. 2010 Rollup](http://developers.facebook.com/roadmap#migrations). We are always working to keep our SDK current. We are working on setting up a plan to keep in sync with Facebook so that we can support their platform changes within a very short period of time after they are announced. I should have more details on this in a few weeks.

Finally, we have prototyped the new encrypted authentication for iFrame applications. Facebook has announced that they are going to be requiring applications to use this new encrypted authentication system and we plan on supporting it as soon as they roll it out.


# Samples


The biggest big of feedback we have had from the community is that they want better samples. I am happy to announce that we have completed almost all of our samples and corresponding documentation for nearly every .Net Facebook scenario. We will be posting these samples on Codeplex with our release this week.


# Feedback


I would encourage anyone who is a .Net Facebook developer to leave feedback either on this blog or on our Codeplex site either as a comment on our [Road Map](http://csharpsdk.org) page or if you have a feature request or bug on our [Issues page](https://github.com/facebook-csharp-sdk/facebook-winclient-sdk/issues).
