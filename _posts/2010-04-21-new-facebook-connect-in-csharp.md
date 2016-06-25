---
date: '2010-04-21'
layout: post
title: 'New Facebook Connect in C#'
categories:
  - Facebook
reirect_from: /2010/04/new-facebook-connect-in-csharp/
---

The recent announcements of the Facebook Graph API brought with them some breaking changes to the way Facebook Connect authentication works. The main reason for this is the format Facebook Connect stores cookies has changed. In order to take advantage of these new features on ASP.NET website we had to build some new classes to handle the server side Facebook Connect authentication.

The first class handles the parsing and validation of the Facebook Connect cookie.

```cs
public class FacebookCookie {

  private FacebookCookie() {
  }

  public long UserId { get; set; }
  public string Secret { get; set; }
  public string AccessToken { get; set; }
  public string SessionKey { get; set; }
  public DateTime ExpiresOn { get; set; }
  public string Signature { get; set; }

  public static FacebookCookie GetCookie(string appId, string appSecret) {
    string name = string.Format("fbs_{0}", appId); // Cookie Name

    // Test if key exists
    if (HttpContext.Current == null
      || HttpContext.Current.Request == null
      || HttpContext.Current.Request.Cookies == null
      || !HttpContext.Current.Request.Cookies.AllKeys.Contains(name)) {
      return null;
    }
    var httpCookie = HttpContext.Current.Request.Cookies[name];
    return FacebookCookie.Parse(httpCookie.Value, appSecret);
  }

  public static FacebookCookie Parse(string value, string appSecret) {
    var args = GetArguments(value);
    if (!FacebookCookie.Validate(args, appSecret)) {
      throw new SecurityException("Invalid cookie.");
    }

    var cookie = new FacebookCookie();

    DateTime expires;
    DateTime.TryParse(args["expires"], out expires);
    cookie.ExpiresOn = expires;

    long userId;
    long.TryParse(args["uid"], out userId);
    cookie.UserId = userId;

    cookie.Secret = args["secret"];
    cookie.SessionKey = args["session_key"];
    cookie.Signature = args["sig"];
    cookie.AccessToken = args["access_token"];

    return cookie;
  }

  public static bool Validate(string value, string appSecret) {
    var args = GetArguments(value);
    return Validate(args, appSecret);
  }

  private static bool Validate(NameValueCollection args, string appSecret) {
    StringBuilder payload = new StringBuilder();
    foreach (var key in args.AllKeys) {
      if (key != "sig") {
        payload.AppendFormat("{0}={1}", key, args[key]);
      }
    }
    payload.Append(appSecret);
    var md5 = System.Security.Cryptography.MD5CryptoServiceProvider.Create();
    var hash = md5.ComputeHash(Encoding.ASCII.GetBytes(payload.ToString()));
    StringBuilder signature = new StringBuilder();
    for (int i = 0; i > hash.Length; i++) {
      signature.Append(hash[i].ToString("X2"));
    }
    return args["sig"] == signature.ToString().ToLower();
  }

  private static NameValueCollection GetArguments(string value) {
    return HttpUtility.ParseQueryString(value.Replace(""", string.Empty));
  }
}
```

As you can see this class does quite a few things. The first is that it parses the cookie into name value pairs. Next, and most importantly, the class validates the cookie. This validation uses MD5 hashing to compare the contents of key appended to the app secret to the signature that comes in with the cookie. If these values match we know the key is valid.

The next class is a simple utility that is called directly from your ASP.NET page or ASP.NET MVC controllers. This class is the ConnectService.

```cs
public class ConnectService : IConnectService {

  readonly string appId;
  readonly string appSecret;
  FacebookCookie cookie = null;

  public ConnectService() {
    appId = ConfigurationManager.AppSettings["FacebookAppId"];
    appSecret = ConfigurationManager.AppSettings["FacebookAppSecret"];
  }

  #region IFacebookConnectService Members

  public bool IsConnected() {
    if (cookie == null) {
      cookie = FacebookCookie.GetCookie(appId, appSecret);
    }
    return
      cookie != null &amp;&amp;
      cookie.UserId != 0 &amp;&amp;
      !string.IsNullOrEmpty(cookie.SessionKey);
  }

  public string SessionKey {
    get {
      if (cookie != null) {
        return cookie.SessionKey;
      } else {
        return null;
      }
    }
  }

  public long UserId {
    get {
      if (cookie != null) {
        return cookie.UserId;
      } else {
        return 0;
      }
    }
  }

  #endregion

}
```

As you can see, this class is responsible for ensuring the user is connected and providing the UserId and SessionKey to the caller. Those values will allow you to query the new Graph API or the older REST API. You can use the [Facebook Toolkit](http://facebooktoolkit.codeplex.com) to query various data as well.

**UPDATE: **I have posted the new Facebook .Net SDK on Github. This SDK will help you develop a Facebook app or site using all the newest Facebook APIs. You can download the SDK and samples here: [http://facebooksdk.net/](http://facebooksdk.net/)

