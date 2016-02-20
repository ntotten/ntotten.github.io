---
date: 2013-04-04 11:49:52
layout: post
title: Password Caching when Publishing with Git to Windows Azure Web Sites
categories:
- Windows Azure
---

If you have [setup git publishing](http://www.windowsazure.com/en-us/develop/net/common-tasks/publishing-with-git/) on a [Windows Azure Web Site](http://www.windowsazure.com/en-us/home/scenarios/web-sites/) you have noticed that our git endpoints use HTTPS rather than SSH. This means that you can't use an SSH key to authenticate and thus you will need to enter your password every time you publish to Windows Azure Web Sites via a git push. The good news is that Github has created a tool that allows credential caching of HTTPS git endpoints. This tool is compatible with both OS X and Windows and is very easy to setup.

You can see how to setup Github's password caching tool on their [help documentation here](https://help.github.com/articles/set-up-git#password-caching). As their documentation mentions, you do need to ensure you are running Git version 1.7.0 or above.

You can see that after the password helper is setup we are prompted for credentials on the first commit, but on subsequent commits our cached credentials are used automatically.

**First Push**

[![push1](/images/2013/04/push1.png)](/images/2013/04/push1.png)

**Second Push**

[![push2](/images/2013/04/push2.png)](/images/2013/04/push2.png)

Hopefully that helps save a little time when developing on Windows Azure.
