---
date: 2011-04-29 16:41:52
layout: post
title: Caching Data in ASP.NET Applications
categories:
- ASP.NET
- Windows Azure
---

With the [release](http://blogs.msdn.com/b/sudhir/archive/2011/04/29/windows-azure-appfabric-caching-service-released.aspx) of [Windows Azure AppFabric Caching](http://www.microsoft.com/windowsazure/appfabric/overview/) yesterday I thought it would be a good time to talk about various caching scenarios in ASP.NET applications. There are a lot of different places where you want to cache data in your web application to increase performance or decrease demand on your data stores. This post will talk about how to handle various ways of caching data in your ASP.NET application and when each method should be used.


# Scenario 1: Small Lists of Data That Never Change


The first scenario we will discuss how to handle small amounts of data that never changes in your application, but you want to be readily available at all times. An example of this type of data would be a list of U.S. States or Countries. Note, by ‘never’ changes I don’t necessarily mean never in the universal sense, but ‘never’ in that it would be so infrequent that it wouldn’t be a big deal if you had to redeploy your app to make the change.

Because memory is cheap and performance is king, the best thing to do for this type of data is to just keep it in memory all the time. For this you can use a static list for lists of data. Pretty straight forward.

	public static List cachedList = new List() {
		new MyCachedThing() { Name = "Something" },
		new MyCachedThing() { Name = "Another"}
	};


# Scenario 2: Small Lists of Data That Rarely Change


The second scenario will show you how to handle lists of data that rarely change and when they do change it is acceptable that the change not happen instantly in your application. Examples of this type of data would be a list of store locations or a list of upcoming Dot Net Code Camps at your local user group. This type of data can still be stored in memory, but we need to make sure that it is updated at least periodically.

To do this we are still going to use a static list, but we are going to add a cache expiration time. When the cache expires we are going to update the static list. Note, that we will be doing the update of the static list on a separate thread. This way, our caller can still return the data from the cache instantly and not wait for the cache update. Additionally, we don’t actually change the values in the cache until we have successfully retrieved data from our backing store. This gives us the added benefit of reliability. If we are using SQL as our backing store and SQL is down, the application will still keep running with the values in the cache until it can update them from SQL.


	public class CachedThingService
	{
		private static List myCachedThings;
		private static DateTime expireTime = DateTime.UtcNow;
		private static object syncLock = new object();

		public MyCachedThing GetById(int id)
		{
			return this.GetAll().Single(s => s.Id == id);
		}

		public List GetAll()
		{
			if (myCachedThings == null)
			{
				UpdateCache();
				if (myCachedThings == null)
				{
					throw new InvalidOperationException("There was an error loading the things from the database. The cache is currently null.");
				}
			}
			else
			{
				// Run this async so that the user thread can continue
				var task = new Task(() => { UpdateCache(); });
				task.Start();
			}
			return myCachedThings.ToList();
		}

		private void UpdateCache()
		{
			if (DateTime.UtcNow >= expireTime)
			{
				lock (syncLock)
				{
					if (DateTime.UtcNow >= expireTime)
					{
						List newMyCachedThings = null;
						try
						{
							// Get all the cached things from our backing store
							newMyCachedThings = GetAllFromSQL();
						}
						catch (Exception ex)
						{
							// The backing store failed, probably do some logging or something
							Trace.TraceWarning(ex.ToString());
							newMyCachedThings = null;
						}
						if (newMyCachedThings != null)
						{
							myCachedThings = newMyCachedThings;
							// This is how long your cache lasts before it is updated
							expireTime = DateTime.UtcNow.AddHours(1);
						}
					}
				}
			}
		}

		private List GetAllFromSQL()
		{
			// This is where you would actually call your sql server
			throw new NotImplementedException();
		}
	}


# Scenario 3: Temporary Per User (Session) Data


The third scenario is when you need to store data that is associated with a user and retrieve it frequently across multiple request. The obvious solution for this is ASP.NET Session state. But, wait a second, I thought session state is bad? Well, it depends. First, remember our assumption from earlier, we are running multiple instance of our web server in a server farm or on Windows Azure. The default configuration of Session State wouldn’t be very useful to us because we can’t know which instance our user is going to hit next time the make a request.

The solution to this is to use some other backing for session state other than the server’s memory. Traditionally, this backing store has been SQL. And, if you are using SQL as a backing for your session then you might as well just use SQL directly. However, now there is a wonderful thing called AppFabric Caching. This is available on both [Windows Server](http://www.microsoft.com/windowsserver2008/en/us/app-main.aspx) and [Windows Azure](http://www.microsoft.com/windowsazure/appfabric/overview/default.aspx#top). AppFabric Caching is a distributed in-memory caching system such as memcache that performs extremely well. AppFabric has a ASP.NET Session State Provider that can be used with either Windows Server AppFabric or Windows Azure AppFabric.

> NOTE: For these scenarios you should have AppFabric installed on your development machine as you will need to add a reference to the assembly microsoft.applicationserver.caching.client.dll.

	public ActionResult Index(string firstName)
	{
		Session["FirstName"] = firstName;

		return View();
	}

	public ActionResult About()
	{
		var firstName = (string)Session["FirstName"];
		return View(firstName);
	}

And here is how to configure your web.config file. You can read more about that [here](http://msdn.microsoft.com/en-us/library/ee790859.aspx).

	<?xml version="1.0" encoding="utf-8" ?>
	<configuration>
 
	  <!--CONFIGSECTIONS MUST BE THE FIRST ELEMENT -->
	  <configSections>
		 <!-- REQUIRED TO READ THE <DATACACHECLIENT> ELEMENT -->
		 <section name="dataCacheClient"
			 type="Microsoft.ApplicationServer.Caching.DataCacheClientSection,
				Microsoft.ApplicationServer.Caching.Core, Version=1.0.0.0,
				Culture=neutral, PublicKeyToken=31bf3856ad364e35"
			 allowLocation="true"
			 allowDefinition="Everywhere"/>
	  </configSections>
 
	  <!-- CACHE CLIENT -->
	  <dataCacheClient>
		<!-- CACHE HOST(S) -->
		<hosts>
		  <host
			 name="yournamespace.cache.windows.net"
			 cachePort="22233"/>
		</hosts>
	  </dataCacheClient>
 
	  <system.web>
		<sessionState mode="Custom" customProvider="AppFabricCacheSessionStoreProvider">
		  <providers>
			<!-- SPECIFY THE NAMED CACHE FOR SESSION DATA -->
			<add
			  name="AppFabricCacheSessionStoreProvider"
			  type="Microsoft.ApplicationServer.Caching.DataCacheSessionStoreProvider"
			  cacheName="NamedCache1"
			  sharedId="SharedApp"/>
		  </providers>
		</sessionState>
	  </system.web>
	</configuration>


# Scenario 4: Data from a Permanent Backing Store


This next scenario discusses how to use caching to increase your application’s performance when frequently reading data from a persistent backing store such as SQL or a REST Service. Examples of this data would be user profile information or For this scenario, you will check the cache before you read from the backing store. If the data is not in the cache then it is added for a set period of time so that the next request for data can get it directly from the cache. This is referred to as the cache-aside pattern.

You will also need the web.config file from above for this scenario. You wont need to set the session state provider unless you are using the Session example as well.


	public class CustomerService {

		DataCache dataCache;

		public CustomerService() {
			DataCacheFactory dataCacheFactory = new DataCacheFactory();
			this.dataCache = dataCacheFactory.GetDefaultCache();
		}

		public Customer GetCustomer(int id) {
			Customer customer = null;
			try {
				customer = dataCache.Get("customer" + id) as Customer;
			} catch (DataCacheException) {
				CustomerContext context = new CustomerContext();
				customer = context.Customers.Single(c => c.Id == id);
				dataCache.Put("customer" + id, customer);
			}
			if (customer == null) {
				throw new InvalidOperationException();
			}
			return customer;
		}
	}

Additional Reading:
[Introducing the Windows Azure AppFabric Caching Service](http://msdn.microsoft.com/en-us/magazine/gg983488.aspx)
[Caching Service (Windows Azure AppFabric)](http://msdn.microsoft.com/en-us/library/gg278356.aspx)

Hopefully this helps you understand when and how to use a variety of different caching scenarios in your next ASP.NET application. Implemented properly, these tools will significantly speed up your application.
