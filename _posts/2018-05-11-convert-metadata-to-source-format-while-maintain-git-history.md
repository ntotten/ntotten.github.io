---
date: 2018-05-11
layout: post
title: Converting Salesforce Metadata to Source Format While Maintain Git History
description: Learn how to correctly convert the metadata of your large project to source format while keeping your git history intact.
---

**UPDATE on 2018-09-10**: I ran into another option that might be even easier for some people. Git has a [configuration option](http://www.brettallred.com/blog/2012/02/18/you-may-want-to-set-your-merge-renamelimit-git) that controls how many files it will scan to determine renames. I tested this option out and it seemed to pick up all renames except for custom objects in a single commit.

```bash
git config merge.renameLimit 999999
sfdx force:mdapi:convert -r src -d src2
rm -rf src
mv src2 src
git add -A
git commit -m "Converted from metadata to source format"
git config --unset merge.renameLimit # Return the git config option to the default
```

---

If you have a massive Salesforce project that is in metadata format and tracked in git, you have a lot of valuable history in that project. You cannot merely do a bulk convert on that project to the new source format and lose complete access to that history. It is a little work, but it is possible to do the conversion and maintain your git history.

First, I'll explain the reason this isn't working. When you rename a file in git usually it is pretty good about detecting the changes. However, the problem arises when there is an enormous amount of changes at one time. Git has [built in limits](https://stackoverflow.com/questions/13805750/git-fails-to-detect-renaming/13808715#13808715), and it will fail to figure out what renames occurred because there is too much going on.

The solution on the surface is simple. Do the convert in smaller chunks. However, there are a few caveats to be aware. Below I will walk through the steps used for converting an application (in this case dreamhouse in metadata form).

First, start with your project in metadata format. It would look something like the below structure with all of the code in metadata format in the `./metadata` folder.

```txt
.
├── README.md
└─── metadata
    ├── objectTranslations
    ├── objects
    │   ├── Bot_Command__c.object
    │   └── ...
    ├── package.xml
    ├── pages
    ├── pathAssistants
    ├── permissionsets
    ├── quickActions
    ├── remoteSiteSettings
    ├── reports
    ├── staticresources
    │   ├── leaflet.resource
    │   ├── leaflet.resource-meta.xml
    │   └── ...
    ├── tabs
    ├── triggers
    └── workflows
```

The first thing to do is create a temporary SFDX project outside of the git repo.

```bash
$ sfdx force:project:create -n tempproj
```

Next, convert the project in metadata into the temporary project.

```bash
$ sfdx force:mdapi:convert --rootdir ./project/metadata --outputdir ./tempproj
```

After this runs you will have two copies of your application. One in the origional location and one in the new `temproj` directory.

The first thing to do is move over the `sfdx-project.json` file and `config` folder and commit them to the repo.

```bash
$ mv ./tempproj/sfdx-project.json ./project/sfdx-project.json
$ mv ./tempproj/confg ./project/config
$ git add -A
$ git commit -m "Created sfdx-project.json and config"
```

Next, create the new folder structure.

```bash
$ mkdir ./project/force-app
$ mkdir ./project/force-app/main
$ mkdir ./project/force-app/main/default
```

Now is when you can start converting to the metadata format. For most metadata types this is reasonably straightforward. If the type is just composed of one or two files (a source file and a metadata.xml file or just the single xml file) you can simply copy these over. For these types, you should be able to copy entire folders of the converted source to its new location, delete the old metadata, and do a git commit. Everything should be detected correctly. If it isn't you may need to split the changes to be less than a whole folder - you may have too many files.

For example, moving Triggers would look like this.

```bash
$ mv ./tempproj/force-app/main/default/triggers ./project/force-app/main/default/triggers
$ rm -rf ./project/metadata/triggers
$ git add -A
$ git commit -m "Converted triggers to source format"
```

You repeat this process for every file/folder that contains the simple metadata format.

The tricky part comes when the new format of source uses what we call expanded source. Expanded source is when a single metadata item is split into multiple files. An example of this is Custom Objects. What I have found best, in this case, is to move the single `-meta.xml` file first, commit the change, then move the rest of the expanded files. Performing the move in these two steps will preserve the history with the `-meta.xml` file.

To do the convert with Custom Objects you would run the following.

```bash
$ mkdir ./project/force-app/main/default/objects
$ mkdir ./project/force-app/main/default/objects/MyObject__c
$ mv ./tempproj/force-app/main/default/objects/MyObject__c/MyObject__c.object-meta.xml /
     ./project/force-app/main/default/objects/MyObject__c/MyObject__c.object-meta.xml
$ rm ./project/metadata/objects/MyObject__c.object
$ git add -A
$ git commit -m "Converted MyObject to source format"
```

Next, copy over the other parts of the expanded source.

```bash
$ mv ./tempproj/force-app/main/default/objects/MyObject__c ./project/force-app/main/default/objects/MyObject__c
$ git add -A
$ git commit -m "Added MyObject expanded source files"
```

You should be able to repeat either of these two processes for everything in your project to maintain the source history after your move to the new source format.

Let me know if you run into any issues or have any suggestions: [@ntotten](https://twitter.com/ntotten).
