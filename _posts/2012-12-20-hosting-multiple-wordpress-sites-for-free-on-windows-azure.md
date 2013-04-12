---
date: 2012-12-20 13:00:18
layout: post
title: Hosting Multiple Wordpress Sites for Free on Windows Azure
categories:
- Windows Azure
---

The other day a friend of mine asked me to setup a few Wordpress blogs. These are really simple sites that don't have much traffic. He didn't want to spend much money so I suggested using the [free (as in always free, not a trial, forever free) Windows Azure Web Sites](https://www.windowsazure.com/en-us/home/scenarios/web-sites/) that we make available to every Windows Azure developer. Creating the sites is easy and you can find a [full tutorial here](https://www.windowsazure.com/en-us/develop/php/tutorials/website-from-gallery/). The one trick to creating multiple free Wordpress sites is sharing the same MySQL database. When you create each additional site, select to use your existing MySQL database.

After the site is created, open up the site in either [WebMatrix](http://www.microsoft.com/web/webmatrix/) or through FTP to make a single configuration change. Open wp-config.php at the root of your site and set the table_prefix value to something other than "wp_". For example, you could use "wp2_" for your second site as shown below.

	/**
	 * WordPress Database Table prefix.
	 *
	 * You can have multiple installations in one database if you give each a unique
	 * prefix. Only numbers, letters, and underscores please!
	 */
	$table_prefix  = 'wp2_';

That's it. With just one small change you can run a few Wordpress sites on Windows Azure for no cost.
