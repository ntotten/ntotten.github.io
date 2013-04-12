---
date: 2012-09-06 17:49:45
layout: post
title: 'Hacking Node.js on WebMatrix 2 '
categories:
- NodeJS
---

I know a lot of people have viewed [WebMatrix ](http://www.microsoft.com/web/webmatrix/)as kind of a toy or the less capable cousin of  Visual Studio. I will admit that was my initial impression of WebMatrix as well. However, with the[ release of WebMatrix 2 today](http://blogs.msdn.com/b/windowsazure/archive/2012/09/06/webmatrix-2-is-released-new-windows-azure-features.aspx) I decided to really give it another try and I was quite impressed with the experience especially for Node.js. WebMatrix definitely isn't for everybody, but if you are looking for a powerful yet simple IDE for Node.js development it is certainly worth a look.

In this post I will show some of the cool features in WebMatrix 2 for Node.js developers. The first thing you will notice when you fire up WebMatrix is that it comes with support for a variety of different languages. In fact, it even ships with three different templates for Node.js apps - Empty Site, Starter Site, and Express Site. The empty site is what you would expect, the express site is a vanilla express site, and the starter site is an express site with several additions like built in authentication using everyauth. I am going to create an express site to get started.

[![](/images/2012/09/webmatrix-templates.png)](/images/2012/09/webmatrix-templates.png)

The next thing you will notice is that the start page you see after creating a new site shows content reverent to the type of application you created. For Node.js this means it shows links to the Node documentation, the NPM registry, and express documentation.

[![](/images/2012/09/node-start.png)](/images/2012/09/node-start.png)

Moving to the files view you will see all the standard files you would expect in your express app. Opening a few of them up you will see that the files open in color-coded tabs. The colors of the tabs indicate the type of each file. JavaScript files are green; css, less, and other style files are red; and html, jade, and other view files are blue. Additionally, you will notice that the file viewer has excellent syntax highlighting for the server.js file that is open.


[![](/images/2012/09/files-serverjs.png)](/images/2012/09/files-serverjs.png)


In addition to the syntax highlighting for Javascript, CSS, and HTML files you would expect, WebMatrix also supports syntax highlighting for many other file types such as LESS, Jade, CoffeeScript, SaSS, and more. Below you can see how a Jade view looks in the WebMatrix editor.


[![](/images/2012/09/jade-syntaxhighlighting.png)](/images/2012/09/jade-syntaxhighlighting.png)


In addition to syntax highlighting, WebMatrix 2 also includes excellent Intellisense for Node.js applications. Below you can see the Intellisense that is provided for the app object that is part of express.


[![](/images/2012/09/intellisense0.png)](/images/2012/09/intellisense0.png)


Additionally, the Intellisense engine in WebMatrix is even smart enough to distingush between a server-side js file and a client-side js file. For example, in a server-side file you will not see suggestions for things like document, window, or other DOM JavaScript APIs.


[![](/images/2012/09/intellisense1.png)](/images/2012/09/intellisense1.png)


Along with all the great features in the text editor, WebMatrix 2 also makes it easy to run and deploy your Node.js site. You can easily run the site by clicking the run button in the ribbon. This will run your Node.js application locally using IISNode on IIS Express.


[![](/images/2012/09/run.png)](/images/2012/09/run.png)


Deploying you application with WebMatrix is also extremely easy. For example, you can publish your app to Windows Azure Web Sites by simply importing a publish profile and clicking publish. If you don't have a web host for Node.js you can click the link to [Get Started with Windows Azure and sign up to host up to 10 Node.js apps for free](http://www.windowsazure.com/en-us/pricing/free-trial/).


[![](/images/2012/09/webmatrix-publish.png)](/images/2012/09/webmatrix-publish.png)


As I mentioned at the beginning of this post, WebMatrix isn't for everyone, but I think it is a great tool for building Node.js apps especially if you are just getting started with Node.js development. Go ahead and give it a try today. You can[ install WebMatrix here](http://go.microsoft.com/?linkid=9809776) and get started in just a few minutes.
