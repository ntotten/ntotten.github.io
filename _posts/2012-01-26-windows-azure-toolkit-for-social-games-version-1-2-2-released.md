---
date: '2012-01-26'
layout: post
title: Windows Azure Toolkit for Social Games Version 1.2.2 Released
categories:
  - Windows Azure
redirect_from: /2012/01/windows-azure-toolkit-for-social-games-version-1-2-2-released/
---

Today, I released version 1.2.2 of the [Windows Azure Toolkit for Social Games](https://github.com/WindowsAzure-Toolkits/wa-toolkit-games). You can download the self-extracting package [here](https://github.com/downloads/WindowsAzure-Toolkits/wa-toolkit-games/WATGames-v1.2.2.exe). This version does not add any new features compared to the last (Version 1.2.0 - Beta), but this release is considered stable. We added a number of performance enhancements as well as optimized the setup of the Autofac dependency injection. The big news with this release is that we have moved the project to [Github](https://github.com/WindowsAzure-Toolkits/wa-toolkit-games).

For those who haven't downloaded or used the social gaming toolkit yet I would encourage you to check it out. There are a lot of common patterns and tons of reusable code in the toolkit that applies for many scenarios besides the gaming space. With more and more applications relying on real-time communication, sharing, and feedback the mechanisms that are used in games can be applied to many kinds of software.

# Github
Since we started this project Github has become an increasingly popular place to host the open source projects. Additionally, the [Windows Azure SDKs](https://github.com/WindowsAzure) are now open sourced and available on Github. We have seen a great deal of support from the community in this move and believe that Github is the right place to host this toolkit. Our hope is that with the amazing support Github offers for social coding such as forking, pull requests, etc. more users will be able to utilize and contribute to this project.

For those of you that have not used git or Github before I highly recommend watching the [Mastering Git video](http://tekpub.com/productions/git) on [Tekpub](http://tekpub.com). It costs $15, but it is worth it if you like learning though videos. If you like learning by doing and reading the instructions Github has a great set of help documentation on there [site](http://help.github.com/).

# Cloning a Repository
Rather than simply downloading the zip or self-extracting package of the Social Gaming Toolkit, you may want to clone the repository. Doing this will make it easier to pull in changes when we release future updates. It also allows you to make local changes to the toolkit and still update code that changes in future versions without loosing all your work.

In order to clone a repository first you must have git installed on your computer. You can download git [here](http://git-scm.com/). After you have git installed simply open the command prompt and clone the repository using the following command.

```bash
git clone git@github.com:WindowsAzure-Toolkits/wa-toolkit-games.git
```

# Forking a Project
One of the best features of Github is that you can easily [fork projects](http://help.github.com/fork-a-repo/) and make your own edits. If you use this toolkit and want to keep your own version simply create a fork and make your edits. Additionally, if you make a change that you think everyone would benefit from simply[ send a pull request](http://help.github.com/send-pull-requests/) and request that we add your change to our fork.

Forking a repository is easy. Simply click the fork button and select where you want the fork to live.

![](/images/2012/01/forks.png)

After you have forked the project, you can push changed to your own repository. If you have a change that you want to be added to the original repository all you have to do is send a pull request.

![](/images/2012/01/pullrequest.png)

If your pull request is accepted, your changes will be added to the original repository for everybody to use. Feel free to add features or fix any bugs you find and send us a pull request.

As always, feel free to leave comments, feedback, or suggestions. I would love to hear how you are using the toolkit and what you think about using Github.

