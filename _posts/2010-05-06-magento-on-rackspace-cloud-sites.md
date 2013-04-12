---
date: 2010-05-06 16:11:00
layout: post
title: Magento on Rackspace Cloud Sites
categories:
- Notes
---

After a little bit of work I was able to setup Magento 1.4 on Rackspace cloud sites. This new version runs quickly and correctly almost by default on Rackspace Cloud sites. I am not sure if this was the result of changes made to the Magento code or changes that Rackspace made to their infrastructure, but version 1.4 runs much better than previous versions on cloud sites. For the most part you simply need to follow the default instructions for setup and configuration of Magento on the Rackspace Cloud. These standard instructions are available both [here](http://cloudsites.rackspacecloud.com/index.php/Magento) on the Rackspace Cloud Sites wiki and [here](http://www.magentocommerce.com/wiki/magento_installation_guide) on the official Magento wiki.

There are two things that are non standard. The first, as mentioned on the Rackspace wiki, is that if you are using url rewrites you must set RewriteBase / in the .htaccess file. The second change is only needed if you are using ssl pages on your site. Rackspace handles requests through a gateway server that then forwards the request to the web server running your app. The key however, is that the request is only a secure request from the user to the gateway. The request from the Rackspace gateway to the Rackspace Cloud server running Magento is send unsecured. This is not the behavior that Magento expects. The result will be an infinite loop of redirects when you try to visit any https pages on your site. A minor change to the code will fix this problem.

Rackspace includes a value “HTTP_CLUSTER_HTTPS” with the request when the request is secure. Magento normally looks for the standard “HTTPS” value. We need only make a few changes to the file appcodecoreMageCoreModelConfig.php to fix this issue. The correct way to modify Magento core files is to create a copy of the file and move it to the same place except in the appcodelocal directory. To make this change we will copy the Config.php file and move it to appcodelocalMageCoreModelConfig.php. You will need to create these folders.

Change line 888 in the newly copied file from:

    $secure = (!empty($_SERVER['HTTPS']) && ($_SERVER['HTTPS']!='off')) || $_SERVER['SERVER_PORT']=='443';

to:

    $secure = (!empty($_SERVER['HTTP_CLUSTER_HTTPS']) && ($_SERVER['HTTP_CLUSTER_HTTPS']!='off')) || $_SERVER['SERVER_PORT']=='443';

Let me know if you have any problems or feedback.
