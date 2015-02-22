'use strict';
// var authController = require("../controllers/auth");
var passport = require("hapi-passport");
// var Mongoose = require('mongoose');
var UserModel = require( "../models/user.model");

var userRoot = '/api/users';

// // module.exports = null;
module.exports = [
{
    method: 'GET',
    path: userRoot,
    config: {
        handler: function(req, reply)
        {
            // reply('booom')
            return UserModel.find(function (err, users) 
            {
                if (!err) 
                {
                    // console.log( reply );
                    reply('user_list', {
                    users: users,
                    title: 'Users'
                    }   );

                    console.log( users );
                  
                  
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
        handler: function(req, reply)
        {

         console.log(req.body);
         var user;

         user = new UserModel({
            firstName:req.body.firstname,
            lastName:req.body.lastname
        });

         user.save(function (err) {
            if (!err) {
              return console.log("created");
          } else {
              //TODO: return page with errors
              return console.log(err);
          }
      });
          //TODO: return to list page, if saved
          reply.redirect('/users/', 301);
          // return reply.send(user);  
      }
    }
},
{
    method: 'GET',
    path: userRoot + '/{id}',
    config: {
        handler: function(req, reply)
        {
            return UserModel.findById(req.params.id, function (err, user_data) {
                if (!err) {

                    console.log( 'IDDDD',req.params.id );
                    console.log( user_data );
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
},


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
