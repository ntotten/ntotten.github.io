---
date: 2013-04-05 11:41:54
layout: post
title: Scaling Out Socket.IO with Windows Azure Service Bus
description: Build large scale real-time applications with Socket.IO and Windows Azure Services Bus using the Service Bus Store.
categories:
- NodeJS
- Windows Azure
---

[Socket.IO](http://socket.io) is a handy tool that makes it easy to build real-time communication into your application. If you haven't used Socket.IO before, I recommend reading the [tutorial over on WindowsAzure.com](http://www.windowsazure.com/en-us/develop/nodejs/tutorials/app-using-socketio/). This post shows how you can scale out Socket.IO to multiple servers in order to handle many simultaneous connections by using Windows Azure Service Bus as a backing store.

The get started, you will need to create a service bus namespace and subscription. You can do this in the portal by clicking the "New" button and following the steps shown below.

[![createtopic](/images/2013/04/createtopic.jpg)](/images/2013/04/createtopic.jpg)

After your topic is created, install the socket.io-servicebus module by running npm as shown below.

  npm install https://github.com/ntotten/socket.io-servicebus/archive/master.tar.gz

> **Note**: I am installing [my fork](https://github.com/ntotten/socket.io-servicebus) of the [socket.io-servicebus](https://github.com/WindowsAzure/socket.io-servicebus) module. The module is also available on npm, but there are updates to this fork for automatically managing subscriptions. These updates will be in the main version shortly. You can see the pull request for my updates [here](https://github.com/WindowsAzure/socket.io-servicebus/pull/47).

With the module installed, open up your application. For this demo, I am using an express web app, but you can use whatever frameworks you would like. Configure the service bus store for Socket.IO as shown below.

```js
// Setup the Service Bus store for Socket.IO
var sbstore = require('socket.io-servicebus');
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 30);
  io.set('store', new sbstore({
    topic: nconf.get("SERVICE_BUS_TOPIC"),
    connectionString: nconf.get("CUSTOMCONNSTR_SERVICEBUS"),
    logger: io.get('logger')
  }));
});
```

After you have configured the service bus store you are now ready to scale your application to use as many servers as required. You can download the [full source](https://github.com/WindowsAzure-Samples/node-messageme-servicebus) of my sample application on [Github](https://github.com/WindowsAzure-Samples/node-messageme-servicebus).
