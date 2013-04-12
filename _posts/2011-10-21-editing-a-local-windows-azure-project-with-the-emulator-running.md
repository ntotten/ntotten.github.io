---
date: 2011-10-21 19:57:24
layout: post
title: Editing a Local Windows Azure Project with the Emulator Running
categories:
- Windows Azure
---

While working on another blog post today I just discovered a hidden gem in the Windows Azure Emulator. You can now edit projects and files while the emulator is running and view these changes without restarting the Windows Azure emulator. For anyone who does lots of local development for Windows Azure this is a huge time saver. These changes were actually made in SDK 1.3 and refreshed in SDK 1.4.1, but somehow I did not notice them.

To refresh your memory on how inconvenient this used to be here are the steps you would have had to go through to make a minor CSS change and preview it while running in the local emulator.



	
  1. Make your edit

	
  2. Run your application either through debugging (F5) or just by running it (Ctrl+F5).

	
  3. Wait for the Windows Azure emulator to redeploy and start

	
  4. Load your site.

	
  5. Repeat.


In all this process would take 30 seconds to a minute or so depending on the machine you are on. While generally not a huge deal for most work, when you are doing something like testing your CSS design or fine tuning some JavaScript this could become very inconvenient.

With the changes to the local emulator you can now edit static content while debugging your project and simply refresh the browser to see the changes. If you are just running your project (not debugging) you can actually make changes to your code as well. You can rebuild any of your project files and the changes will be immediately available to preview or test in the browser. The only thing you can not do is rebuild your entire solution.

This is a small minor change, but hopefully this helps you save a little time when developing on Windows Azure.
