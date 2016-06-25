---
date: '2008-10-06'
layout: post
title: Photo Box Rotator
categories:
  - Notes
redirect_from: /2008/10/photo-box-rotator/
---

I have created a JavaScript photo rotator similar to the one on iStockPhoto.com's home page. This rotator is pretty simple and only requires about 20 lines of JavaScript. You can see an example here: [http://www.solanocoalition.org](http://www.solanocoalition.org). This sample was built using ASP.NET and does use a few functions from the ASP.NET AJAX Library. You could easily change it to whichever library you use or don't use.

First we setup the containers to hold the images:

```html
<ul id="panes" class="blockpix">
  <li class="onehunpic">
    <img src="<%=Url.Content("~/content/images/splash/0.jpg") %>" />
  </li>
  <li class="onehunpic">
    <img src="<%=Url.Content("~/content/images/splash/1.jpg") %>" />
  </li>
  <li class="onehunpic whitesq"></li>
  <li class="onehunpic whitesq"></li>
  <li class="onehunpic">
    <img src="<%=Url.Content("~/content/images/splash/2.jpg") %>" />
  </li>
  <li class="onehunpic">
    <img src="<%=Url.Content("~/content/images/splash/3.jpg") %>" />
  </li>
  <li class="onehunpic">
    <img src="<%=Url.Content("~/content/images/splash/4.jpg") %>" />
  </li>
  <li class="onehunpic whitesq"></li>
  <li class="onehunpic">
    <img src="<%=Url.Content("~/content/images/splash/5.jpg") %>" />
  </li>
  <li class="onehunpic">
    <img src="<%=Url.Content("~/content/images/splash/6.jpg") %>" />
  </li>
  <li class="onehunpic">
    <img src="<%=Url.Content("~/content/images/splash/7.jpg") %>" />
  </li>
  <li class="onehunpic">
    <img src="<%=Url.Content("~/content/images/splash/8.jpg") %>" />
  </li>
</ul>
```

Next, is the JavaScript:

```js
// All images
var im0 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25);
// Loaded images (set manually in html, then dynamically)
var im1 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8);
// The indexes of the panels that will rotate
var pn = new Array(0, 1, 4, 5, 6, 8, 9, 10, 11);
// The path were the images are located
var imagePath = '<%=Url.Content("~/content/images/splash/") %>';
var currentPane = 0;
var currentImage = 0;
var speed = 1750;
var panes;
function StartRotate() {
  try {
    if (!panes) {
      panes = document.getElementById("panes");
    }
    setTimeout(function() {
      var randPane;
      do {
        randPane = Math.floor(Math.random() * pn.length);
      } while (randPane == currentPane);
      do {
        currentImage = Math.floor(Math.random() * im0.length);
      } while (Array.contains(im1, currentImage));
      im1[randPane] = currentImage;
      var src = imagePath + currentImage + ".jpg";
      panes.getElementsByTagName("li")[pn[randPane]].childNodes[0].src = src;
      currentPane = randPane;
      StartRotate();
    }, speed);
  } catch (ex) { }
}
Sys.Application.add_load(StartRotate);
```

There are a few nice features about this rotator. First, the images are completely random. Second, one pane will not switch images more than one time before another pane rotates. Third, there will never be duplicate images displayed at the same time.

A few things to note. First, you could remove all of the hard coded images in the HTML and just build them dynamically the first time the function is run. This would cut down on some the HTML. I chose to do it this way in case there was an error on the client or if the user has JavaScript disabled. This way they will still see static images rather than an empty space.

