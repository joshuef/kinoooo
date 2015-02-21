// Libs
var Mongoose = require('mongoose');

// Config
var Config = require('getconfig');

//load database
Mongoose.connect(Config.mongo.url);
Mongoose.set('debug', true);
var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;