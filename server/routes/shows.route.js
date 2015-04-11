'use strict';
// var authController = require("../controllers/auth");


var Show = require( "../models/show.model");
var _ = require( 'lodash' );
var Joi  = require('joi');

var showRoot = '/api/shows';


// // module.exports = null;
module.exports = [
{
    method: 'GET',
    path: showRoot,
    config: {
         auth: {
            strategy: 'session'
        },
        handler: function(request, reply)
        {
            if( request.auth.credentials.userType !== 'admin' )
                return;

                // console.log( "WHAT PLACES?" );
            // reply('booom')
            return Show.find(function (err, shows) 
            {
                if (!err) 
                {
                    // console.log( reply );
                    reply( {
                    shows: shows,
                    title: 'Shows'
                    }   );

                    // console.log( shows );
                  
                  
                } else {
                    reply( err );
                  return console.log(err);
                }
          })
        }
    }
},
{
    method: 'POST',
    path: showRoot + '/add',
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

            // console.log( 'THE AUUUTHHH', request.auth.credentials );
            var newShow = new Show({
                name: payload.name,
                director: payload.director,
                place: payload.place,
                image: payload.image,
                description: payload.description,
                startDate: payload.startDate,
                endDate: payload.endDate,
                creator: request.auth.credentials._id
            });


            newShow.save(function (err) {
                    if (!err) {
                      return console.log("created a show");
                  } else {
                        newShow = { 
                            error: true,
                            text: 'Error saving show.',
                            action: newShow.name || 'Ups...'

                        };
                      //TODO: return page with errors
                      return console.log(err);
                  }
            });
        
            // TODO: return to list page, if saved
            // reply.redirect('/shows/', 301);
            return reply(newShow);  

        }
    }
},
{
    method: 'GET',
    path: showRoot + '/{id}',
    config: {
        handler: function(req, reply)
        {
            return Show.findById(req.params.id, function (err, show_data) {
                if (!err) {

                  reply('show_edit', {
                    title: 'show data',
                    show: show_data
                });
              } else {
                  return console.log(err);
              }
          });

            reply('show_edit', {
                title: 'show data'
            });

        }
    }
}
];