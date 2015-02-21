'use strict';
// var authController = require("../controllers/auth");
var passport = require("hapi-passport");
// var Mongoose = require('mongoose');
var UserModel = require( "../models/user.model");


// // module.exports = null;
module.exports = [
{
    method: 'GET',
    path: '/users',
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
// {
//     method: 'POST',
//     path: '/Users/add',
//     config: {
//         handler: function(req, res)
//         {

//          console.log(req.body);
//          var driver;

//          driver = new UsersModel({
//             firstName:req.body.firstname,
//             lastName:req.body.lastname,
//         });

//          driver.save(function (err) {
//             if (!err) {
//               return console.log("created");
//           } else {
//               //TODO: return page with errors
//               return console.log(err);
//           }
//       });
//           //TODO: return to list page, if saved
//           res.redirect('/Users/', 301);
//           //return res.send(driver);  
//       }
//     }
// },
// {
//     method: 'GET',
//     path: '/Users/{id}',
//     config: {
//         handler: function(req, res)
//         {
//             return UsersModel.findById(req.params.id, function (err, driver_data) {
//                 if (!err) {
//                   res.render('driver_edit', {
//                     title: 'Driver data',
//                     driver:driver_data
//                 });
//               } else {
//                   return console.log(err);
//               }
//           });

//             res.render('driver_edit', {
//                 title: 'Driver data'
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
