'use strict';
// var authController = require("../controllers/auth");
// var Mongoose = require('mongoose');
var User = require( "../models/user.model");
var _ = require( 'lodash' );

// console.log( User );
// var userRoot = '/api/';
var Joi  = require('joi');
// var passport = require('hapi-passport');

// // module.exports = null;
module.exports = [
{
    method: ['POST'],
    path: '/login',
    config: {
         auth: {
            mode: 'try',
            strategy: 'session'
        },

        validate: {
            // payload: {
            //     // email: Joi.string().email().required(),
            //     email: Joi.string().required(),
            //     password: Joi.string().required()
            // }
        },
        handler: function( request, reply )
        {
            console.log( 'logging innnnn' );
            var email = request.payload.email;
            var password = request.payload.password;

            //first see if we're already authenticated
            if (request.auth.isAuthenticated) 
            {
                var user = _.omit( request.auth.credentials, [ 'password', 'userType'] );
                return;
            }


            User.findOne( { email: email }, function( err, user )
            {

                if( err )
                {
                    throw err;
                } 

                if( user )
                {
                    console.log( 'got userrr' );
                    user.comparePassword( password, function( error, isMatch )
                    {
                        if( err )
                        {
                            throw err;
                        } 

                        request.auth.session.set(user);
                        // request.auth.session.set('user', user );

                        var replyUser = _.omit( user, 'password' ) ;


                        reply( replyUser );                       // .state('account', user );
                        return;
                    
                    } );
                    
                }
                else
                {
                    reply( {body: { error: 'Nope' } });
                }
            });

        }
    }
},
{
    method: 'GET',
    path: '/me',
    config: {
        auth: { 
            mode: 'try',
            strategy: 'session'
        },
        validate: {
            // payload:
            // {
            //     firstName: Joi.string().max(40).min(2).alphanum()
            //     // firstName: Joi.int()
            // }
        },

        handler: function (request, reply) 
        {
            console.log( 'WHAAAAAAAAAAAAAAAAAAAAAAAAAT' );
            console.log( request.query );


            if (request.auth.credentials) 
            {
                var user = _.omit( request.auth.credentials, [ 'password', 'userType'] );
                if( request.query && request.query.question === 'isAdmin'
                    && request.auth.credentials.userType === 'admin' )
                {
                    user.isAdmin = true;
         
                }
                
                console.log( 'ALREADY DONE IT' );
                reply( user );
                return;
            }
            else
            {

                reply( { body: { error: 'ups' } });
                return;
            }
        }
    
    }
},
{
    method: 'GET',
    path: '/logout',
    config: {
        // auth: { strategy: 'session'},
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
            console.log( 'logoooot' );

            // console.log( request.auth.credentials );
            request.auth.session.clear();
            
            reply('OOooT').state( 'account', null );
            
            // reply()
            return;

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
//     path: '/auth',
//     config: authController.signIn
// },
// {
//     method: ['PUT', 'POST', 'GET', 'DELETE' ],
//     path: '/signout',
//     config: authController.signOut
// },
// {
//     method: 'POST',
//     path: '/signup',
//     config: authController.createUser
];

// 
