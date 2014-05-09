---
date: 2014-05-09
layout: post
title: Sublime Text Setup Script
description: A simple powershell script to automate my Sublime Text config.
---

One thing that I find odd about the default Sublime Text install on Windows is that you don't get the option to add subl to the path. On OS X this happens automagically. I wrote a simple script that I use on every new Windows machine to setup sublime the way I like. In addition to adding subl to the path, this also copies my sublime settings. Pretty simple script, but I find it useful.

```
# Make link to subl and add to path
cmd /c mklink "C:\Program Files\Sublime Text 3\subl.exe" "C:\Program Files\Sublime Text 3\sublime_text.exe"
$wsh = new-object -com wscript.shell
$path = $wsh.Environment("System").Item("Path")
$subl = ";C:\Program Files\Sublime Text 3\";
If ($path.Contains($subl)) {
    echo "Sublime Text already in PATH";
} Else {
    $path += ";C:\Program Files\Sublime Text 3\"
    $wsh.Environment("System").Item("Path") = $path

    echo "Added subl.exe to path";
}

# Save Sublime Settings
Copy-Item Preferences.sublime-settings "$Env:USERPROFILE\AppData\Roaming\Sublime Text 3\Packages\User"
Copy-Item XML.sublime-settings "$Env:USERPROFILE\AppData\Roaming\Sublime Text 3\Packages\User"
echo "Add Sublime Settings";
```