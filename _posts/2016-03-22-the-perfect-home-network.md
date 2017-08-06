---
date: 2016-03-22
layout: post
title: The Perfect Home Network
description: Recommendations for building a reliable wired and wireless network for your home.
---

Periodically, I have this same conversation with people about how to build a really great wired and wireless network in their house. I recommend a few products to them and the response is always the same - "those are pretty expensive, can't I just use XYZ from Best Buy?" My answer is that, yes, of course you can use any random home router from Best Buy for $80, but it isn't going to be great. The simple fact is that, like most things in life, if you want something that is great you are going to have to spend a little extra money.

So really, it is a question of what you want. On one hand you can buy any random wireless router for $80-$120 and you can get by. However, you are going to have problems. Your husband/wife/children are going to tell you "internet isn't working" periodically and you are going to have to go "unplug the router". Your wifi will be spotty in parts of your house and the speed may not be that great. But you saved a few bucks so that's the tradeoff.

On the other hand you can do it right. Depending on the size of your house you can build a fantastic network for between $300 and $500. With this investment you are going to get a network that has nearly 100% uptime. You aren't going to need to "reset the router" or deal with poor speed and spotty connectivity.

Below is my current recommendation for the "perfect" home network. Fair warning, I am not a network engineer. I am just an enthusiast who has tried a bunch of things and found something that works well for me.

## Router
You want a separate router. Don't even think about buying a router + access point + coffee maker type device. They are crap, don't do it. Additionally, you usually want your tangle of wires to be in a closet or off to some corner of the office - this is exactly where you DON'T WANT your access point.

My current recommendation for a router is the [Unifi Security Gateway](https://www.amazon.com/gp/product/B00LV8YZLK/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00LV8YZLK&linkCode=as2&tag=ntotten-20&linkId=3b9599b0b6cc392bea33d54b640d368e) (Model USG). This is an awesome and versatile router. It has all the features a networking junkie would want, but it is easy enough for most anyone (at least who is reading this) to setup. It integrates with the Unifi control software. It has some extras that you might use like the ability to fail over to a second internet service provider if you need extra reliability.

![](/images/2016/03/edgerouter.jpg)

## Switch
While you need a decent switch, this is one of the areas that you likely don't need to go crazy. I haven't used it, but I'm sure the [Ubiquiti Switches](https://www.amazon.com/gp/product/B01MU3WUX1/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=ntotten-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B01MU3WUX1&linkId=10447e88c74b0d5bb207072b8dbc7589) are fantastic. If you don't mind the price (or size) I would say go for it. However, for most people (and what I use) the Netgear ProSAFE line of switches will be enough. You can find them on [Amazon](http://www.amazon.com/NETGEAR-ProSAFE-Gigabit-Desktop-GS108-400NAS/dp/B00MPVR50A/) in 5, 8, 16, 24 port configurations.

> UPDATE: Since first writing this post I have upgraded to the Unifi Switches. They are fantastic and they provide a completely unified management experience with the Unifi Controller. I would recommend the [powered 8 port switch](https://www.amazon.com/gp/product/B01MU3WUX1/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=ntotten-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B01MU3WUX1&linkId=10447e88c74b0d5bb207072b8dbc7589)

![](/images/2016/03/prosafe_switch.jpg)

## Access Points
This part is important. If you want a good wireless network, don't go cheap on this part. First off some basics. There are different protocols for wireless access points. New computers and phones support [802.11ac](https://en.wikipedia.org/wiki/IEEE_802.11ac). You want this. AC wireless is faster than the old protocols like N, B, G, etc.

In addition to the protocol, there is another hugely important aspect of access points. This is the ability to support roaming. Roaming means that your device (phone, laptop) can stay connected while moving between different access points. This happens both when you physically move locations and also for various other reasons that I won't pretend to understand. I don't know really why this is, but cheap access points are terrible at roaming. If you try to setup two or more of basically any home access point things are going to not work well. This includes any Linksys, Netgear, and even Apple routers that I have ever tried.

In my experience, home access points can NEVER be successfully used in an configuration more than 1. This includes even Apple AirPorts which they claim support this feature - trust me I have tried, it doesn't work.

> NOTE: Wireless technology gets better over time. I'm sorry to break it to you but if you want the best, you will need to replace your access points every few years. :)

So which access point should you get? My current recommendations is the [Ubiquiti UniFi AP AC PRO](https://www.amazon.com/gp/product/B015PRO512/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=ntotten-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B015PRO512&linkId=40a90f39544f5054f1a31272058fcb3b) (Model UAP‑AC‑PRO). This thing is super fast, and incredibly reliable, and can be used successfully in multiple access point environments. One really nice thing also about these devices is that they are pretty low profile and they support PoE. This makes it easy to place them in the right spot in your house, not right next to the cable modem in the office. They come with the PoE adapters, but if you have a PoE router or switch you won't need the adapter.

> If you want to save some money, the [Ubiquiti Unifi AP AC Lite](https://www.amazon.com/gp/product/B015PR20GY/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=ntotten-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B015PR20GY&linkId=24667cd04c30a84ee9090d87d44cfdd3) is also a very good option. It might take a few more of these to cover your house and if you have tons of devices in one place it might suffer a bit, but this is still a very good access point for a lower price.

Additionally, you will need to hard-wire each access point, so if your house isn't wired for ethernet I would suggest running some cat6 cable to a central location of your house for optimal signal. Because they are very clean looking, I actually ran wires to mount these on the ceiling in my house. This made them perfectly centrally located and gave unobstructed paths to most of the house. They really aren't any more noticeable than a smoke detector.

For most houses, I would probably recommend getting two access points. If your house is really big or spread out you might need more. Each access point runs about $150 each so they aren't super cheap, but they are worth it.

![](/images/2016/03/unifi_ap.jpg)

## Control Software
The UniFi access points don't have onboard setup software like most of your home routers do. Instead they are managed centrally by custom UniFi software. This allows you to easily setup multiple access points at the same time and ensures they all work seamlessly together.

One thing of note, for some unfortunate reason the UniFi controller software requires Java on your computer. I hate this. Fortunately, there is a nice way around this. Ubiquiti actually makes a little device called the [Cloud Key](https://www.amazon.com/gp/product/B017T2QB22/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=ntotten-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B017T2QB22&linkId=f6bbc1426cb8590ef14f251d90b05470) that runs the control software. You simply plug this device into a PoE port on your router and it will allow you to manage your wireless network. I haven't actually used this, but I did order one and it should arrive in the next few days. I am excited to remove Java from my computer.

![](/images/2016/03/cloud_key.jpg)

## Power Backup
One other thing that might be worth adding depending on where you live is a simple UPC backup for your router, switch, and modem. This will keep everything humming along in the event of a power outage or blown fuse. Certainly not needed, but it will help you achieve 100% uptime.

## Multiple ISPs
I work from home most days so having the internet is critical for me to get my work done. As such, I have two internet service providers that I have configured for load balancing and failover. This means that if any one service goes down, my internet usage goes without interruption. I personally have Comcast Cable 105mbps and Centurylink Fiber 40mbps (both are the max available in my area). While both of these connections are reasonably reliable, they probably really only provide about 99% SLA at best (I monitor each of them). On their own this would leave me with a total of several days of downtime per year which is not acceptable. Having my dual ISP setup provides me with near 100% internet uptime.

## Conclusion
Hopefully this helps you with your home networking questions. As with most things in life, if you want something done well it is going to take a little more effort and a little more money, but I think you will find it to be worth it.
