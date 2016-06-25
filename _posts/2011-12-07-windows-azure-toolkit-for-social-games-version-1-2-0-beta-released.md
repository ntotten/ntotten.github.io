---
date: '2011-12-07'
layout: post
title: Windows Azure Toolkit for Social Games Version 1.2.0 (beta) Released
categories:
  - Windows Azure
redirect_from: /2011/12/windows-azure-toolkit-for-social-games-version-1-2-0-beta-released/
---

Today, I released version 1.2.0 (beta) of the [Windows Azure Toolkit for Social Games](http://go.microsoft.com/fwlink/?LinkID=234210). You can download the self-extracting exe [here](http://go.microsoft.com/fwlink/?LinkID=234062) or get the source directly [here](http://go.microsoft.com/fwlink/?LinkID=234213). This release is primarily a maintenance release that includes bug fixes and enhancements to the code base. There aren’t any additional features in the release, but you should notice improved performance and stability. This is a ‘point’ release because there are a few breaking changes with the APIs that were made to clean up the overall code base.

This release is a ‘beta’ release because it did not go through our full QA process, but all the tests pass and it should be stable. I will be releasing a stable version of the 1.2.x branch shortly that has undergone the full QA tests to ensure the quality is up to par.

The biggest changes in this release is that we are now using dependency injection throughout the solution. The toolkit uses the great [Autofac](http://code.google.com/p/autofac/) library for injection, but you could easily swap out another library if you prefer.

Below you will see how we setup MVC3 and the WCF Web APIs to use Autofac for DI.

```cs
// Setup AutoFac
var builder = new ContainerBuilder();
DependancySetup(builder);
var container = builder.Build();

DependencyResolver.SetResolver(
new AutofacDependencyResolver(container));

// Setup WCF Web API Config
var config = new WebApiConfiguration();
config.EnableTestClient = true;
config.CreateInstance = ((t, i, h) =>
DependencyResolver.Current.GetService(t));
RouteTable.Routes.SetDefaultHttpConfiguration(config);
```

Additionally, we updated all the Nuget packages to their most recent versions. This includes the [WCF Web APIs](http://wcf.codeplex.com) to Preview 6 and jQuery to version 1.7.1. Finally, we fixed a few bugs. There was a memory leak that some people were seeing in the worker role that should be fixed.

[Download](http://go.microsoft.com/fwlink/?LinkID=234062) and deploy the toolkit to Windows Azure today. Let me know if you have any feedback, questions, or if you find any bugs.

