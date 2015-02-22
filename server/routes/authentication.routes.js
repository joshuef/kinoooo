'use strict';
// var authController = require("../controllers/auth");
// var Mongoose = require('mongoose');
var User = require( "../models/user.model");
// var userRoot = '/api/';
var Joi  = require('joi');
var passport = require("hapi-passport");
var passportConfig = require("../config/passport");
// var Mongoose = require('mongoose');

var LocalStrategy = require('passport-local').Strategy;
// var authenticator = require('../lib/authenticator');
// var User = require('mongoose').model('User');


// var FacebookStrategy = require("passport-facebook"),
var localLogin = require("hapi-passport")(new LocalStrategy());



// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// // module.exports = null;
module.exports = [
{
    method: 'POST',
    path: '/api/login',
    config: {
         validate: {
            payload: {
                email: Joi.string().email().required(),
                password: Joi.string().required()
            }
        },
        handler: localLogin({})
    }
},
{
    method: 'GET',
    path: '/api/logout',
    config: {
        validate: {
            // payload:
            // {
            //     firstName: Joi.string().max(40).min(2).alphanum()
            //     // firstName: Joi.int()
            // }
        },

        // auth: 'session',
        handler: function (request, reply) 
        {
            // request.auth.session.clear();
            // reply().redirect('/');
        }
    
    }
},
// {
//     method: 'GET',
//     path: userRoot + '/{id}',
//     config: {
//         handler: function(req, reply)
//         {
//             return UserModel.findById(req.params.id, function (err, user_data) {
//                 if (!err) {

//                     console.log( 'IDDDD',req.params.id );
//                     console.log( user_data );
//                   reply('user_edit', {
//                     title: 'user data',
//                     user: user_data
//                 });
//               } else {
//                   return console.log(err);
//               }
//           });

//             reply('user_edit', {
//                 title: 'user data'
//             });

//         }
//     }
// },


// },
// {
//     method: 'POST',
//     path: '/api/auth',
//     config: authController.signIn
// },
// {
//     method: ['PUT', 'POST', 'GET', 'DELETE' ],
//     path: '/api/signout',
//     config: authController.signOut
// },
// {
//     method: 'POST',
//     path: '/api/signup',
//     config: authController.createUser
];

// 
