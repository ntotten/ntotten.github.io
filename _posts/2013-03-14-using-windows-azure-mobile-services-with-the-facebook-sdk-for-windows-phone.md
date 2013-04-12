---
date: 2013-03-14 14:10:19
layout: post
title: Using Windows Azure Mobile Services with the Facebook SDK for Windows Phone
categories:
- Facebook
- Windows Azure
---

As you may have seen, [Windows Azure Mobile Services](http://www.windowsazure.com/en-us/home/scenarios/mobile-services/) makes it super easy to add a cloud backend to your mobile apps. Mobile Services also supports authentication with OAuth providers like Facebook, Microsoft, and Twitter. I have had people ask me if it is possible to use Mobile Services with the [Facebook SDK for .NET](https://github.com/facebook-csharp-sdk/facebook-csharp-sdk) (formally named the Facebook C# SDK). In short, yes.


# Authenticating with Facebook

Since our app is going to be authentication with Facebook we will likely want to ask the user for additional Facebook permissions such as posting to a wall or reading additional friend data. This currently isn't supported in the Mobile Services SDK. So the first thing we need to do is change how the initial authentication is performed. To this we are going to use the [Facebook SDK for Windows Phone](https://github.com/facebook-csharp-sdk/facebook-winclient-sdk). The Facebook SDK for Windows Phone is a layer on top of the [Facebook SDK for .NET](https://github.com/facebook-csharp-sdk/facebook-csharp-sdk) that helps with authentication and other phone specific scenarios.****

> **Warning:** The Facebook SDK for Windows Phone is currently in alpha so things will change and break as we move toward version 1.0.0.

Starting with our default Mobile Services implementation of authentication as show in [this tutorial](http://www.windowsazure.com/en-us/develop/mobile/tutorials/get-started-with-users-dotnet/) we need to make a few minor changes.

First, we need to install the Facebook SDK for Windows Phone. To do this use NuGet. Since the package is pre-release you will need to use the Nuget console.

	
	Install-Package Facebook.Client -pre


Next, add a static property for [FacebookSessionClient](https://github.com/facebook-csharp-sdk/facebook-winclient-sdk/blob/master/Source/Facebook.Client/FacebookSessionClient.cs) to the App.xaml.cs file. You can add this property right above the MobileServiceClient property.

	public static FacebookSessionClient FacebookSessionClient = 
		new FacebookSessionClient("[facebookAppId]");
	public static MobileServiceClient MobileService = new MobileServiceClient(
		"https://[namespace].azure-mobile.net/",
		"[applicationKey]"
		);

Next, we will make a few changes to our authentication method in MainPage.xaml.cs as shown below.

	private FacebookSession fbSession;
	private MobileServiceUser user;
	private async System.Threading.Tasks.Task Authenticate()
	{
		while (fbSession == null)
		{
			string message;
			try
			{
				fbSession = await App.FacebookSessionClient
					.LoginAsync("email,publish_stream,friends_about_me");
				var client = new FacebookClient(fbSession.AccessToken);
				var token = JObject.FromObject(new
				{
					access_token = fbSession.AccessToken,
				});
				user = await App.MobileService
					.LoginAsync(MobileServiceAuthenticationProvider.Facebook, token);
				message =
					string.Format("You are now logged in - {0}", user.UserId);
			}
			catch (InvalidOperationException)
			{
				message = "You must log in. Login Required";
			}
 
 
			MessageBox.Show(message);
		}
	}

As you can see, we are now using the FacebookSessionClient to perform the OAuth with Facebook. After the user authorizes the app with Facebook we then create a JToken object containing the Facebook Access Token and pass it to the MobileServiceClient's LogingAsync method. Mobile Services then makes a request to the Mobile Services REST API. On the server a new user is created and a Mobile Services authentication token is created. This token is returned to the client. Now the client is authenticated with both Facebook and Mobile Services.

Also, notice that the FacebookSessionClient's LoginAsync method allows us to pass in a string of permissions to request. In this case we are requesting the email, publish_stream, and friends_about_me permissions. You can change this list accordingly based on the needs of your app.


# Using the Facebook Graph API


Now that we are authenticated and have a Facebook access token we can perform requests on the Facebook Graph API using the Facebook SDK for Windows Phone. In this case I am going to request a list of friends including their "About Me" details as we have the "friends_about_me" permission.

To get the Facebook access token simply access the AccessToken property on the FacebookSession object which we have in our app at fbSession. You can see below how you can make this Graph API request using the [FacebookClient](https://github.com/facebook-csharp-sdk/facebook-csharp-sdk/blob/master/Source/Facebook/FacebookClient.cs) object.

	private async Task GraphRequest()
	{
		var client = new FacebookClient(fbSession.AccessToken);
		dynamic friends = await client.GetTaskAsync("me/friends");
		foreach (dynamic friend in friends.data)
		{
			string about = friend.about;
		}
	}

Now you are free to interact with both the Facebook Graph API and the Mobile Services API as an authenticated user. You could also use the Facebook SDK for Windows Phone to request additional permissions if your application requires them.
