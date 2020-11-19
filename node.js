/////////////
// MODULES //
/////////////

// NATIVE MODULES //
// url URL resolution and parsing
  parse(urlStr); format(urlObj); resolve(from, to);
// path handling and transforming file paths.
  path.resolve(__dirname, 'public')
// util various utilities including format (format input like console.log), inspect (Return a string representation of object, which is useful for debugging.)
// assert unit testing
  assert(value, message) //same as assert.ok()
  assert.equal(actual, expected, [message])/* == */; assert.strictEqual()/* === */; assert.notEqual()/* != */;
// readline allows reading of a stream (such as process.stdin) on a line-by-line basis.

// OTHER MODULES //
// 
// DEBUGGING
// 
// node-inspector debugging
// debug debugging
// 
// TESTING
// 
// nodeunit testing
// tap Unit testing
// 
// SECURITY
// 
// xss-filters Secure XSS Filters - Just sufficient output filtering to prevent XSS!
// helmet Secure apps with HTTP headers
// 
// MODIFYING/ALTERING TEXT/HTML
// 
// downsize Tag-safe truncation for HTML and XML.
  downsize("<p>some markup here...</p>",{"words": 2}); //<p>some markup</p>
  downsize("<p>some markup here...</p>",{"characters": 6, "append": "..."}); //<p>some m...</p>
// 
// UTILITIES
// 
// fs-extra methods that aren't included in the vanilla Node.js fs package. Such as mkdir -p, cp -r, and rm -rf.
// split split a Text Stream into a Line Stream
  fs.createReadStream(file)
    .pipe(split())
    .on('data', function (line) {
      //each chunk now is a seperate line!
    })
// validator String validation and sanitization
  isEmail(); isUrl(); isInt(); toString(); toInt(); //...etc
// findit walk a directory tree recursively with events
// async functions for working with asyncronous js
// catw Concatenate file globs, watching for changes. This module is just like the `cat` command, but with watching!
#!/usr/bin/env node
var catw = require('catw');
var fs = require('fs');
catw('*.txt', function (stream) {
    var w = stream.pipe(fs.createWriteStream('/tmp/bundle.txt'));
    w.on('close', function () { console.log('wrote to /tmp/bundle.txt') });
});
// 
// DATE/TIME
// 
// moment Parse, manipulate, and display dates.
// 
// DATABASE
// 
// redis the best? redis client
// 
// MISC
// 
// connect-slashes Trailing slash redirect middleware for Connect and Express.js
// node-polyglot L18N
// nodemailer e-mail sending

// Module examples //

// Tiny CLI with Readline (NATIVE)
// Also see: Chatroom with Readline & Socket.io http://code.tutsplus.com/tutorials/real-time-chat-with-nodejs-readline-socketio--cms-20953
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('OHAI> ');
rl.prompt();
rl.on('line', function(line) {
  switch(line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log('Say what? I might have heard `' + line.trim() + '`');
      break;
  }
  rl.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});

// async
async.map(['file1','file2','file3'], fs.stat, function(err, results){
    // results is now an array of stats for each file
});
async.filter(['file1','file2','file3'], fs.exists, function(results){
    // results now equals an array of the existing files
});
async.parallel([
    function(){ /*...*/ },
    function(){ /*...*/ }
], callback);
async.series([
    function(){ /*...*/ },
    function(){ /*...*/ }
]);

// Creating modules //

// `exports` can be assigned string, properties, and methods
exports.cnyToUs = function(cny){ return cny * this.cny }
exports.us = 1;
exports.cny = 6.14;

// but `exports` cannot be reassigned later. If you want the root of your
// module's export to be a function (such as a constructor) or if you want to
// export a complete object in one assignment instead of building it one
// property at a time, assign it to 'module.exports' instead.
module.exports = function(width) {
  return {
    area: function() {
      return width * width;
    }
  };
}

// 1. Export a namespace
var fs = exports;
fs.readFile = function(path, options, callback_) {
  // ...
};
fs.ReadStream = ReadStream;
function ReadStream(path, options) {
  // ...
}
ReadStream.prototype.open = function() {
  // ...
}
//A common use of exporting a namespace is to export the root of another
//module so that one require statement gives the caller access to a number of
//other modules. At Good Eggs, we implement each of our domain models in a
//separate module that exports the model constructor (see Exports a
//Constructor below) and then have an index file in the directory where the
//models live that exports all of the models. This allows us to pull in our
//models under a models namespace.
var models = require('./models'),
    User = models.User,
    Product = models.Product;
//index.js might look like:
exports.User = require('./user');
exports.Person = require('./person');
//Or use a small library that requires all sibling files and exports their modules with CamelCase names so the index.js file in our models directory actually reads:
module.exports = require('../lib/require_siblings')(__filename);

