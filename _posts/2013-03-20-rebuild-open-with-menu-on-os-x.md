---
date: 2013-03-20 20:46:38
layout: post
title: Rebuild "Open With" Menu on OS X
categories:
- Notes
---

I often find the "Open With" menu on OS X gets cluttered with old apps and duplicates of existing apps like Sublime Text. This command will rebuild the menu items.

	/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -kill -r -domain local -domain user;killall Finder;

