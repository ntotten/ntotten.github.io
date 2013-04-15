---
date: 2013-04-14
layout: post
title: Windows Azure SDK for Node.js and CLI updated for Node.js 0.10.x
description: The Windows Azure SDK for Node.js and CLI has been updated for compatibility with Node.js 0.10.x. You can now use the latests and greatest version of Node with Windows Azure.
categories:
- NodeJS
---

Good news! The [Windows Azure Cross Platform CLI](https://github.com/WindowsAzure/azure-sdk-tools-xplat) and the [Windows Azure SDK for Node.js](https://github.com/WindowsAzure/azure-sdk-for-node/) has been updated to support Node.js version 0.10.3 and above. You can now update your installation of node and Windows Azure tools to the latest and greatest.

> **Note**: Make sure you are using 0.10.3 or greater. [Guang Yang](https://twitter.com/guayan/), who is a PM on the team that writes the SDK [pointed out](https://twitter.com/guayan/status/323549326687219712) that there is a bug in earlier versions that can cause issues in the SDK.

To upgrade Node.js head over to [nodejs.org](http://nodejs.org) and click the install button. In order to upgrade the Windows Azure CLI tools simply use npm as show below.

    npm install azure-cli -g

> **Note**: On OS X you will need to run this command as sudo to install globally.

To install the latest version of the Windows Azure SDK for Node.js in your project you can use npm as well.

    npm install azure

An alternative option is to use our one-click installers to install the SDK and tools together. You can find the [Node.js installer here](http://www.windowsazure.com/en-us/downloads/).
