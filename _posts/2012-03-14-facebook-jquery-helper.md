---
date: 2012-03-14 17:22:29
layout: post
title: Facebook jQuery Helper
catagories:
- Facebook
---

I just published a simple jQuery plugin on github that makes it super easy to use the Facebook Javascript SDK on your website. It also allows you to to use jQuery events to run code before and after the Facebook's code is initialized.

You can find the full source for this plugin on Github at [https://github.com/ntotten/jquery-fb](https://github.com/ntotten/jquery-fb).

To add the Facebook Javascript SDK to your site simply call the following Javascript somewhere in your document:

```js
$(document).fb('youappid');
```

If you want to use the events simply add handles to either the fb:initializing or fb:initialized events.

```js
$(document).on('fb:initializing', function() {
  // Do something before FB.Init is called
});

$(document).on('fb:initialized', function() {
  // Do something after FB.Init is called
});
$(document).fb('youappid');
```

The benefit of this library is that it you can add the initialization code in a single place in your app (such as a layout or master page) and then use the jQuery events to run the appropriate code on specific pages. For example, on your login page you may want to do something like this:

```
$(document).ready(function() {
  // Add the function to run after FB is initialized
  $(document).on('fb:initialized', function() {
    FB.getLoginStatus(fbAuthStatusChange);
  });
  $(document).fb('youappid');
});

function fbAuthStatusChange(request) {
  // Do something
}
```

It is a pretty simple plugin, but I think it is helpful. I have used something similar to this for a while and it has helped me out a lot. I have a few minor improvements I want to add to this, but it should be ready to use.

**Update:** This package is now on Nuget. It is called 'jQuery.fb'. You can find it here: [https://nuget.org/packages/jQuery.fb](https://nuget.org/packages/jQuery.fb)

Let me know if you have any questions or feedback.
