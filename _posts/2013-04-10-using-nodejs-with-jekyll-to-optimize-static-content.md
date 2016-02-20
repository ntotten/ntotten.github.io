---
date: 2013-04-10
layout: post
title: Using Node.js with Jekyll to Optimize Static Content
description: Learn how to use Node.js to script common tasks for optimizing static content in a Jekyll page.
categories:
- NodeJS
---

I recently migrated my blog to [Jekyll](https://github.com/mojombo/jekyll) hosted on Github Pages. I did this primarily because I was sick of dealing with the web editor in Wordpress. Wordpress is a great blogging platform for many people, but I just wanted something simpler and more flexible. I have [written about](http://ntotten.com/2012/03/02/github-pages-with-jekyll-local-development-on-windows/) how to configure Jekyll on Windows in the past. This post is about optimizing the content of a Jekyll page using Node.js.

The reason, I am using Node.js is primarily because of cross-platform issues with many Ruby gems. I played around with Jekyll Asset Pipeline and it seemed like a great tool for combining and minifying static content, but it seems to have issues running on Windows. I use many different computers including several PCs (I love my Surface Pro) and a Macbook Air so cross-platform support is critical. I blog on both devices so my blog platform must work on each OS. Node.js is an obvious choice for this as it runs flawlessly on both platforms.

The second reason I chose to use Node.js rather than Ruby gems is because I am hosting this site on Github Pages to use their automatic Jekyll deployment. Unfortunately, Github Pages doesn't support Jekyll plugins so anything that does this level of customization must be done on my local machine anyway. This means it didn't really matter which tools I used.

Now, that you know why I am doing this. Lets talk about how. First, I decided to use [node-minify](https://github.com/srod/node-minify) to handle the actual combining and minifying of files. This node module works well, it is simple, and it works with several minification libraries like UglyJS, YUI Compressor, and Google Closure Complier. Since I avoid Java like the plague I am just using UglyJS. The optimization isn't quite as good as the other two, but it is enough for me.

Below you can see how node-minify can be used to combine and minify js and css files.

```js
// Using UglifyJS for JS
new compressor.minify({
  type: 'uglifyjs',
  fileIn: ['assets/js/prettify.js', 'assets/js/app.js'],
  fileOut: 'assets/' + config.version + '.js',
  callback: function(err){
    if (err) {
      console.log(err);
    }
  }
});

// Using Sqwish for CSS
new compressor.minify({
  type: 'sqwish',
  fileIn: ['assets/css/bootstrap.min.css', 'assets/css/style.css'],
  fileOut: 'assets/' + config.version + '.css',
  callback: function(err){
    if (err) {
      console.log(err);
    }
  }
});
```

In addition to node-minify I also wanted something that would help me automate the various tasks of building the site. For this I chose [Jake](https://github.com/mde/jake). Jake is a great tool that I have used on many other projects for creating build scripts.

I setup my jakefile.js with a few simple tasks.

```js
task('default', ['minify', 'build'])

task('minify', function() {
  // Clean up old files
  var files = fs.readdirSync('./assets/');
  for (var i = files.length - 1; i >= 0; i--) {
    var file = files[i];
    if (path.extname(file) == '.js' || path.extname(file) == '.css') {
      fs.unlinkSync('./assets/' + file);
    }
  };

  // Combine and minify code here
  ...
});

task('build', function() {
  setConfigValue('version', config.version);
});
```

On thing you will notice is that my static content is being created with a uuid version number. This way each time I publish my site I get a new version. Eventually, I am going to change this code to only perform the minification if the css or js files change. The issue with using a random name is that I need to somehow tell Jekyll which files to use. For this, I set a configuration value in the _config.yml file that Jekyll uses. You can see that file below. The version number gets updated every time I build my static content.

```yml
markdown: rdiscount
pygments: false
permalink: /:year/:month/:day/:title/
paginate: 5
version: 63301a88-ec4f-4f35-b9a7-7533810aec30
name: Nathan Tottes&#39;s Blog
description: Thoughts and Experiences with Software Development.
url: http://ntotten.com
```

Finally, I need to reference this version number in my Jekyll layouts. This is easy and can be seen below.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link href='http://fonts.googleapis.com/css?family=Droid+Sans'
      rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700'
      rel='stylesheet' type='text/css'>
    <link href='/assets/{{ site.version }}.css'
      rel='stylesheet' type='text/css'>
```

Now when I publish the site to Github pages, Jekyll will use the version number to setup the static content path and my site will be served with the smaller and optimized js and css files. You can see the full [jakefile.js](https://github.com/ntotten/ntotten.github.com/blob/master/jakefile.js) in my website's [Github repositoryy](https://github.com/ntotten/ntotten.github.com/).
