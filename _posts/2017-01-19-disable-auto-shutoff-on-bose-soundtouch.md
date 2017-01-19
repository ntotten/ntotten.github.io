---
date: 2017-01-19
layout: post
title: Disable Auto-shutoff on the Bose Soundtouch
description: How to disable auto-shutoff on the bose soundtouch when using AUX input.
---

This is a pretty short post, but I wanted to document it mostly for my own purposes. I have a Bose SoundTouch 20 ii which has an AUX input. I have my Amazon Echo Dot plugged into it, but the SoundTouch has a default to auto-shutoff after 20 minutes which obviously isn't great for a voice activated device.

Bose recently released an update to the SoundTouch models with bluetooth to disable this feature, but unfortunately doesn't provide a way to disable auto-shutoff on AUX. Fortunately, the the device can be [controlled via telnet](http://flarn2006.blogspot.co.uk/2014/09/hacking-bose-soundtouch-and-its-linux.html) and you can change this setting.

Disabling auto-shutoff can by connecting via telnet to your device and running a single command.


```
> telnet 192.168.X.X 17000
> sys timeout inactivity disable
> exit
```
