---
date: '2013-03-20'
layout: post
title: Rebuild "Open With" Menu on OS X
categories:
  - Notes
reirect_from: /2013/03/rebuild-open-with-menu-on-os-x/
---

I often find the "Open With" menu on OS X gets cluttered with old apps and duplicates of existing apps like Sublime Text. This command will rebuild the menu items.

	/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -kill -r -domain local -domain user;killall Finder;


