---
date: 2011-11-16 18:09:51
layout: post
title: Windows Azure Toolkit for Social Games Version 1.1
categories:
- Windows Azure
---

I am happy to report that we have updated the [Windows Azure Toolkit for Social Games](http://go.microsoft.com/fwlink/p/?LinkID=234210) to version 1.1. You can download the release [here](http://go.microsoft.com/fwlink/p/?LinkID=234062). This version is a significant step forward and enables developers to more easily and quickly build out their social games on the Windows Azure Platform.

The biggest change we have made in this release is to separate the core toolkit from the [Tankster](http://www.tankster.net) game. After we released the Tankster sample game we received a lot of feedback asking for a simpler game that developers could use to learn. To meet this need we developed two simple games, Tic-Tac-Toe and Four in a Row, and included in the toolkit. The Tankster game is now available separately as a sample built on top of the toolkit.

Below you can see the sample Tic-Tac-Toe game.
[![SNAGHTML377dc3c](/images/2011/11/snaghtml377dc3c_thumb1.png)](/images/2011/11/snaghtml377dc3c1.png)

While the new games included in the toolkit are much simpler than Tankster, they still show the same core concepts. You can easily use these samples as a starting point to build out any number of types of games. Additionally, you will find that many of the core components of the game such as the leaderboard services, game command services can be used without any modification to the server side or client side code.

The features included in the new version of the Windows Azure Toolkit for Social Gaming are listed below.

* Sample Games: Tic-Tac-Toe and Four in a Row
* Game Invitations
* Leaderboards
* Game Friends
* User Profile
* Tests for both server and client code
* Reusable JavaScript libraries

In order to make the toolkit easy to setup and start using we have included our improved dependency checker and setup scripts. When you run the default setup you simply have to open the toolkit solution and run it. Everything is preconfigured to run on your local developer machine. You can read the full instructions for the setup [here](http://go.microsoft.com/fwlink/p/?LinkID=223729).[![dependancy-checker](/images/2011/11/dependancy-checker_thumb.png)](/images/2011/11/dependancy-checker.png)
_Windows Azure Toolkit for Social Games dependency checker._

In addition to running the toolkit locally you can also use the setup tools to configuration the toolkit for deployment to Windows Azure. You can read the full instructions for deploying the toolkit [here](http://go.microsoft.com/fwlink/p/?LinkID=234206). Publishing the toolkit is even easier than before with the updated Windows Azure Tools and SDK Version 1.6. You can see the updated publish dialog below.
[![SNAGHTML3814174](/images/2011/11/snaghtml3814174_thumb.png)](/images/2011/11/snaghtml3814174.png)
_Windows Azure Publish Dialog_

As I mentioned previously, the Tankster game is still available for download as a sample. We will continue to update and release future versions of the Tankster game. For now, you can download Version 1.0 of Tankster [here](http://go.microsoft.com/fwlink/p/?LinkID=234063).

[![tankster-game-play](/images/2011/11/tankster-game-play_thumb.png)](/images/2011/11/tankster-game-play.png)

Finally, if you want to see the toolkit in action you can access it at [http://watgames4.cloudapp.net/](http://watgames4.cloudapp.net/). Feel free to login and play a couple games of Tic-Tac-Toe or Four in a Row. If you use multiple browsers you can even challenge yourself to a game!

As always, please let me know if you have any comments or feedback.
