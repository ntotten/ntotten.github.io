---
date: 2011-11-18 21:38:54
layout: post
title: Windows Azure Toolkit for Social Games Version 1.1.1
categories:
- Windows Azure
---

I just released a minor update to the [Windows Azure Toolkit for Social Games](http://go.microsoft.com/fwlink/?LinkID=234210) Version 1.1. You can download this release [here](http://go.microsoft.com/fwlink/?LinkID=234062). This release updates the toolkit to use [Windows Azure Tools and SDK Version 1.6](http://blogs.msdn.com/b/windowsazure/archive/2011/11/14/updated-windows-azure-sdk-amp-windows-azure-hpc-scheduler-sdk.aspx). Additionally, this release includes a few minor, but significant, performance enhancements.

[Benjamin Guinebertière](http://blogs.msdn.com/b/benjguin/) discovered the performance issues and was kind enough to share the results. Benjamin noticed that the response time between when the server gets a request to the time when the response begins was about 4 seconds. You can see this below by measuring the difference between “ServerGotRequest” and “ServerBeginResponse”.

```text
Request Count:  1
Bytes Sent:     3 011	(headers:2938; body:73)
Bytes Received: 228	(headers:225; body:3)

ACTUAL PERFORMANCE
--------------
ClientConnected:    	16:33:24.848
ClientBeginRequest: 	16:33:45.247
ClientDoneRequest:   	16:33:45.247
Determine Gateway:  	0ms
DNS Lookup:           	0ms
TCP/IP Connect:      	1ms
HTTPS Handshake: 	0ms
ServerConnected:   	16:33:45.249
FiddlerBeginRequest:  	16:33:45.249
ServerGotRequest: 	16:33:45.249
ServerBeginResponse: 	16:33:49.973
ServerDoneResponse: 	16:33:49.973
ClientBeginResponse: 	16:33:49.973
ClientDoneResponse:   	16:33:49.973

Overall Elapsed:     	00:00:04.7260980

RESPONSE CODES
--------------
HTTP/200:		1

RESPONSE BYTES (by Content-Type)
--------------
       ~headers~:	225
application/json:	3
```

Benjamin setup and ran some tests to investigate the bottleneck. You can see how he added the traces below.

[![image](/images/2011/11/image_thumb.png)](/images/2011/11/image.png)

The results of this trace are show below. Notice that the action takes less than half a second to run. This meant that there was something outside of the action that was causing the problem.

[![image](/images/2011/11/image_thumb1.png)](/images/2011/11/image1.png)

After some investigation we discovered that we were calling the `EnsureExists()` method on every request in the game service. This was a mistake on our part and definitely not a best practice. You can see how the `EnsureExists()` method is called every time the repository is instantiated.

```cs
public GameRepository(
  IAzureBlobContainer gameContainer,
  IAzureBlobContainer gameQueueContainer,
  IAzureQueue skirmishGameMessageQueue,
  IAzureQueue leaveGameMessageQueue,
  IAzureBlobContainer userContainer,
  IAzureQueue inviteQueue)
{
  this.skirmishGameQueue = skirmishGameMessageQueue;
  this.leaveGameQueue = leaveGameMessageQueue;

  this.gameContainer = gameContainer;
  this.gameContainer.EnsureExist(true);

  this.gameQueueContainer = gameQueueContainer;
  this.gameQueueContainer.EnsureExist(true);

  this.userContainer = userContainer;
  this.userContainer.EnsureExist(true);

  this.inviteQueue = inviteQueue;
  this.inviteQueue.EnsureExist();
}
```

To fix this issue we created an `EnsureExists()` method on the GameRepository and moved all the queue and storage initialization methods there.

```cs
public void EnsureExist()
{
  this.gameContainer.EnsureExist(true);
  this.gameQueueContainer.EnsureExist(true);
  this.userContainer.EnsureExist(true);
  this.inviteQueue.EnsureExist();
  this.skirmishGameQueue.EnsureExist();
  this.leaveGameQueue.EnsureExist();
}
```

Next, we call this new method only once in our Global.asax Application_Startup. You can see that below.

```cs
protected void Application_Start()
{
  CloudStorageAccount.SetConfigurationSettingPublisher(
     (configName, configSetter) =>
  {
    string configuration = RoleEnvironment.IsAvailable ?
      RoleEnvironment.GetConfigurationSettingValue(configName) :
      ConfigurationManager.AppSettings[configName];

    configSetter(configuration);
  });

  AreaRegistration.RegisterAllAreas();

  RegisterGlobalFilters(GlobalFilters.Filters);
  RegisterRoutes(RouteTable.Routes);

  FederatedAuthentication.ServiceConfigurationCreated +=
    this.OnServiceConfigurationCreated;

  // initialize blob and queue resources
  new GameRepository().EnsureExist();
  new UserRepository().EnsureExist();
}
```

After these changes the time for a request went down to less than 2 seconds. You can see the request and response times below.

[![clip_image002[8]](/images/2011/11/clip_image0028_thumb.jpg)](/images/2011/11/clip_image0028.jpg)

This is a good improvement, but there are still several more changes like this we can do. I hope to release a new version in the next week or so that improves performance even more. Until then, give the updated version a try and let me know if you have any feedback.
