---
date: 2011-09-27 16:05:40
layout: post
title: Running Processes in Windows Azure
categories:
- NodeJS
- Windows Azure
---

One of the little known features of the Windows Azure SDK 1.5 (September 2011) Release is the ability to directly run executables on startup without writing custom code in your WorkerRole or WebRole entry point.

This feature is facilitated by a new section in the service definition for the roles. You can see the new section and subsections below.

```xml
<Runtime executionContext="[limited|elevated]">
  <Environment>
   <Variable name="<variable-name>" value="<variable-value>">
    <RoleInstanceValue xpath="<xpath-to-role-environment-settings>"/>
    </Variable>
  </Environment>
  <EntryPoint>
   <NetFxEntryPoint assemblyName="<name-of-assembly-containing-entrypoint>" targetFrameworkVersion="<.net-framework-version>"/>
   <ProgramEntryPoint commandLine="<application>" setReadyOnProcessStart="[true|false]" "/>
  </EntryPoint>
</Runtime>
```

For purposes of this example we are going to duplicate the simple NodeJS worker role that was created in a [previous post](http://ntotten.com/2011/08/nodejs-on-windows-azure/), but we are going to use the new ProgramEntryPoint functionality.

To begin we create a standard Windows Azure project with a single Worker Role.

[![SNAGHTML1c4d83](/images/2011/09/snaghtml1c4d83_thumb1.png)](/images/2011/09/snaghtml1c4d831.png)

[![SNAGHTML1d1c08](/images/2011/09/snaghtml1d1c08_thumb1.png)](/images/2011/09/snaghtml1d1c081.png)

Our starting point is a standard Worker Role.

[![image](/images/2011/09/image_thumb.png)](/images/2011/09/image.png)

The first thing we need to do is delete the WorkerRole.cs file. We won’t be using that file or any other C# code for this project.

[![image](/images/2011/09/image_thumb1.png)](/images/2011/09/image1.png)

Next, we add our node.exe and app.js files. Make sure to set the to “Content” and “Copy if newer”.

[![image](/images/2011/09/image_thumb2.png)](/images/2011/09/image2.png)

Next, we need to tell Windows Azure to run our node application after the role starts. To do this open the ServiceDevinition.csdef file.

```xml
<ServiceDefinition name="WindowsAzureProject11" xmlns="http://schemas.microsoft.com/ServiceHosting/2008/10/ServiceDefinition">
  <WorkerRole name="WorkerRole1" vmsize="Small">
    <Imports>
      <Import moduleName="Diagnostics" />
    </Imports>
  </WorkerRole>
</ServiceDefinition>
```

Now add the following lines to the csdef file. These lines tell Windows Azure that your role entry point is “node.exe app.js” and that when that process starts the role is ready. Note that we also added an endpoint for NodeJS on port 80 and also removed the diagnostics import.

```xml
<ServiceDefinition name="WindowsAzureProject11" xmlns="http://schemas.microsoft.com/ServiceHosting/2008/10/ServiceDefinition">
  <WorkerRole name="WorkerRole1" vmsize="Small">
    <Runtime executionContext="limited">
      <EntryPoint>
        <ProgramEntryPoint commandLine="node.exe app.js" setReadyOnProcessStart="true" />
      </EntryPoint>
    </Runtime>
    <Endpoints>
      <InputEndpoint name="NodeJS" protocol="tcp" port="80" />
    </Endpoints>
  </WorkerRole>
</ServiceDefinition>
```

Finally, we are ready to deploy our project. After you deploy the project you will see your NodeJS server running all without writing a single line of .Net code.

Another thing to note is that if your NodeJS server shuts down for any reason the Worker Role will recycle and restart the process. This way you don’t have to worry about restarting the services yourself.

While our example used NodeJS, you can use pretty much any process like this. There are also ways of using .Net code in this fashion as well to make it even easier to transition your existing application to Windows Azure.

You can see my working demo deployed here: [http://simplenodejs.cloudapp.net/](http://simplenodejs.cloudapp.net/)

Let me know how this works or if you have any questions or feedback.
