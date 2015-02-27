'use strict';
// var authController = require("../controllers/auth");
// var Mongoose = require('mongoose');
var User = require( "../models/user.model");

// console.log( User );
// var userRoot = '/api/';
var Joi  = require('joi');
// var passport = require('hapi-passport');

// // module.exports = null;
module.exports = [
{
    method: 'POST',
    path: '/api/login',
    config: {
        //  auth: {
        //     mode: 'try',
        //     strategy: 'session'
        // },
        // plugins: {
        //     'hapi-auth-cookie': {
        //         redirectTo: false
        //     }
        // },
        validate: {
            payload: {
                email: Joi.string().email().required(),
                password: Joi.string().required()
            }
        },
        // handler: passport.authenticate('local')
        handler: function( request, reply )
        {
                var email = request.payload.email;
                var password = request.payload.password;

                console.log( 'email', email, password );
                // console.log( User.authenticate( email ) );
                User.findOne( { email: email }, function( err, user, passerror )
                {
                    if( err )
                    {
                        throw err;
                    } 

                    console.log( 'tell me a', err, user, passerror );
                    user.comparePassword( password, function( error, isMatch )
                    {
                        if( err )
                        {
                            throw err;
                        } 

                        reply( user );
                    
                    } );
                });

        }
    }
},
// {
//     method: 'GET',
//     path: '/api/logout',
//         // auth: 'session',
//     config: {
//         validate: {
//             // payload:
//             // {
//             //     firstName: Joi.string().max(40).min(2).alphanum()
//             //     // firstName: Joi.int()
//             // }
//         },

//         // auth: 'session',
//         handler: function (request, reply) 
//         {
//             console.log( 'logoooot' );
//                 request.auth.session.clear();
//             return reply.redirect('/');

//             // request.auth.session.clear();
//             // reply().redirect('/');
//         }
    
//     }
// },
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
