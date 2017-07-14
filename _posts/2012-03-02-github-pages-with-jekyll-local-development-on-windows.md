---
date: '2012-03-02'
layout: post
title: Github Pages with Jekyll - Local Development on Windows
categories:
  - Notes
redirect_from: /2012/03/github-pages-with-jekyll-local-development-on-windows/
---

I love [Github pages](http://pages.github.com). They make writing simple sites, blogs, or even complex documentation super enjoyable. Github pages uses [Jekyll](https://github.com/mojombo/jekyll) to build your markdown or other site content into static HTML pages. While it is easy to push new content to Github and preview changes in your live site, sometimes you want to develop and test your site locally. In order to do this you will need to install Ruby and Jekyll on your local machine. Since I do much of my development on Windows 7 or Windows 8 I wanted to have Jekyll setup on these machines as well. Below you see how to install and use Jekyll on your Windows box.

First, you need to install Ruby. You download the Ruby installer for Windows [here](http://rubyinstaller.org/downloads/). Download the most recent version of Ruby and run the installer. When you install Ruby you will want to select a few options to make ruby easier to use.

![](/images/2012/03/rubyinstall21.png)

After you have Ruby installed you will need to install the Ruby Development Kit. You can find this on the [Ruby downloads](http://rubyinstaller.org/downloads/) page as well. Download and extract the development kit nto a directory of your choice. I recommend C:\DevKit, but anything will work. After the developer kit has been extracted you need run the installation. You can do that by executing the following commands.

```bash
cd C:\DevKit
ruby dk.rb init
ruby dk.rb install
```

![](/images/2012/03/devkitinstall1.png)

Now you are ready to install Jekyll. You can do that by running the following command.

```bash
gem install jekyll
```

![](/images/2012/03/geminstalljekyll.png)

Finally, if you are using the [RDiscount](https://github.com/rtomayko/rdiscount) markdown engine, which is the one I prefer, you will need to install that as well.

```bash
gem install rdiscount
```

![](/images/2012/03/rdiscountinstall.png)

Now, you are ready to build your site using Jekyll. In order to do this simply navigate to your site's directory and run the following command.

```bash
jekyll --server
```

![](/images/2012/03/jekyllserver.png)

As you can see, I ran Jekyll on the [Facebook C# SDK documentation](https://github.com/facebook-csharp-sdk/facebook-csharp-sdk.github.com) and the output is placed in the _site directory.

![](/images/2012/03/sitedir.png)

Since we used the -server option when running Jekyll a simple web server was started and is running at [http://localhost:4000](http://localhost:4000). You can now view your site in the browser. Generally, I like to just use Jekyll to build the site and then use IIS on my local machine to host the site. You can do this by simply creating a new site in IIS and pointing it to the _site folder. Either way you now have your Jekyll site up and running for local development. This should make it a little easier to build your site, then when you are ready you can do a push to Github to deploy your site publicly.

Let me know if you have any questions or feedback.

