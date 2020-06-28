# Heroku

$ git add --all
$ git commit -am "made it better"
$ git push heroku master
------
$ heroku apps:create <new app name>
$ heroku login
$ cat > Procfile
web: node bin/www
$ foreman start
$ git init && git add . && git commit -m "fuuuu"
$ heroku create // new app
$ git remote add heroku git@heroku.com:cnflash.git // existing app
$ gith push heroku master
$ heroku ps
$ heroku open
$ heroku logs | sort -n -t\  -k1
$ heroku config
$ heroku config:set NODE_ENV=production