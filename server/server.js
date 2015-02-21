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

/**
 * Adding plugins
 */
server.register(Tv, function (err) {

    if (!err) {
        server.start();
    }
});

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