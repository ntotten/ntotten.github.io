---
date: 2014-02-24
layout: post
title: Deploying Static Content to Azure Storage with Visual Studio Online Build
description: A simple PowerShell script that can be used to deploy your site's static content to Azure Blob storage during your Visual Studio Online continuous deployment.
categories:
- Windows Azure
---

A common task for improving the performance a web application is to server your static content from a different domain from you app. This external domain could be simply another pointer to your web server, a CDN service, or in the case here Windows Azure Blob storage. Blob storage is a fast and super inexpensive place to host static content for your site. To that end, I wrote a very simple PowerShell script that deploys all of my .min.js files in my script folder to blob storage. This script can be used from a [Visual Studio Online](http://visualstudio.com) build definition in order to automate the deployment.

Note, this script assumes that your site (in this case MyWebSite) and the script itself are at the root of your source directory. If you have a different directory structure, you will need to adjust the paths.

Also, notice that I am referencing the Windows Azure PowerShell Cmdlets which are installed on the VSO build server.

```powershell
$env:PSModulePath=$env:PSModulePath+";
        "+"C:\Program Files (x86)\Microsoft SDKs\Windows Azure\PowerShell"
Import-Module Azure
$storageAccount = "<your storage account>"
$storageKey = "<your storage account key>"
$containerName = "scripts"
$dir = "MyWebSite\Scripts"
if ($Env:TF_BUILD_SOURCESDIRECTORY)
{
    $dir = $Env:TF_BUILD_SOURCESDIRECTORY + $dir
}

$context = New-AzureStorageContext  –StorageAccountName $storageAccount
                                    -StorageAccountKey $storageKey

# Set the ContentType and optionally the CacheControl
$properties = @{
  "ContentType" = "application/javascript";
  "CacheControl" = "public, max-age=31536000";
}

$files = Get-ChildItem $dir -force | Where-Object {$_.FullName.EndsWith(".min.js")}
foreach ($file in $files)
{
  $fqName = $dir + '\' + $file.Name
  Set-AzureStorageBlobContent -Blob $file.Name
                              -Container $containerName
                              -File $fqName
                              -Context $context
                              -Properties $properties
                              -Force
}
```

In order to use this script for continuous integration simply add it to your source repo and edit your Build Definition to use the script as shown below.

[![Build Definition](/images/2014/02/builddefinition.png)](/images/2014/02/builddefinition.png)

That should be it. Now when your build runs your scripts will be deployed to blob storage.
