---
date: 2018-01-17
layout: post
title: Using Nodemon to Automatically Push SFDX Project Changes
description: How to use the nodemon too to push change to files in an SFDX project to your scratch org automatically when files are saved.
---

Several people have asked if it was possible to have changes to your local files automatically pushed to your scratch org when you save. This can be helpful if you are making small changes to things like CSS and need to test the output in the browser quickly.
Fortunately, this is easy using a tool called [nodemon](https://nodemon.io/). Nodemon allows developers to monitor a folder for file changes of all or some file types and then respond by running a script. In our case, we can use this to watch the app's source folder and run the SFDX CLI to push code changes on file saves.
To start, you will need to install nodemon. Installation can be done quickly using npm. If you don't already have [node.js](https://nodejs.org/en/) installed on your computer, you will need to do this first.
If you don't already have a `package.json` file in your project you will need to create one using the command below in the root of your project. You can accept all the defaults.

```bash
$ npm init
```

Next, install nodemon by running the following command.

```bash
$ npm install nodemon --save-dev
```

Next, you will need to edit your `package.json` file and add a new section called `nodemonConfig`.

```json
"nodemonConfig": {
  "watch": ["force-app"],
  "exec": "sfdx force:source:push",
  "ext": "cls,xml,json,js,trigger,cpm,css,design,svg",
  "delay": "2500"
}
```

You can read more about the config of nodemon [here](https://github.com/remy/nodemon), but basically what you need to know is that `watch` specifies the folder to monitor, in this case `force-app`, `exec` is the script that is run, `ext` is the file extensions to monitor, and `delay` is the time in milliseconds to wait between executions, for example if you same multiple files this will give 2.5 seconds so that ideally all files are pushed at the same time.

Finally, when you want to run this auto-push on save simply run `npx nodemon` in the command line and let it run. It will run continuously until you stop it.
