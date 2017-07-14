---
date: '2010-09-07'
layout: post
title: 'Dynamic objects and the Facebook C# SDK'
categories:
  - Facebook
redirect_from: /2010/09/dynamic-objects-and-the-facebook-c-sdk/
---

Developing with Facebook is like building a house on a swamp. Facebook is constantly evolving their platform, adding new features, and making changes. This makes it a challenge for an application developer to keep their application working and up to date. For these reasons, an application developer needs a solid framework to build on that keeps the development experience consistent, intuitive, and flexible.

This is why we have created the [Facebook C# SDK](https://github.com/facebook-csharp-sdk/facebook-csharp-sdk). With this new SDK, .Net developers can quickly and easily create Facebook applications and connected websites using all of the latest and fully supported Facebook APIs.

There have been many attempts at building Facebook SDKs for .Net developers. Some of them successful and others less so. Most of these SDKs have attempted to create extremely rich service layers that wrap every Facebook API call in static methods. This approach creates a framework that is so large it is difficult to maintain and so complex it is difficult to learn. Our framework solves these problems by heavily relying on the new C# dynamic objects.

For example, to make a few api calls using the Facebook C# SDK you would do this:

```cs
var app = new FacebookApp();
dynamic userInfo = app.Api("/4"); // Mark Zuck
string firstName = userInfo.first_name;
string lastName = userInfo.last_name;
string email = userInfo.email;

dynamic likes = app.Api("/4/likes");
foreach (var like in likes.data) {
  string name = like.name;
}
```

A strongly typed library would do the same thing like this:

```
Api api = new Api(session);
var user = api.Users.GetInfo(4);
string firstName = user.first_name;
string lastName = user.last_name;
string email = user.email;

var likes = api.Users.GetLikes(4);
foreach (var like in likes) {
  string name = like.name;
}
```

Now, there are certainly some benefits with the strongly typed classes, the most obvious of which is that the developer has full intellisense. However, there are some very large downfalls as well. For example, the leading .Net SDK, the Facebook Developer Toolkit, still lacks support for many of the newest Facebook API features such as the advertising api. Because each method in that framework is stronly typed the framework developers must impliment every call and the developer must know where to find that call. The dynamic Facebook C# SDK supported that api by default without recompiling the project.

Another advantage to dynamic is that it keeps our code clean and well organized. For example, consider an api call takes an IDictionary as the parameter argument. There are two ways you could build and pass in this object.

First, the traditional way with a standard dictionary.

```cs
var app = new FacebookApp();
var parameters = new Dictionary<string, object>();
parameters.Add("ids", "4,6");
parameters.Add("fields", "first_name,last_name,email");
var result = (JsonArray)app.Api(parameters);
foreach (var user in result) {
  var userDict = (IDictionary<string, object>)user;
  string firstName = userDict["first_name"];
  string lastName = userDict["last_name"];
  string email = userDict["email";
}
```

Second, with any dynamic object that implements IDictionary such as ExpandoObject.

```cs
var app = new FacebookApp();
dynamic parameters = new ExpandoObject();
parameters.ids = "4,6";
parameters.fields = "first_name,last_name,email";
dynamic result = app.Api(parameters);
foreach (var user in result) {
  string firstName = user.first_name;
  string lastName = user.last_name;
  string email = user.email;
}
```

The dynamic approach is both extremely flexible and clean. The last thing I want to mention about the advantage of using dynamic is that it adheres very closely to the official PHP library.

For example, here is an graph api call using the official PHP SDK.

```php
$facebook = new Facebook(array(
  'appId'  => '117743971608120',
  'secret' => '943716006e74d9b9283d4d5d8ab93204',
  'cookie' => true,
));
$me = $facebook->api('/me');
$first_name = $me->first_name;
```

Here is that same call in C# using the Facebook C# SDK.

```cs
var app = new FacebookApp();
dynamic me = app.Api("/me");
string firstName = me.first_name;
```

Now, when you are browsing the [forums](http://forum.developers.facebook.net/) or Facebook’s [official documentation](http://developers.facebook.com/docs/) to solve a problem you will have a much easier time applying the solution to your .Net application. We have deliberately kept properties, methods, and objects consistent with the Facebook PHP SDK for exactly this reason.

Thanks for reading and please let me know if you have any questions or comments.