// 2. Export a function
// To export a function, you must assign your function to module.exports.
exports = module.exports = createApplication;
exports.version = '3.1.1' //You can export namespaces here too
function createApplication () { /* ... */ }
//When exporting a function, it is good practice to name the function so that
//it will show up in stack traces.
// bomb1.js (good)
module.exports = function () {
  throw new Error('boom');
};
// bomb2.js (better)
module.exports = function bomb() {
  throw new Error('boom');
};

// 3. Export a Higher Order Function
// Exporting a higher order function is a useful pattern when you want to
// return a function from your module but need to take input that controls the
// behavior of that function.
// ie a customizeable logger middleware
var logger = require('./logger')
app.use(logger(':method :url'))
//logger.js middleware:
function setup(format){
  var regexp = /:(\w+)/g;
  return function logger(req, res, next) {
    var str = format.replace(regexp, function(match, property){
      return req[property];
    });
    console.log(str);
    next();
  }
}
module.exports = setup;
// Another example, here's the connect query middleware used internally by Express 
// to parse query string parameters into a an object available as req.query.
var connect = require('connect'), query = require('connect/lib/middleware/query');
var app = connect();
app.use(query({maxKeys: 100}));
// The query source looks like:
var qs = require('qs'), parse = require('../utils').parseUrl;
module.exports = function query(options){
  return function query(req, res, next){
    if (!req.query) {
      req.query = ~req.url.indexOf('?')
        ? qs.parse(parse(req).query, options)
        : {};
    }
    next();
  };
};

// 4. Export a constructor
module.exports = User;
function User(obj) {
  for (var key in obj) {
    this[key] = obj[key];
  }
}
User.prototype.save = function(fn){ /* ... */ }
User.prototype.update = function(fn){ /* ... */ }
User.prototype.hashPassword = function(fn){ /* ... */ }
User.getByName = function(name, fn){ /* ... */ }
User.getId = function(name, fn){ /* ... */ }
User.get = function(id, fn){ /* ... */ }
User.authenticate = function(name, pass, fn){ /* ... */ }

// 5. Export a Singleton
// 6. Extend the global object
// 7. Apply a Monkey Patch
// http://bites.goodeggs.com/posts/export-this/ 

/////////////////////
// ERROR HANDLING  //
/////////////////////

// Error = instance of Error class
var err = new Error("Something went wrong");
// Exception = throw error
throw new Error("Foo");

// Ways to handle errors:
// 1 throw the error (making it an exception). This is rare in node because it is syncronous.
// 2 pass the error to a callback, a function provided specifically for handling errors and the results of asynchronous operations
// 3 emit an "error" event on an EventEmitter

// If disconnecting clients is a frequently problem because a server crashes
// so often, you should focus on the bugs that cause the service to crash —
// and make those exceptional — rather than trying to avoid crashing in cases
// where the code is obviously wrong. The best way to debug these problems is
// to configure Node to dump core on an uncaught exception.

// Use the assert module, ie to strictly accept arguments
function connect(ip4addr, tcpPort, timeout, callback) {
  assert.equal(typeof (ip4addr), 'string',
      "argument 'ip4addr' must be a string");
  assert.ok(net.isIPv4(ip4addr),
      "argument 'ip4addr' must be a valid IPv4 address");
  assert.equal(typeof (tcpPort), 'number',
      "argument 'tcpPort' must be a number");
  assert.ok(!isNaN(tcpPort) && tcpPort > 0 && tcpPort < 65536,
      "argument 'tcpPort' must be a positive integer between 1 and 65535");
  assert.equal(typeof (timeout), 'number',
      "argument 'timeout' must be a number");
  assert.ok(!isNaN(timeout) && timeout > 0,
      "argument 'timeout' must be a positive integer");
  assert.equal(typeof (callback), 'function');
  /* do work */
}

////////////
// EVENTS //
////////////

//Error handling (Node In Action p54)
var events = require('events');
var myEmitter = new events.EventEmitter();
myEmitter.on('error',function(err){
  console.log(err.name + ': ' + err.message);
});
myEmitter.emit('error', new Error('Something is wrong.'));

//Pub/sub (Node In Action p52)
//the listeners method returns an array of listeners for a given event type
var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
channel.on('join', function(id, client) {
  var welcome = "Welcome!\n" + 'Guestsonline:'+ this.listeners('broadcast').length;
  client.write(welcome + "\n");
});
//Increase the maximum number of listeners
channel.setMaxListeners(50);

//Extending event emitter (Node In Action p55)
function Watcher(watchDir, processedDir){
  this.watchDir = watchDir;
  this.processedDir = processedDir;
}
var events = require ('events'),
    util = require('util');
