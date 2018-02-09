---
date: 2018-02-09
layout: post
title: Simplify SFDX Project Metadata with Gulp 
description: Learn how to simplify your SFDX project by eliminating redundant metadata files using a simple Gulp script.
---

I have recently been thinking about how metadata surfaces in SFDX projects and how we might be able to simplify the experience. One thing that bothers me is that there is tons of redundancy with the `-meta.xml` files. For example, a project with 50 Apex classes will have 50 `-meta.xml` files that are almost always exactly the same. This makes things like changing the API version for every class cumbersome. Additionally, it means that rather than right clicking a folder and creating a new MyClass.cls file to create an Apex class you either have to use the CLI or copy and paste a bunch of XML from another class.

With these problems in mind I have started to experiment with how we might make this a more modern and enjoyable development experience. Before we dive in, please keep in mind that this is a **prototype**. I am putting this out there mainly to get feedback and see if this is worth investing additional time. This is definitely not fully baked, so please let me know what you think.

So to begin let me explain how the process will work. Then I will show you how you can set this up in your own project (again, warning about being a prototype.)

Normally, with an SFDX project you have a source folder that contains the files that make up your project and that you are directly editing. These files are used to push to your scratch org or to create a package.

For this project, I am going to change the above pattern a bit. Instead of considering our source folder to be the finalized representation of our product, we are going to change it to be the "preprocessed" source. We will do a build using Gulp that will transform the raw source into "SFDX" source and create an `out` folder. The `out` folder is what will be used to push and build packages. The `out` folder will not be added to our git repo as it is generated.

So our project structure will look like this.

```
/config
/data
/out
/src
sfdx-project.json
```

So what this all means is that we can eliminate a bunch of duplicate `-meta.xml` files from our source. For example this is the Dreamhouse classes folder when using this utility, no `-meta.xml` files are required next to the Apex classes.

![Dreamhouse Classes](/images/2018/02/sfdx_classes_folder.png)

## Setup Your Project

Next, you will see how to configure this utility in your own project. Since we will be using Gulp, the first thing to do is create a `package.json` file and install `gulp` and `gulp-rename`. You can run the following commands to do so.

```bash
npm install gulp-cli -g
npm init
npm install gulp gulp-rename --save-dev
```

Next, install the prototype module that I created.

```bash
npm install gulp-sfdx-metadata --save-dev
```

Next, change the package path in your `sfdx-project.json` file to use the generated out folder.

```json
"packageDirectories": [
  {
    "path": "out/main/default",
    "default": true
  }
]
```

Next, create a `gulpfile.js` at the root of your project and add the following contents.

```js
const gulp = require("gulp");
const rename = require("gulp-rename");
const sfdxMetadata = require("sfdx-gulp-metadata");
const sfdxProject = require("./sfdx-project");

const output = sfdxProject.packageDirectories[0].path;
const src = "src/";

const defaults = {
  apiVersion: "39.0"
};

function addDefaultMetadata(options) {
  return function() {
    return gulp
      .src(`${src}${options.folder}/*.${options.extension}`)
      .pipe(
        sfdxMetadata({
          object: options.object,
          metadata: options.metadata
        })
      )
      .pipe(
        rename({
          suffix: "-meta",
          extname: ".xml"
        })
      )
      .pipe(gulp.dest(`${output}/${options.folder}`));
  };
}

gulp.task("copy", function() {
  return gulp.src("src/**/*").pipe(gulp.dest(output));
});

gulp.task(
  "class",
  addDefaultMetadata({
    folder: "classes",
    extension: "cls",
    object: "ApexClass",
    metadata: {
      apiVersion: defaults.apiVersion,
      status: "Active"
    }
  })
);

gulp.task(
  "trigger",
  addDefaultMetadata({
    folder: "triggers",
    extension: "trigger",
    object: "ApexTrigger",
    metadata: {
      apiVersion: defaults.apiVersion,
      status: "Active"
    }
  })
);

gulp.task(
  "page",
  addDefaultMetadata({
    folder: "pages",
    extension: "page",
    object: "ApexPage",
    metadata: {
      apiVersion: defaults.apiVersion,
      availableInTouch: false,
      confirmationTokenRequired: false,
      label: "${name}"
    }
  })
);

gulp.task("build", ["copy", "class", "trigger", "page"]);
```

You can see how in this file we are actually specifying default values for metadata that apply to every `ApexPage`, `ApexTrigger`, and `ApexClass`. Now you can go and delete all of the corresponding `-meta.xml` files for those objects.

In order to generate the output of your project before you push or create a package simply run the gulp build command as shown.

```bash
gulp build
```

This will generate your code to the `out` folder where it will have all the appropriate metadata files.

## Next Steps

As I mentioned, this is a prototype. It shouldn't be used in a real app. There are lots of things missing such as:

* Ability to pull code and merge back into `src`
* Ability to override metadata for specific objects
* Simplify the `gulpfile.js` configuration
* Testing of really any kind. :)

You can see the [full source and example on Github](https://github.com/ntotten/gulp-sfdx-metadata).

So if you find this concept to be worthwhile let me know. What would you like to see this do? Does it make sense? Is it useful?
