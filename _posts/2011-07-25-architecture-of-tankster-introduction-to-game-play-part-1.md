---
date: '2011-07-25'
layout: post
title: Architecture of Tankster – Introduction to Game Play (Part 1)
categories:
  - ASP.NET
  - Windows Azure
reirect_from: /2011/07/architecture-of-tankster-introduction-to-game-play-part-1/
---

The game [Tankster](http://www.tankster.net) is a proof-of-concept game that is included in the [Windows Azure Toolkit for Social Games](http://watgames.codeplex.com/). The source code of the game is available to download and use to build your own Windows Azure games. In this series of posts I am going to show you the various components of the Tankster game both from the client side (HTML5) and the server side. This post will cover the high level overview of the architecture of the game as demonstrated by a specific use case, joining a game.

Before we begin with an explanation of the implementation, it is important to know what our goals where for this game. We had three primary goals when building this game.

1. The game must scale to handle several hundred thousand concurrent users.*
2. The architecture must be cost effective.
3. The architecture must be flexible enough for different types of games.

* This is the goal, but there are still some known limitations in the current version that would prevent this. I will be writing more about that later.

In order to meet these three objectives we evaluated a variety of different solutions for each of the components of the game. The resulting architecture is a highly decoupled, event-based system of web roles, worker roles, queues, and blobs.

For reference, I have included the architectural diagram of this use case.

[![image](/images/2011/07/image_thumb5.png)](/images/2011/07/image5.png)

The first step in the join game process involves the user clicking the join game button in the UI.
[![image](/images/2011/07/image_thumb8.png)](/images/2011/07/image8.png)

Clicking this button results in a post being sent to the server. The post looks like this:

POST: /Game/Queue

Request Body:

    gameType=skirmish


Next, the web role adds the message to the game queue. The game queue is a Windows Azure queue that contains messages relating to users requesting to join games. The WCF service code is below. Note, we are using the [WCF Web API](http://wcf.codeplex.com) in this project.

```cs
public HttpResponseMessage Queue(HttpRequestMessage request)
{
  var formContent = GetFormContent(request);
  GameType gameType;

  if (!Enum.TryParse(formContent.gameType.Value, true, out gameType))
  {
    return BadRequest("Invalid gameType parameter");
  }

  try
  {
    // Update userSession blob
    var userSession = new UserSession
    {
        UserId = CurrentUserId,
        ActiveGameQueueId = Guid.Empty
    };

    this.userRepository.AddOrUpdateUserSession(userSession);
    this.gameRepository.AddUserToGameQueue(CurrentUserId, gameType);
  }
  catch (Exception ex)
  {
    return BadRequest(ex.Message);
  }

  return SuccessResponse;
}
```

The response returned from this request does not contain any information. It is simply returned as success or failure. This is because we don't want the request to stay open and wait for processing to occur.

Next, the client immediately begins polling a Windows Azure blob that is unique for that user.

[![image](/images/2011/07/image_thumb7.png)](/images/2011/07/image7.png)

The blob object will initially look like this:

GET: http://tankster.blob.core.windows.net/sessions/<userId>

Response Body:

```js
sessionsCallback(
  {'UserId':'MxAb1iZtey732BGsWsoMcwx3JbklW1xSnsxJX9+KanI='
  ,'ActiveGameQueueId':'00000000-0000-0000-0000-000000000000'
  })
```

Notice that the ActiveGameQueueId is set to all zeros. This is the default value and means the game queue has not yet been created.

On the server side the worker role is reading messages from the game queue. Messages are read one by one until either 5 messages have been read or the timeout (30 seconds) is reached. When the first message is read the game queue blob object is created and the additional messages (users) are added to that game queue (up to 5 or the timeout). When each user is added to a game queue, the value of ActiveGameQueueId in the session blob object is set to the id of the game queue they have been assigned and the session blob is updated.

The client will continue to poll the session container until the ActiveGameQueueId is set. After it is set it will look like this:

GET: http://tankster.blob.core.windows.net/sessions/<userId>?_=<timestamp>

Response Body:

```js
sessionsCallback(
  {'UserId':'MxAb1iZtey732BGsWsoMcwx3JbklW1xSnsxJX9+KanI='
  ,'ActiveGameQueueId':'445a9d20-5705-4f39-878b-cd7bda3db862'
  })
```

Now that the client knows the ActiveGameQueueId it will begin polling that game queues container which now contains a blob object named to the value of ActiveGameQueueId.

Below you will find the value of the game queue object. In this case, two users have been assigned to this queue.

GET: http://tankster.blob.core.windows.net/gamesqueues/<ActiveGameQueueId>?_=<timestamp>

Response Body:

```js
gamesqueuesCallback(
  {'Id':'445a9d20-5705-4f39-878b-cd7bda3db862'
  ,'Status':0
  ,'GameId':'00000000-0000-0000-0000-000000000000'
  ,'CreationTime':'/Date(1311617480095)/'
  ,'Users':[
    {'UserId':'MxAb1iZtey732BGsWsoMcwx3JbklW1xSnsxJX9+KanI='
    ,'UserName':'MxAb1iZtey732BGsWsoMcwx3JbklW1xSnsxJX9+KanI='
    ,'Weapons':[]
    },
    {'UserId':'ZXjeyzvw7WTdP8/Uio4P6cDZ8jmKvCXCDp7JjWolAOY='
    ,'UserName':'ZXjeyzvw7WTdP8/Uio4P6cDZ8jmKvCXCDp7JjWolAOY='
    ,'Weapons':[]
    }]
  })
```

Since we only have two users in the queue the worker role will wait and keep checking for more users. If none arrive after 30 seconds, the game queue is closed and a game blob object is created. After the game is created. The value of GameId is set in the game queue. The client will continue to poll the game queue object until the GameId is set. At which point the client will begin polling the game object.

GET: http://tankster.blob.core.windows.net/games/<gameId>?_=<timestamp>

Response Body:

```js
gamesCallback(
  {'Id':'620f6257-83e6-4fdc-99e3-3109718934a6'
  ,'CreationTime':'/Date(1311617527935)/'
  ,'Seed':1157059416
  ,'Status':0
  ,'Users':[
    {'UserId':'MxAb1iZtey732BGsWsoMcwx3JbklW1xSnsxJX9+KanI='
    ,'UserName':'MxAb1iZtey732BGsWsoMcwx3JbklW1xSnsxJX9+KanI='
    ,'Weapons':[]
    },
    {'UserId':'ZXjeyzvw7WTdP8/Uio4P6cDZ8jmKvCXCDp7JjWolAOY='
    ,'UserName':'ZXjeyzvw7WTdP8/Uio4P6cDZ8jmKvCXCDp7JjWolAOY='
    ,'Weapons':[]
    }]
  ,'ActiveUser':'MxAb1iZtey732BGsWsoMcwx3JbklW1xSnsxJX9+KanI='
  ,'GameRules':[]
  ,'GameActions':[]
  })
```

The client will continually poll the blob object throughout the entire game on a defined interval.

If the value of ActiveUser is equal to the current player then that player is allowed to play their turn. After the user has aimed and fired the values of the shot are sent to the server. The request data is just key value pairs associated with the command. In this case the angle and power of the shot.

POST: http://www.tankster.net/Game/Command/<gameId>

Request Body:


  commandData%5Bid%5D=0&commandData%5Bx%5D=630.4452853164571&commandData%5By%5D=370.93496559564545&commandData%5Bangle%5D=0.7765261071773579&commandData%5Bpower%5D=2.230544159582499&commandData%5Bweapon%5D=missle_sml&type=15


[![image](/images/2011/07/image_thumb9.png)](/images/2011/07/image9.png)

After the server receives the game command it adds the command to the game blob object. Only the last 5 commands issued to the game are stored in the blob to ensure the object doesn't get too big.

Here is what the game blob object looks like after some game play.

```js
gamesCallback(
  {'Id':'089d3af0-5706-4f9f-98e5-2843b36f4eb0'
  ,'CreationTime':'/Date(1311632852746)/'
  ,'Seed':1477684927
  ,'Status':0
  ,'Users':[
    {'UserId':'ZXjeyzvw7WTdP8/Uio4P6cDZ8jmKvCXCDp7JjWolAOY='
    ,'UserName':'ZXjeyzvw7WTdP8/Uio4P6cDZ8jmKvCXCDp7JjWolAOY='
    ,'Weapons':[]
    },
    {'UserId':'MxAb1iZtey732BGsWsoMcwx3JbklW1xSnsxJX9+KanI='
    ,'UserName':'MxAb1iZtey732BGsWsoMcwx3JbklW1xSnsxJX9+KanI='
    ,'Weapons':[]
    }]
  ,'ActiveUser':'ZXjeyzvw7WTdP8/Uio4P6cDZ8jmKvCXCDp7JjWolAOY='
  ,'GameRules':[]
  ,'GameActions':[
    {'Id':'9298c554-3a4b-48a8-b592-3e15480a1927'
    ,'UserId':'MxAb1iZtey732BGsWsoMcwx3JbklW1xSnsxJX9+KanI='
    ,'Type':15
    ,'CommandData':
      {'id':'1'
      ,'x':'838.2676052680835'
      ,'y':'405.42520196384174'
      ,'angle':'1'
      ,'power':'-1.9276202117247642'
      ,'weapon':'missle_sml'
      }
    ,'Timestamp':'/Date(1311633352333)/'
    },
    {'Id':'49d3c053-7fa4-4292-bcc7-441df9342e5f'
    ,'UserId':'MxAb1iZtey732BGsWsoMcwx3JbklW1xSnsxJX9+KanI='
    ,'Type':13
    ,'CommandData':
      {'id':'1'
      ,'damage':'0,0'
      ,'terrain':'292,292,293,...,274,273'
      }
    ,'Timestamp':'/Date(1311633354662)/'
    },
    {'Id':'25b9c0ea-4c37-49ad-b190-4ecdd178493e'
    ,'UserId':'MxAb1iZtey732BGsWsoMcwx3JbklW1xSnsxJX9+KanI='
    ,'Type':2
    ,'CommandData':
      {'id':'1'
      }
    ,'Timestamp':'/Date(1311633356973)/'
    }]
  })
```

When a new command is read by the client the data in the command is used to execute an action in the game. For example, after your opponent fires the command is read by your browser and the values in the command are used to show the animation of your opponent’s shot.

This process repeats over and over until the game is finished. At which point the game is closed, and various tasks like calculating scores, etc. can be completed.

In the next post I will show you how the various parts of this system work in more detail. I haven’t decided how many posts I will do in this series so please let me know what you would like me to write about.

As always, let me know if you have any feedback.

