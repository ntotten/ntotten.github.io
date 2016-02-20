---
date: 2012-08-02 13:32:52
layout: post
title: Node.js, Socket.IO, and ASP.NET MVC 4 on Windows Azure Web Sites - Tankster
  Command Sample
categories:
- NodeJS
- Windows Azure
---

Today I am releasing another sample application called [Tankster Command](https://github.com/WindowsAzure-Samples/TanksterCommand). This sample shows how to build an application that uses both ASP.NET and Node.js side-by-side. I used ASP.NET MVC 4 to build the bulk of the application and used Node.js and Socket.IO to create a simple chat client. This sample also uses Facebook to authenticate the users.

The sample is open sourced under an Apache 2 license and is available to [download ](https://github.com/WindowsAzure-Samples/TanksterCommand/zipball/master) on [Github](https://github.com/WindowsAzure-Samples/TanksterCommand). Additionally, you can see a working demo of this application at [http://tankstercommand.azurewebsites.net](http://tankstercommand.azurewebsites.net/). Simply login with your Facebook account and you can see the sample in action.

[![](/images/2012/08/chatpage.png)](/images/2012/08/chatpage.png)

# Under the Hood
This application is divided into two parts. The first is the ASP.NET MVC application. This part of the app is fairly straight forward. I am using a few controllers, a single Web API controller, and a few views.

The one thing to note about the views is the use of [Handlebars ](http://handlebarsjs.com/) for templating. For both the leaderboard and the chat pages generate portions of their UI on the client after calls to services. In the case of the leaderboard, I simply call the leaderboard API and return the top 10 players as JSON. After that I use Handlebars to generate HTML from the template and insert it into the DOM. You can see the Handlebars template and the script that runs on page load below.

```html
<ul id="leaderboard"></ul>

<script id="leaderboard-items" type="text/x-handlebars-template">
  {{#each people}}
  <li class="profile">
    <img src="{{avatarSrc Avatar }}" alt="{{Name}} Picture"/>
    <div class="bigrank">{{Rank}}</div>
    <div class="img"></div>
    <div class="name">{{Name}}</div>
    <div class="rank">{{Rank}}</div>
    <div class="victories">{{Victories}}</div>
    <div class="kills">{{Kills}}</div>
    <div class="accuracy">{{Accuracy}}</div>
    <div class="terraform">{{Terrain}}</div>
    <div class="viewgame {{inGameClass InGame }}">View Game</div>
  </li>
  {{/each}}
</script>
```

And the script file.

```js
$(document).ready(function () {
  Handlebars.registerHelper('avatarSrc', function (item) {
    return new Handlebars.SafeString('@Url.Content("~/Images/common/character")' + item + '.png');
  });
  Handlebars.registerHelper('inGameClass', function (item) {
    return new Handlebars.SafeString(item ? "" : "offline");
  });

  $.getJSON('@Url.Action("leaderboard", "api")', function (data) {
    var template = Handlebars.compile($('#leaderboard-items').html());
    var html = template({ people: data });
    $(html).appendTo("#leaderboard");
  });
});
```

The second portion of the application runs [Socket.IO](http://socket.io/) on Node.js. Socket.IO is useful for building real-time web applications that push data between clients. In this case, I am using Socket.IO to create a simple chat client. The UI of the chat page still uses an ASP.NET controller and view along with Handlebars on the client to generate HTML when a chat message is sent or received.

Below you can see the script that connects to the socket.io server. This script handles sending chat messages as well as receiving messages and announcements.

```js
var socket = io.connect();

socket.on('connect', function () {
  socket.emit('connect', userInfo);
});

$('#text').keypress(function (e) {
  if (e.keyCode == 13) {
    $("#send").click();
    return false;
  }
});

$('#send').click(function () {
  socket.emit('user message', $('#text').val());
  writeMessage(userInfo.nickname, $('#text').val(), 'chat', userInfo.userImageId, userInfo.backgroundColor, true);
  $('#text').val('');
});

socket.on('user message', function (message) {
  writeMessage(message.nickname, message.text, message.type, message.userImageId, message.backgroundColor, message.fromme);
});

socket.on('announcement', function (text) {
  writeMessage("Event", text, "event", Math.ceil(Math.random() * 5), null);
});
```

# Caveats when Using Both NuGet and NPM Packages
There are few things you should be aware of when publishing a site to Windows Azure Web Sites that uses both NuGet and Node packages.

First, if you attempt to publish a this site with Git the publishing server will only download NuGet packages. Currently, our publishing servers don't run NPM when you are publishing a csproj file. This will cause your Socket.io chat server to fail. For now the workaround is to use Web Deploy.

Second, if you are publishing your app using Web Deploy you must include the node_modules folder and all its contents in the csproj. You can do this in Visual Studio 2012 by showing all files in the solution explorer, right clicking on the node_modules folder and clicking include in project.

# Conclusion
I hope this samples give you a better idea of how you can mix various technologies on Windows Azure Web Sites. You could do similar things with PHP
