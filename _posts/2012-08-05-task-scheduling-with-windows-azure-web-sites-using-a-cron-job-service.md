---
date: '2012-08-05'
layout: post
title: Task Scheduling with Windows Azure Web Sites using a Cron Job Service
categories:
  - NodeJS
  - Windows Azure
redirect_from: >-
  /2012/08/task-scheduling-with-windows-azure-web-sites-using-a-cron-job-service/
---

**UPDATE**: This content is now fairly outdated. Instead of the solution below, I recommend checking out the [Azure Scheduler](http://azure.microsoft.com/en-us/services/scheduler/) and [Azure WebJobs](http://www.hanselman.com/blog/IntroducingWindowsAzureWebJobs.aspx) services.

A common question I get related to Windows Azure Web Sites is how you handle scheduled tasks. When uptime is critical or you are running large processes I generally recommend using a Worker Role. It is pretty easy to setup a single worker role to run scheduled tasks. Additionally, you could easily deploy a Linux VM and setup your own cron service. However, if you are looking for something simple and free you can easily use a free hosted cron service to trigger a url hosted in Windows Azure Web Sites that performs a task on demand. There are limitations to this method such as how long the task can run, but it should work for simple jobs.

For this demo I am using [SetCronJob.com](http://SetCronJob.com). There are a [bunch of free and paid hosted cron services](http://www.bing.com/search?setmkt=en-US&q=free+cron+service) available and I am not recommending any one over the other as I haven't used any except for this simple demo. I just picked this one at random so be sure to research and test the service you use.

The first thing to do is create an action that runs at a set url in your web app. For this demo I will use node.js, but you could very easily do this with any language. Below is a simple action in an express app that responds to /crontask and sends an email using [SendGrid](http://www.windowsazure.com/en-us/develop/nodejs/how-to-guides/sendgrid-email-service/).

```js
app.get('/crontask', function(req, res) {
  var sender = new SendGrid.SendGrid('user','key');
  sender.send({
    to: 'john@contoso.com',
    from: 'anna@contoso.com',
    subject: 'test mail',
    text: 'This is a sample email message.'
  });
});
```

Now to trigger this task to run you will need to setup a cron scheduler. First, you will need to create an account on [setcronjob.com](http://SetCronJob.com). They have a free plan that allows you to schedule jobs at 10 minute intervals. After you have an account you just need to create a new cron job. Enter the url of your Windows Azure Web Site and the path where your cron job is located.

[![](/images/2012/08/createcron.png)](/images/2012/08/createcron.png)

Now that you have the cron job setup your email task will run as scheduled. There are certainly more sophisticated tasks you could run such as reading from a queue for messages that need to be sent, but you can see how easy this is to setup.

