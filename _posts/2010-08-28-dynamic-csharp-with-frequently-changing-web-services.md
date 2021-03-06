---
date: '2010-08-28'
layout: post
title: 'Dynamic C# with Frequently Changing Web Services'
categories:
  - Facebook
redirect_from: /2010/08/dynamic-csharp-with-frequently-changing-web-services/
---

The introduction of dynamic objects in C# 4.0 has been somewhat controversial in the .Net community. Some people argue that dynamic should be left to only dynamic languages such as Ruby. Personally, I love this new feature in C# and I believe there are some very good reasons to use dynamic in your code. Once such example is when building frameworks that interact with frequently changing web services.

The standard .Net way of interacting with a web service involves creating a web reference and having Visual Studio generate service and object classes using the web services WSDL file. This is a nice approach in many situations. It gives you an instant reference to the library and it is very easy to use. However, this approach is limited by a few issues. First, many new web services are moving to the simpler REST approach and thus there are WSDL files on these services. Second, web services can often change very quickly. This is where dynamic allows us to build flexible and reusable web service libraries.

The best example of the types of services mentioned above is Facebook’s GRAPH and REST APIs. These services are constantly changing and expanding. For .Net developers this caused a lot of problems. If you have ever built a Facebook application using .Net you have likely used the Facebook Developer Toolkit. This toolkit is a strongly typed wrapper for the Facebook APIs. If you look through this library the first thing you will notice is that it is very large. Facebook exposes hundreds of API methods with many different return types. For the Facebook Developer Toolkit to be useful for a .Net developer this library must implement every single method and type on the Facebook API. This is no simple task and makes maintaining the library and keeping it up to date extremely difficult and as a result has made the library unreliable. This is not a good situation when you are talking about a Framework used by thousands of developers. Fortunately, there is a better way.

A dynamic library allows for a small set of classes and methods to perform the same amount of work as very large static library. By not directly tying the framework to the methods of the web services, argument types, or return types the library is extremely powerful and flexible. For these reasons we have created the [Facebook C# SDK](https://github.com/facebook-csharp-sdk/facebook-csharp-sdk). This SDK provides a full framework for interacting with Facebook’s APIs. Because this library is dynamic new API methods added by Facebook are instantly compatible with the library without recompiling the library. Think about that for a moment. Is this not a better approach to a core framework?

As a Facebook Application developer, you can instantly take advantage of new API methods in your application without your underlying framework changing. In my opinion this makes for a much more stable stable application. You don’t have to worry about the newer version of the Facebook API breaking your old code. You simply have to write your application’s code and you are ready to go. When static libraries are still being upgraded, tested, and deployed you can already have your new feature implemented in your application.

While there are some negatives to this approach as well such as the loss of intellisense, I believe this is a small price to pay for the huge gain in flexibility. Additionally, an application developer is free to write static wrappers around the dynamic API to move data through their own application. This approach may be the right one for your application, but that is decided on a case by case basis not in the framework.

In conclusion, I believe that frameworks for interacting with frequently changing services built with dynamic types will create more agile, stable, and flexible applications. There is nothing worse than having to wait on your core framework to support a new feature your customer want or need. With properly built dynamic libraries you are no longer at the mercy of the framework developer and can add that new feature the day it is launched by your service provider.

