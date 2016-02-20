---
date: 2012-02-07 12:14:01
layout: post
title: Facebook C# SDK Road Map
categories:
- Facebook
---

**_Disclaimer - The Facebook C# SDK is not a Microsoft project. The Facebook C# SDK as well as this post are the work and opinions of myself and not those of Microsoft._**

It has been a while since I have written a post on the [Facebook C# SDK](http://github.com/facebook-csharp-sdk). For those that follow my blog and the sdk you probably know that since I have moved to Microsoft I have spent less time on the Facebook C# SDK and more time on Windows Azure. Fortunately, the Facebook C# SDK was left in the very capable hands of Prabir Shrestha and it has continued to thrive. While I haven't been spending much time with the SDK, it is still a project I care about and as such I wanted to share our plans to keep the project moving forward.

**Moving to Github**

[![](/images/2012/02/octocat.png?w=150)](http://github.com/facebook-csharp-sdk)

In the past few days we have been in the process of moving the Facebook C# SDK project to Github. Since the project was founded nearly two years ago we have hosted the SDK on Codeplex. Codeplex has been a great place for our project and on Codeplex we have recieved nearly 120,000 downloads. However, since the project was founded we have seen more and more projects and developers migrated to Github. Github offers a great set of collaboration tools that make managing a project like the Facebook C# SDK a breeze. We believe Github will enable the community to more easily contribute back code to the SDK through forks and pull requests. As such, the new home for the Facebook C# SDK will be at [http://github.com/facebook-csharp-sdk](http://github.com/facebook-csharp-sdk).

# Platforms and Frameworks
When the Facebook C# SDK was started we supported only .Net 4.0 Full Profile. This was primarily because the SDK relied heavily on dynamic objects and the reliance on objects found in ASP.NET libraries. Over time the SDK has evolved to support .Net 3.5, .Net 3.5 Client Profile, .Net 4.0 Client Profile, Silverlight 3, Silverlight 4, Silverlight 5, MVC 2, MVC 3, Windows Phone 7.0, Windows Phone 7.1, and most recently WinRT (Windows 8 Metro Style Apps). This is obviously a huge amount of code to write and maintain. If you have seen the code of the SDK you will notice there are lots of [preprocessor directives](http://msdn.microsoft.com/en-us/library/ed8yd1ha.aspx) that help us work around the differences in the various platforms. You can see an example of this in the code below.

```cs
  request.ContentType = contentType;
  if (!string.IsNullOrEmpty(etag))
    request.Headers[HttpRequestHeader.IfNoneMatch] =
       string.Concat('"', etag, '"');
#if !(SILVERLIGHT || WINRT)
  request.AutomaticDecompression =
    DecompressionMethods.GZip | DecompressionMethods.Deflate;
#endif
#if WINRT
  request.Headers[HttpRequestHeader.AcceptEncoding] = "gzip,deflate";
#endif
  if (input != null)
    request.TrySetContentLength(input.Length);
#if (!(SILVERLIGHT || WINRT) || WINDOWS_PHONE)
  request.UserAgent = "Facebook C# SDK";
#endif
  return new HttpHelper(request);
```

As you can see this code can be difficult to maintain, test, and debug. The good news is that through Prabir's excellent work of abstracting the most difficult portions of this code we have been able to keep these proprocessor directives to a minimum. I will go into more details about this later in the article. What this means though is that we will do our best to keep supporting all of the current and future .Net and Windows platforms.

However, the reason I wanted to discuss this is to note that with this support there is generally a trade-off. At times we must decided whether to implement the new features of a particular platforms or maintain compatibility. So as I said, we will try to maintain compatibility with the various platforms, but moving forward we will be focusing our efforts on a few areas.

We want to make sure developers have a great experience with the Facebook C# SDK when developing web apps, Windows Phone Apps, and Windows 8 Metro Style Apps. This means that we will focus our energies on ASP.NET, Windows Phone, and WinRT support. We will be building out high quality samples and writing better documentation primarily around these three platforms and frameworks. While we aren't explicitly not supporting the other platforms, our efforts will be minimal. We definitely welcome community contributions so if you have a great Silverlight sample please form the repo and contribute it back.

# License
We have also decided to redistribute the Facebook C# SDK under the Apache 2.0 license. This license is more popular than the Ms-Pl license and is consistent with the license for  Facebook's official SDKs and samples. While I am no lawyer, my understanding is that the Apache 2.0 license is the same in nearly every respect to Ms-Pl so this shouldn't require any change on your part. You are still free to redistribute the SDK, use it in commercial projects, etc.

# Facebook C# SDK and Web Apps
For those that have used the Facebook C# SDK in the past to develop web apps you have probably used the Facebook.Web and Facebook.Web.Mvc libraries. These libraries provide helper methods that were designed to make it easier to perform tasks such as authentication with Facebook in ASP.NET WebForms and MVC apps. Unfortunately, with the many changes to the Facebook platform, the new versions of MVC, and the new features added to the core Facebook C# SDK these libraries evolved in a way that we believe made them no so easy to use.

Instead of trying to patch and fix these libraries once again, we decided that it was time to take a step back and reevaluate how we handle web apps with the Facebook C# SDK. As such, we have decided that going forward we will be removing the Facebook.Web and Facebook.Web.Mvc libraries from the SDK. This change will happen in the 6.0 release and will not effect developers still using the 5.0 release. I will discuss our version plans later in this post in more detail.

So with the removal of the Facebook.Web and Facebook.Web.Mvc libraries you are probably wondering how will you develop Facebook Apps using ASP.NET WebForms and MVC. First, we are moving some of the more critical parts of the Facebook.Web and Facebook.Web.Mvc libraries into the core Facebook.dll. Second, we are going to be providing much higher quality samples for ASP.NET WebForms and MVC developers. Last, we intend to ship various NuGet packages that contain smaller parts of the Facebook  web libraries.

We believe the approach of having only a single Facebook.dll library will greatly simplify the  process of getting started developing your app. It will reduce the API surface and thus reduce the complexity. Additionally, we have found that developers often tweak the code in the web libraries to fit their application. For this reason we believe that shipping the web code as samples, simple NuGet packages, and general guidance will better allow developers to integrate and understand Facebook development in ASP.NET.

Now, we do understand this change may be difficult for some people. Many apps have already been built with the Facebook C# SDK and breaking changes can be tough. We have always tried to avoid breaking changes and generally have done so except in the case where Facebook introduced breaking changes. To this end we will keep updating Version 5.X of the Facebook C# SDK. We won't be adding new feature to version 5, but we will ensure that it keeps working for you in the foreseeable future. You can find the code for version 5.x on github in a branch called 'v5'. You can see that branch here: [https://github.com/facebook-csharp-sdk/facebook-csharp-sdk/tree/v5](https://github.com/facebook-csharp-sdk/facebook-csharp-sdk/tree/v5).

# Version 6.0
As mentioned earlier, we are starting work on version 6.0 of the Facebook C# SDK. Today, Prabir released Version 6.0 Alpha. This is a preview of where we are heading with the SDK. The overall goal of Version 6.0 is simplicity. We are reducing the API surface, improving the documentation, and building out better samples to make it even easier to build a Facebook app for .Net or any flavor of Windows.

Prabir has written an [excellent post](http://blog.prabir.me/post/Facebook-CSharp-SDK-Glimpse-into-the-Future.aspx) that goes into more detail about the technical changes to version 6.0, but below are a few highlights.

* You can now use anonymous objects as parameters. Before you had to either create a Dictionary or ExpandoObject.
* GZip/Deflate has been enabled for desktop client profiles.
* We have introduced FacebookMediaStream to replace FacebookMediaObject. You can now work with this object like a normal stream rather than converting back and forth to a byte array.
* You can now optimize your request to the graph with ETags.

Version 6.0 is an exciting step forward for Facebook developers on the Microsoft stack. We hope version 6.0 will greatly simplify your experience and help you create great Facebook apps. As I mentioned, the currently release is only an alpha release so we look forward to your feedback.

# Documentation
Documentation has always been one of the biggest complaints for our developers. Admittedly, we have not always been able to keep our documents up to date to the SDK. We are hoping to correct this problem moving forward. With Prabir taking over in the last months as the lead developer on the Facebook C# SDK this has left me free to focus on other areas. Moving forward my contributions to the Facebook C# SDK will be primarily on writing documentation, tutorials, and building samples. My hope is that we can get even more developers using the Facebook C# SDK to build great Facebook apps.

When moving to Github we evaluated the various options for documentation. We thought about using the Github wiki, but in the end it felt a bit too constrained. Additionally, we are starting to split the code of the Facebook C# SDK into a variety of Github repositories. However, we didn't want to also split up the documentation. We thought there should be a high quality, customizable, and centralized space for documentation. We decided that Github pages would work nicely for our needs. Many other projects use Github pages to build out rich and high quality documentation. You can see our early efforts at [http://docs.csharpsdk.org](http://docs.csharpsdk.org). This is just an early start, but in the coming weeks expect to see this resource grow to provide lots of great content.

[![](/images/2012/02/docspage.png)](http://docs.csharpsdk.org)

# Issues and Discussions
One thing you will notice on Github is that there is no discussions area. The old Codeplex project had a discussions area where many people asked questions and provided feedback. While we know that many of you liked that model we always have tried to discourage using Codeplex for discussions because of the problems associated with threaded conversations. First, information was quickly outdated. Often times you could find a discussion in a search that would seem like it solved your problem, but the answer would be outdated. Additionally, there is no way of noting which answer is the correct answer. You had to read the entire conversation to figure out the solution (if there was even one). For these reasons we have all come to know and love StackOverflow.

Recently, Facebook showed some love for StackOverflow and moved their developer forums to http://facebook.stackoverflow.com. We have decided to do the same. Going forward we will not offer a discussion area outside of Stackoverflow. We believe this will help keep questions and answered organized, relevant, and make it easier for developers to find the answers they are looking for. We will continue to monitor and answer questions on StackOverflow.

The one issue StackOverflow does not solve is bugs. The old Codeplex discussions were often the first place a bug was reported. This made it really difficult for us to keep track of these bugs. Going forward, we are going to be using Github issues for all bugs. If you find a bug or even think you have a bug file an issue. Users can then comment on issues, track issues, and we can tag issues, and mark them as fixed as appropriate. This will make our jobs easier and help ensure that your bug/issue gets fixed as soon as possible.

Also, issues are not just for bugs. Please add feature requests, documentation request/issues, sample requests/issues to the project issues as well. Don't worry that your issues maybe isn't really a bug or that your request might seem too specific. We love the feedback and want your help to improve the SDK.

# Utility Libraries
As we built out the Facebook C# SDK we also created several utility libraries as well. The first of these libraries is [SimpleJson ](https://github.com/facebook-csharp-sdk/simple-json)which is a very robust yet very simple JSON serializer. Next is HttpHelper which simplifies making HTTP requests from various .Net/Windows platforms. [ReflectionUtils ](https://github.com/facebook-csharp-sdk/ReflectionUtils)which is a simple set of tools for performing reflection. Finally, there is [CombinationStream ](https://github.com/facebook-csharp-sdk/CombinationStream)which allows you to represent multiple streams as a single stream. We have moved these projects to repositories under the facebook-csharp-sdk organization on Github. Feel free to use these in your libraries or applications as well.

# Community Contributions
Please fork our repositories. If you aren't familiar with Github there are some awesome [documents ](http://help.github.com/)on their website. Additionally, Tekpub has a great video on getting started with Git [here](http://tekpub.com/productions/git). The video costs $15, but if you like learning through videos it is definitely worth it.

If you want to submit a patch, please send us a pull request. We would love help with bug fixes, documentation, samples, or anything else. With github these sort of contributions are really easy to manage so please feel free to jump in and help out.

# Wrapping Up
This post ended up being a lot longer than I had planned, but I hope you are excited about where the Facebook C# SDK is heading. There were a lot of big announcements today and we have a few more exciting announcements in the next few weeks. As always, please feel free to leave feedback. We would love to hear from you.
