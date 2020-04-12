---
date: 2020-02-26
layout: post
title: Securing a PHP app behind Cloudflare Access with JWT Verification
description: Learn how to migrate from legacy authentication to modern and secure Cloudflare Access.
---

I recently was working on a simple PHP utility that was secured with an `.htaccess` file using a single username and password that was shared by multiple people. This leaves a lot to be desired in terms of security and maintainability.

I am a huge fan of Cloudflare and their [Cloudflare Access](https://developers.cloudflare.com/access/about/how-access-works/) product was a perfect fit to move this application to modern authentication. To secure your app with Cloudflare Access you should both restrict access to only [Cloudflare's IPs](https://www.cloudflare.com/ips/) and most importantly [verify the JWT](https://developers.cloudflare.com/access/setting-up-access/validate-jwt-tokens/) that is sent by Cloudflare.

To verify the token, I am using the [Auth0-PHP](https://github.com/auth0/auth0-PHP) library. The library is mostly just a wrapper around [lcobucci/jwt](https://github.com/lcobucci/jwt), but I found the interface to be much simpler to use. We will also use Guzzel for HTTP requests and a simple utility to convert certificates.

To install the dependancies:

```txt
$ composer require auth0/auth0-php
$ composer require codercat/jwk-to-pem
$ composer require guzzlehttp/guzzle:~6.0
```

Next, add the following code to your application.

```php
<?php
use Auth0\SDK\Helpers\Tokens\AsymmetricVerifier;
use Auth0\SDK\Helpers\Tokens\IdTokenVerifier;
use CoderCat\JWKToPEM\JWKConverter;

$issuer = getenv('CLOUDFLARE_ACCESS_ISSUER');
$aud = getenv('CLOUDFLARE_ACCESS_AUD');

$cfAuth = $_COOKIE['CF_Authorization'] ?? '';

if (empty($cfAuth)) {
  header('HTTP/1.0 403 Forbidden');
  exit();
}

function getKey($jwksUrl)
{
  $client = new GuzzleHttp\Client();
  $res = $client->request('GET', $jwksUrl);

  if ($res->getStatusCode() != '200') {
    throw new \Exception('Could not fetch JWKS');
  }

  $json = $res->getBody();
  $jwks = json_decode($json);
  $key_id = $jwks->keys[0]->kid;

  $jwkConverter = new JWKConverter();
  $key = $jwkConverter->toPEM((array) $jwks->keys[0]);
  return [$key_id => $key];
}

try {
  $id_token = rawurldecode($cfAuth);
  $key = getKey($issuer . '/cdn-cgi/access/certs');
  $signature_verifier = new AsymmetricVerifier($key);
  $token_verifier = new IdTokenVerifier($issuer, $aud, $signature_verifier);
  $user_identity = $token_verifier->verify($id_token);
  // Do something with identity if you need
  // i.e. store it in session, etc.
} catch (\Exception $e) {
  header('HTTP/1.0 403 Forbidden');
  exit();
}
```

You will need to get the environmental variables as follows.

The `CLOUDFLARE_ACCESS_ISSUER` is just your cloudflare Access domain `https://<account>.cloudflareaccess.com`.

The `CLOUDFLARE_ACCESS_AUD` can be found on the Cloudflare dashboard when creating an access policy, it is called `Audience Tag` in the dashboard.

Set those environmental variables and everything should be good. If you need to access the account details you can get the `sub` and `email` claims from the `$user_identity` object returned when you verify the token.

That's it, your app is now secured with modern identity that can be setup with single-sign-on.
