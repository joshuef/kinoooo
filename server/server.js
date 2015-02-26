console.log( 'ARE WE HERE?' );

/**
 * Config Location
 */
process.env.GETCONFIG_ROOT = __dirname + '/config';

/**
 * Set default node environment
 * @type {string|*}
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var Hapi = require('hapi');
var server = new Hapi.Server();
var good = require('good');
var goodConsole = require('good-console');
var goodFile = require('good-file');
var goodHttp = require('good-http');
var fs = require('fs');
var path = require('path');
var Tv = require('tv');

// var HapiAuthCookie = require('hapi-auth-cookie');

/**
 * Config
  */
var config = require('getconfig');

/**
 * Database
 */
var Database = require('./config/database');

/**
 * Err Function
 * @param err
 */
var error = function(err) {
  if(err) {
    console.warn(err);
    throw err;
  }
};

/**
 * Config for Good
 * @type {{opsInterval: number, reporters: *[]}}
 */
var goodConfig = {
    opsInterval: 1000,
    reporters: [{
        reporter: goodConsole,
        args:[{ log: '*', response: '*' }]
    }, {
        reporter: goodFile,
        args: [__dirname + '/test/awesome_log', { ops: '*' }]
    }, {
        reporter: goodHttp,
        args: [{ error: '*' }, 'http://prod.logs:3000', {
            threshold: 20,
            wreck: {
                headers: { 'x-api-key' : 12345 }
            }
        }]
    }]
};

/**
 * Creating Server connection with our configuration
 */
server.connection(config.server);


// var LocalStrategy = require('passport-local').Strategy;
// server.register( HapiAuthCookie, function (err) {  
//     if (err) {
//         throw err;
//     }

//     // Set our strategy
//     // server.auth.strategy('session', 'cookie', {
//     //     password: 'whoopdiiidoooo', // cookie secret
//     //     cookie: 'session', // Cookie name
//     //     redirectTo: false, // Let's handle our own redirections
//     //     isSecure: false, // required for non-https applications
//     //     ttl: 24* 60 * 60 * 1000 // Set session to 1 day
//     // });

//     // Print some information about the incoming request for debugging purposes
//     // server.ext('onRequest', function (request, next) {
//     //     console.log(request.path, request.query);
//     //     next();
//     // });

//     // server.route(Routes.endpoints);

//     // Start the server
//     // server.start(function() {
//     //     console.log("The server has started on port: " + server.info.port);
//     // });
// });

/**
 * Adding routes
 * TODO: limit these to *Controller files
 */
var normalizedPath = path.join(__dirname, "routes");
fs.readdirSync(normalizedPath).forEach(function(file) {
  server.route(
    require("./routes/" + file)
  );
});


// var passport = require("./config/passport");




/**
 * Adding plugins
 */
server.register(Tv, function (err) {

    if (!err) {
        server.start();
    }
});

// server.register({register: passport }, function(err) {if(err) {console.log(err); }});

// server.register(require('hapi-auth-cookie'), function (err) {

//     server.auth.strategy('session', 'cookie', {
//         password: 'blablablabbalbla',
//         cookie: 'sid-example',
//         redirectTo: '/login',
//         isSecure: false
//     });
// });


server.register({register: require('lout')}, function(err) {if(err) {console.log(err); }});
server.register({
  register: good,
  options: goodConfig
}, function (err) {
  if (err) {error(err)}

  else {
    /**
     * Starting server
     */
    if (!module.parent) {
      server.start(function () {
        console.info('Server started at ' + server.info.uri);
      });
    }
  }
});

module.exports = server;