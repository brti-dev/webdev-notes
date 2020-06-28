# Express

Quickstart:
    1. $ express [options] [dir]
    2. [install modules, include the --save and --save-dev option to update package.json]
    3. $ npm install

Config options
 - 'env' The environment the app is running on.
    - set by NODE_ENV
    - to set the system's environment: $ echo export NODE_ENV=production >> ~/.bash_profile
    - to temporarily set the environment: $ NODE_ENV=production node app
 - 'trust proxy' Enables reverse proxy.
 - 'jsonp callback name' Callback name for JSONP requests.
 - 'json replacer' The JSON replacer callback.
 - 'json spaces' The amount of space for indenting JSON responses.
 - 'case sensitive routing' Makes route names case-sensitive.
 - 'strict routing' Trailing slash at the end of a route name should be treated as separate from that without.
 - 'view cache' Cache views. Enabled in production by default.
 - 'view engine' The engine for processing view files.
 - 'views' The directory of view files.

## Middleware

Handle HTTP requests
Manipulate req and res
functions that accept three arguments: req, res, next
Middlewares:
 - router The app's routing system
 - logger Log requests to the server
 - compress gzip/deflate support on the server
 - basicAuth Basic HTTP authentication
 - json Parse application/json
 - urlencoded Parse application/x-www-formurlencoded
 - multipart Parse multipart/form-data
 - bodyParser Parse request body. Bundles json, urlencoded, and multipart middlewares together
 - timeout Request timeout
 - cookieParser Cookie parser
 - session Session support
 - cookieSession Cookie-based sessions
 - methodOverride HTTP method support
 - responseTime Show server response time
 - static Static assets directory for the website
 - staticCache Cache for the static middleware
 - directory Directory listing
 - vhost Enable vhost
 - favicon Favicon for the website
 - limit Limit the size of request body
 - query The GET query parser
 - errorHandler Generate HTML-formatted stack trace of errors in the server
* focus on small and configurable pieces when building your middleware. Build lots of tiny, modular, and reusable middleware components that collectively make up your application. Keeping your middleware small and focused really helps break down complicated application logic into smaller pieces.