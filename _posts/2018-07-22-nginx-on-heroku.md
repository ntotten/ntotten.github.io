---
date: 2018-07-22
layout: post
title: Running NGINX on Heroku with Docker
description: Deploy a Docker container running NGINX on Heroku in just a few lines of config.
---

Docker is a great way to manage your NGINX deployments. Heroku is a great place to deploy Docker. While many of the buildpacks on Heroku use NGINX and can be configured to also serve as a reverse proxy, it sometimes is useful to run NGINX on its own.

The setup and config are about as easy as it gets. First, create a Dockerfile as shown below.

```dockerfile
FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
```

The one thing to notice is that I am using `sed` to replace the string `$PORT` in the `nginx.conf` file with the environmental variable `PORT`. This is because Heroku assigns a port to the dyno when it is started and handles the routing. So you can't just set a fixed port like 443 in the config.

Next, create your `nginx.conf` file.

```nginx
server {
    listen $PORT;

    location / {
        proxy_pass         http://example.com;
        proxy_redirect     off;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
    }
}
```

Next, create an app in Heroku and deploy the container by running the following commands.

> Note you need to login to Heroku (`heroku login` and to the container service (`heroku container:login`) through the CLI before you run the next commands.

```bash
docker build -t web .
heroku container:push web --app <APPNAME>
heroku container:release web --app <APPNAME>
```

And that's it, you now have NGINX deployed as a Docker container on Heroku.
