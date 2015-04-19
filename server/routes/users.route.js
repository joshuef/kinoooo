'use strict';
// var authController = require("../controllers/auth");

// var Mongoose = require('mongoose');
var User = require( "../models/user.model");
var _ = require( 'lodash' );
var Joi  = require('joi');

var userRoot = '/api/users';


// // module.exports = null;
module.exports = [
{
    method: 'GET',
    path: userRoot,
    config: {
         auth: {
            strategy: 'session'
        },
        handler: function(request, reply)
        {
            if( request.auth.credentials.userType !== 'admin' )
                return;

                console.log( "WHAT USERS?" );
            // reply('booom')
            return User.find(function (err, users) 
            {
                if (!err) 
                {
                    // console.log( reply );
                    reply( {
                    users: users,
                    title: 'Users'
                    }   );

                    // console.log( users );
                  
                  
                } else {
                    // reply( {
                    //     error: true,
                    //     text: 'Error getting users'
                    // });
                  return console.log(err);
                }
          })
        }
    }
},
{
    method: 'POST',
    path: userRoot + '/add',
    config: {
        auth : 
        {
            strategy: 'session'
        },
        validate: {

            // payload:
            // {
            //     firstName: Joi.string().max(40).min(2).alphanum()
            //     // firstName: Joi.int()
            // }
        },
        // handler: admit.create
        handler: function(request, reply)
        {   
            if( request.auth.credentials.userType !== 'admin' )
                return;


            var payload = request.payload;
            var response;


            var newUser = new User({
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
                password: payload.password,
                userType: payload.userType
            });


            newUser.save(function (err) {
                if ( err ) 
                {
                    response = 
                    {
                        error: true,
                        text: 'Error adding user'
                    };
                } 
                else 
                {
                    response = newUser;
                }
                
                reply(response);
            });

            // TODO: return to list page, if saved
            // reply.redirect('/users/', 301);
            return ;  

        }
    }
},
{
    method: 'GET',
    path: userRoot + '/{id}',
    config: {
        handler: function(request, reply)
        {
            return User.findById(request.params.id, function (err, user_data) {
                if (!err) {

                    // console.log( 'IDDDD',request.params.id );
                    // console.log( user_data );
                  reply('user_edit', {
                    title: 'user data',
                    user: user_data
                });
              } else {
                // reply( {
                //         error: true,
                //         text: 'Error getting user'
                //     });
                  return console.log(err);
              }
          });

            reply('user_edit', {
                title: 'user data'
            });

        }
    }
}
];