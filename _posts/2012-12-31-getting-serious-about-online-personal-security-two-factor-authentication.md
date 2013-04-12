---
date: 2012-12-31 10:59:03
layout: post
title: Getting Serious About Online Personal Security - Two-Factor Authentication
categories:
- Notes
---

This is the second post in a series about personal online security. This post is about a security measure called two-factor authentication. Two-factor authentication is about adding a second layer of security to your online accounts and will be described in more detail below. You can find the other parts of the series listed below.



	
  1. [Passwords](/2012/12/29/getting-serious-about-online-personal-security-passwords/)

	
  2. Two-Factor Authentication (this post)

	
  3. Linked Accounts (coming soon)

	
  4. Trusted Devices (coming soon)

	
  5. Mobile Devices (coming soon)

	
  6. Backup (coming soon)




# What is Two-Factor Authentication


Two-factor authentication describes a system that requires users to present two different methods of verification before gaining access to a secured resource. This is generally implemented via a knowledge factor and a possession factor. The knowledge factor is something you are already familiar with and use regularly  This is your username and password. The second factor of authentication  or possession factor, is generally implemented using your mobile phone either through an app that generates a time based pin code or via receiving a text message with a pin code.

By adding this second possession factor of authentication to your account you are making it extremely difficult for somebody to compromise your account even if they have your password. Gaining access to an account with two-factor authentication enabled requires that malicious user have both your password and access to your mobile device.

This may all sound complicated, but it is really quite simple. The authentication process for two-factor authentication can be seen in the diagram below.

[![twofactorauth](/images/2012/12/twofactorauth1.png)](/images/2012/12/twofactorauth1.png)



The beauty of this process is that there are multiple points where a malicious user may be stopped. The bad thing is that it makes it more complicated for you to authenticate. However, most service who have implemented two factor authentication have also added steps to lessen the burden for legitimate users. For example, Google allow you to trust a computer for 30 days so you only have to use the two-factor authentication step once a month on a computer you use every day.


# Real World Example


The diagram above shows how two-factor authentication works in theory. Below I will walk you through the steps for using two-factor authentication on a real account, in this case my Google Account.

The first authentication step is the same for everyone regardless if you are using two-factor authentication or not. You must enter your Google Account username and password.

[![googlepassword](/images/2012/12/googlepassword.png)](/images/2012/12/googlepassword.png)



After you successfully authenticate with your Google username and password you will be prompted for a code.

[![googletwostepauth](/images/2012/12/googletwostepauth.png)](/images/2012/12/googletwostepauth.png)



If you have your phone with you you will either use an app to generate a code or receive a text message. This depends on how you have setup Google two-factor authentication. I will go into more detail below. In my case, I use an app that generates a code. These codes are time-based and are only valid for about 30 seconds.

[![authenticator](/images/2012/12/authenticator.png)](/images/2012/12/authenticator.png)



Next, simply enter the code and click verify. If you are the only user of the computer, you can check the box to remember the computer for 30 days. This way you won't have to perform this verification every time you want to check your Gmail.

[![authcoderemember](/images/2012/12/authcoderemember.png)](/images/2012/12/authcoderemember.png)




# What if you don't have your phone?


The one issue I get asked most about this process is what if you don't have your phone. The short answer is that you won't be able to access your account. As this is making your account secure, this is exactly what you want! However, there might be some emergency situation where you absolutely need to get into your account that is protected by two-factor authentication. Ultimately, each provider will have different options for gaining access to an account without the access code, but it will be possible. It is just usually fairly difficult. For example, Facebook requires you to email them a copy of you holding your drivers license so they can match your face with the information on  your drivers license and Facebook account. Google makes it a bit easier by allowing you to specify a backup phone number to receive a SMS code. For example you could make your wife or parent's phone a backup in case you don't have your phone available.

Either way, it will be difficult to get into your account if you don't have your phone, but you wont be locked out forever. Remember though, this is exactly the point. You want to make it more difficult for someone to gain access to your account.


# Enabling Two-Factor Authentication


Each provide that supports two-factor authentication has different instructions for enabling it. Below you will find links to instructions for some of the most common services that support two-factor authentication or similar security measures.



	
  * [Google](http://support.google.com/accounts/bin/answer.py?hl=en&answer=180744&topic=1099588&ctx=topic)

	
  * [Facebook](https://www.facebook.com/note.php?note_id=10150172618258920)

	
  * [Dropbox](https://www.dropbox.com/help/363/en)

	
  * [Yahoo](http://www.ymailblog.com/blog/2011/12/yahoo-introduces-stronger-user-authentication-%E2%80%93-second-sign-in-verification/)

	
  * [Microsoft](http://windows.microsoft.com/en-US/windows-live/account-security-password-information) (Hotmail, Outlook, Xbox, etc.)

	
  * [PayPal](https://www.paypal.com/us/cgi-bin?cmd=xpt/Marketing_CommandDriven/securitycenter/PayPalSecurityKey-outside&bn_r=o)

	
  * [Amazon Web Services](http://aws.amazon.com/mfa/)

	
  * [DNSimple](http://blog.dnsimple.com/protect-your-dnsimple-account-with-two-factor-authentication-from-authy/)




# Next Steps





	
  1. [Passwords](/2012/12/29/getting-serious-about-online-personal-security-passwords/)

	
  2. Two-Factor Authentication (this post)

	
  3. Linked Accounts (coming soon)

	
  4. Trusted Devices (coming soon)

	
  5. Mobile Devices (coming soon)

	
  6. Backup (coming soon)


