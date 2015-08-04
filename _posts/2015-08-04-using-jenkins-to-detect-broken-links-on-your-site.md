---
date: 2015-08-04
layout: post
title: Using Jenkins to Detect Broken Links on Your Site
description: A simple Jenkins task that uses LinkChecker to scan your site for broken and malformed links.
---

One of the most basic aspects of building a great website and keeping your customers happy is ensuring that your links work. I know this seems obviously, but you would be surprised at how many products and documentation sites don't bother with this and leave their content littered with links to 404s.

At [Auth0](https://auth0.com) we setup a simple Jenkins task to scan our entire site for broken and malformed links ones a day using the very handle [LinkChecker](http://wummel.github.io/linkchecker/) tool by [Bastian Kleineidam](https://github.com/wummel).

The first thing you will need to do is setup linkchecker on your Jenkins machine. The easiest way to do this is to just install it globally as shown below. You will need SSH access to Jenkins for this step and you will need to install the python-dev package if it isn't already installed. (Note, this step assumes Jenkins is running on Linux - this will also work on Windows, but with slightly different installation).

```bash
sudo apt-get install python-dev
sudo pip install LinkChecker
```

To setup your build in Jenkins simply create a "New Item" and select "Freestyle Project". Name the project whatever you like.

Configure the project with a few basic settings. Under build triggers, check "Build Periodically" and set a cron schedule like `H 0 * * *`.

![Jenkins Build Triggers](/images/2015/08/jenkins-build-triggers.png)

Next set add a build step for "Execute Shell" and add the command to run linkchecker.

```
linkchecker https://example.com
```

See the [documentation on link checker](http://wummel.github.io/linkchecker/man1/linkchecker.1.html) for additional configuration on the CLI.

Set your desired notification preferences such as email or Slack when the build fails.

Save your configuration and run your project. The console output will show you if you have a broken link on your site like this.

![Jenkins Console Output](/images/2015/08/jenkins-broken-link-console.png)

Now you are set to provide a more usable site for your readers or customers.
