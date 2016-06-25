---
date: '2012-03-20'
layout: post
title: 'Facebook C# SDK Accepted as Outercurve Foundation Project'
categories:
  - Facebook
reirect_from: /2012/03/facebook-c-sdk-accepted-as-outercurve-foundation-project/
---

We have some exciting news today regarding the Facebook C# SDK. Today [The Outercurve Foundation](http://outercurve.org) has [announced ](http://www.outercurve.org/News/articleType/ArticleView/articleId/54/Outercurve-Foundation-Accepts-Facebook-C-SDK-Project)that the Facebook C# SDK has been accepted to the foundation as part of the[ Data, Language and Systems Interoperability (DLSI) Gallery](http://www.outercurve.org/Galleries/DataLanguagesandSystemsInteroperability). This is an important milestone for the Facebook C# SDK as it even further solidifies the project's place in the Facebook and .Net ecosystem.

For those who have been following the Facebook C# SDK recently, you may have noticed some other big changes as well. In addition to moving the project to [Github](https://github.com/facebook-csharp-sdk), we have also completely rewritten our [documentation](http://facebooksdk.net). You can find the new documentation on our project's website at [http://facebooksdk.net](http://facebooksdk.net). You can find the full source of the SDK at [http://github.com/facebook-csharp-sdk](https://github.com/facebook-csharp-sdk).

Additionally, we also just released another big update to the SDK with version 6.0.10. Version 6 has been primarily about cleaning up and simplifying the API for the SDK. While there are a few breaking changes in V6, we think you will find this version of the SDK to be much easier to work with. You can get started with V6 of the Facebook C# SDK by installing the [Facebook Nuget package](http://nuget.org/packages/Facebook).

The next change we have made is fairly minor, but important. We are now formally following [SemVer.org](http://semver.org) versioning with the project. This should make it easier for developers to understand the impacts of new versions of the SDK. With this change any breaking changes will result it a major version number change, however with Facebook's APIs becoming much more stable we hope to avoid breaking changes as much as possible.

The final bit of news regarding the Facebook C# SDK is that we also have released a few libraries that were build as part of the SDK as seperate projects. These libraries are [HttpHelper](https://github.com/facebook-csharp-sdk/http-helper), [SimpleJson](https://github.com/facebook-csharp-sdk/simple-json), and [ReflectionUtils](https://github.com/facebook-csharp-sdk/reflection-utils). These libraries simpilify the process of building cross-platform .Net/Windows libraries by abstracting some of the differences with HTTP requests and reflection in the platforms. SimpleJson is exactly what it sounds like and is a very simple JSON serializer. For more information on these libraries and how they fit into the Facebook C# SDK read Prabir's post [here](http://blog.prabir.me/post/Facebook-CSharp-SDK-Outercurve-Foundation-and-v6-RTW.aspx).

Lots of great changes recently with the Facebook C# SDK. We are excited and honored to be a part of The Outercurve Foundation. We look forward to continually improving the Facbeook C# SDK and working with the community to give .Net and Windows developers the best tools for developing Facebook apps.

As always let me know if you have any questions or feedback.

