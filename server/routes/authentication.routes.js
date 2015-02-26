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
                // var x = User.find( { firstName: email }, function( err, model, passerror )
                // {
                //     console.log( 'tell me a', err, model, passerror );
                // });

                // console.log( 'X IS?', x );

                // reply( 'bla ');

                var tryUser = new User({ username: email });

                tryUser.comparePassword( password, function( error, user, passError)
                {
                    console.log( 'OHMYTHISGUY' );
                    console.log( error, user, passError );
                    // if( error )
                    // {
                    //     console.log( 'ERROORRRR' );
                    // }
                    // else
                    // {
                    //     console.log( 'BOOOOM. IN' );

                    //     reply( 'youre in baby')
                    // }
                } );


                // console.log( x );

        //     if (request.auth.isAuthenticated) 
        //     {
        //             return reply.redirect('/');
        //         }

        //         var message = '';
        //         var account = null;

        //         if (request.method === 'post') {

        //             if (!request.payload.username ||
        //                 !request.payload.password) {

        //                 message = 'Missing username or password';
        //             }
        //             else {
        //                 account = users[request.payload.username];
        //                 if (!account ||
        //                     account.password !== request.payload.password) {

        //                     message = 'Invalid username or password';
        //                 }
        //             }
        //         }
        //     request.auth.session.set(account);
        //     return reply.redirect('/');
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
