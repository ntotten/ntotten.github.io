---
date: '2012-07-10'
layout: post
title: 'UPDATED: Breaking Change with Facebook C# SDK Authentication on Windows Phone'
categories:
  - Facebook
redirect_from: /2012/07/breaking-change-with-facebook-authentication-on-windows-phone/
---

**UPDATE: **Good news! It looks like Facebook rolled out updates that fixed both of these issues. I was able to test a sample app and was not able to reproduce the issues. Facebook Authentication using the Facebook C# SDK for Windows Phone should be functioning as expected.

I would still recommend that you enable scripting in the WebBrowser you use to display the Facebook OAuth dialog. This will ensure that Facebook can deliver the best UI and experience to your users. You do this by setting **IsScriptingEnabled=true** on your WebBrowser. You can set this property either using XAML or in code as shown below.

	// Page.xaml
	<phone:WebBrowser x:Name="webBrowser1" IsScriptEnabled="True"></phone:WebBrowser>

	// Page.xaml.cs
	webBrowser1.IsScriptEnabled = true;

Finally, I published my [test app](https://github.com/ntotten/FacebookWindowsPhoneAuthSample) that shows how to authenticate with Facebook in a Windows Phone App on [Github](https://github.com/ntotten/FacebookWindowsPhoneAuthSample).

<del>Last week Facebook [deprecated the wap display modes](https://developers.facebook.com/blog/post/2012/07/05/platform-updates--operation-developer-love/) of their mobile dialogs including authentication and allow. This change may break Facebook dialogs on some Windows Phone apps. Below you will find a few important settings you must have configured correctly for your application to function as expected.</del>

<del>If you are using Facebook authentication on Windows Phone either through the Facebook C# SDK or otherwise there are two important changes you need to make to ensure your application keeps working.</del>

<del>First, you must enable scripts to run in the browser control that displays the Facebook dialog. You do this by setting **IsScriptingEnabled=true** on your WebBrowser. You can see examples of this below.</del>

<del>With XAML you would set this property as follows:</del>

<del>Second, you must not set your dialogs to **display=wap**. If you do this, you will receive an error from Facebook. I would recommend not setting a display type and just letting Facebook assign you the recommended type for the user agent of the device.</del>

<del>If you have an existing application that is already in the marketplace, make sure you check your code. If you have either of these settings configured incorrectly, your users may not be able to authenticate with Facebook from your application. If you are developing a new application just make sure to include these fixes in your code.</del>

<del>We will be updating the Facebook C# SDK for Windows Phone with additional helpers, documentation, and samples in the coming month and we will include these configuration options by default. For now, you will need to set them manually.</del>