util.inherits(Watcher, events.EventEmitter); // JS equivalent: Watcher.prototype = new events.EventEmitter();

// Using closures to better define scope behavior (Node In Action p57)
function asyncFunction(callback){
  setTimeout(callback,200);
}
var color = 'blue';
(function(color){
  asyncFunction(function(){
    console.log('Thecoloris' + color);
  })
})(color);
color = 'green';

/////////////
// Streams //
/////////////

// Stream Handbook https://github.com/substack/stream-handbook
// Luckily both of the (req, res) arguments are streams, which means we can write this in a much better way using fs.createReadStream() instead of fs.readFile():
var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(res);
});
server.listen(8000);
//Using the oppressor module to compress the file
var http = require('http');
var fs = require('fs');
var oppressor = require('oppressor');
var server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(oppressor(req)).pipe(res);
});
server.listen(8000);

// HTML Streams: https://github.com/substack/stream-handbook#html-streams-for-the-browser-and-the-server

// Transform (Duplex) Streams //
// http://nicolashery.com/parse-data-files-using-nodejs-streams/
var Transform = require('stream').Transform;
var parser = new Transform();
parser._transform = function(data, encoding, done) {
  this.push(data);
  done();
};
// Pipe the streams
process.stdin
.pipe(parser)
.pipe(process.stdout);
// Some programs like `head` send an error on stdout
// when they don't want any more data
process.stdout.on('error', process.exit);
// Run program in terminal:
// $ cat filename.txt | node parser.js

/////////////
// TESTING //
/////////////

// Change the NODE_ENV to "test"

// Node's native debugging http://nodejs.org/api/debugger.html

// SuperTest is an integration testing framework that will allow us to easily
// write tests against a RESTful HTTP server.

//////////
// MISC //
//////////

// Kill node process
// $ ps aux | grep node
// $ kill - 9 < PID >

// since require() can read and parse JSON files automatically, you can
// leverage it to easily introspect package.json. (HOWEVER this is syncronous & blocking!)
// considering the module lives in lib/module.js:
exports.version = require('../package').version;

// If you want to access package.json for other modules, you can do it like this:
require('my-module/package').name

// Serial vs Parallel flow (Node in Action p58)
// If you have a series of events that require sequential events (one event before another), consider implementing an event flow that uses next() callbacks
var tasks = [checkForRSSFile,readRSSFile,downloadRSSFeed,parseRSSFeed];
function next(err, result) {
  if(err) throw err;
  var currentTask = tasks.shift();
  if(currentTask){
    currentTask(result);
  }
}
next();

// Setting config/env vars
// 1. from a source file
// .env:
//   export EXPRESS_SECRET=pumpkinpie
//   export FACEBOOK_APP_ID=1483248941914120
//   export FACEBOOK_APP_SECRET=0f6d91743f73eb2308f190638e8cda89
// then execute it to set:
//   $ source .env
// 2. COnfig module
// .conf.js:
module.exports = function Configuration () {
  switch(process.env.NODE_ENV){
        case 'development':
            return {dev: settings};
        case 'production':
            return {prod: settings};
  }
}
// Then in the app file:
var Config = require('./conf'),
    conf = new Config();

///////////////////
// ASYNCRONICITY //
///////////////////

// Async functions
// Conflate the input with the output
// Dont work with control flow primitives
// But they can handle errors:
function readJSON(filename, callback){
  fs.readFile(filename, 'utf8', function (err, res){
    if (err) return callback(err)
    try {
      res = JSON.parse(res)
    } catch (ex) {
      return callback(ex)
    }
    callback(null, res)
  })
}

// Dont release zalgo
var after = false;
callbackTaker(function() {
  assert(after === true);
});
after = true;
// ...
function zalgoContainer(cbTaker, cb) {
  var sync = true;
  cbTaker(cbWrap);
  sync = false;
  function cbWrap(er, data) {
    if (sync)
      process.nextTick(function() { // process.nextTic makes it syncronous
        cb(er, data);
      });
    else
      cb(er, data);
  }
}

// See Nimble, Step, and Seq for modules to control flow



/////////////
// Express //
/////////////

// Access to request values via
// ?name=tobi
req.param('name')
req.query.name
// POST name=tobi
req.param('name')
// /user/tobi for /user/:name 
req.param('name')

// Configure express.response
var obj = {foo:"bar"}
express.response.wrap_json = function(obj) {
  this.json(wrap(obj));
};
//so you can now call
res.wrap_json(obj);

//Or you could replace express json implementation with yours
var original = express.response.json;
express.response.json = function(obj) {
  original.call(this, wrap(obj));
};
//I would only use the last one if you want to override all json calls.
