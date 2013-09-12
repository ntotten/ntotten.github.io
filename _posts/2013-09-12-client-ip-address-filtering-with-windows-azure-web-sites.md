---
date: 2013-09-12
layout: post
title: Client IP Address Filtering with Windows Azure Web Sites
description: Restrict access to a site in Windows Azure Web Sites to a specific IP address or network.
categories:
- Windows Azure
---

I was recently working on a prototype for an internal project that I wanted to publish to Windows Azure Web Sites. Because the project is for Microsoft use only I needed to either setup authentication or filter by IP address. Authentication wasn't really what I wanted because I wanted the prototype to be easily shared within the company. Security wasn't super critical, but it needed to be good enough. My initial thought was to just use the ```<ipSecurity>``` configuration in web.config. However, I realized that this module isn't actually installed on Windows Azure Web Sites and that even if it was, it wouldn't work for my needs because sites in WAWS sit behind ARR servers.

The solution I ended up using was to create a simple MVC Action Filter that blocks requests from outside of a specific network range. Unfortunately, some of the utilities for calculating subnets are actually not part of .NET. However, I was able to [find a nice set of extensions](http://blogs.msdn.com/b/knom/archive/2008/12/31/ip-address-calculations-with-c-subnetmasks-networks.aspx) that gave me what I needed. Combining these extensions with a simple action filter was able to perform my required task.

You can find the full source to this action filter in [this Gist](https://gist.github.com/ntotten/6539951). It contains both the IPFilterAttribute class as well as the IPAddressExtension.cs file.

Using the filter is easy. Simply add the filter to your controller and specific the IP address or network you want to allow.

	[IPFilter("123.45.0.0/16")]
	public class HomeController : Controller
	{
	    public ActionResult Index()
	    {
	        return View();
	    }
	}

Optionally, you can choose to block localhost access from your site. Localhost is allowed by default.

    [IPFilter("123.45.0.0/16", AllowLocalhost = false)]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }

 There are a couple things worth noting as to how this filter actually works. First, since Windows Azure Web Sites sits behind a ARR server the IP address of the end user is not the IP address the request comes from. The end user's IP address is actually stored in the header "X-Forwarded-For". You can see how we get the ip address below.

    protected override bool AuthorizeCore(HttpContextBase httpContext)
    {
        var clientIP = httpContext.Request.Headers["X-Forwarded-For"];
        var isAuthorized = IsAuthorizedIPAddress(this.AuthorizedIPAddress, clientIP);

        return isAuthorized || 
              (this.AllowLocalhost && (httpContext.Request.Url.Host == "localhost"));
    }

Second, this is just a sample I wrote quickly. If you are using this for something that requires real security or solid error handling, please look over the code first.