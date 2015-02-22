var LocalStrategy = require('passport-local').Strategy;
// var authenticator = require('../lib/authenticator');
// var User = require('mongoose').model('User');
var passport = require("hapi-passport");

// var FacebookStrategy = require("passport-facebook"),
var localLogin = passport(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
    }
));

// server.routes({
//     method: "GET", path: "/login/facebook", handler: localLogin({
//         onSuccess: function (info, request, reply) {
//             // maybe do a redirect?
//         },
//         onFailed: function (warning, request, reply) {
//             // maybe show an error?
//         },
//         onError: function (error, request, reply) {
//             // tell the world that you are angry.
//         }
//     })
// });



var passportLocalMongoose = require('passport-local-mongoose');
var User = require( "../models/user.model");

passport.use(User.createStrategy());

userSchema.plugin(passportLocalMongoose, {
    usernameField : 'email',
    usernameUnique : true
});
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// var serialize = function (user, done) {
//   done(null, user._id);
// };

// var deserialize = function (id, done) {
//   User.findById(id, done);
// };

module.exports = function (passport, config) {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use(new LocalStrategy(authenticator.localUser));
};
