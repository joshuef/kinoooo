'use strict';
// var authController = require("../controllers/auth");

// var Mongoose = require('mongoose');
var User = require( "../models/user.model");

var Joi  = require('joi');

var userRoot = '/api/users';


// // module.exports = null;
module.exports = [
{
    method: 'GET',
    path: userRoot,
    config: {
        handler: function(req, reply)
        {
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
            var payload = request.payload;


            var newUser = new User({
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
                password: payload.password,
                userType: payload.userType
            });


            newUser.save(function (err) {
                    if (!err) {
                      return console.log("created");
                  } else {
                      //TODO: return page with errors
                      return console.log(err);
                  }
            });
        
            // TODO: return to list page, if saved
            // reply.redirect('/users/', 301);
            return reply(newUser);  

        }
    }
},
{
    method: 'GET',
    path: userRoot + '/{id}',
    config: {
        handler: function(req, reply)
        {
            return User.findById(req.params.id, function (err, user_data) {
                if (!err) {

                    // console.log( 'IDDDD',req.params.id );
                    // console.log( user_data );
                  reply('user_edit', {
                    title: 'user data',
                    user: user_data
                });
              } else {
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