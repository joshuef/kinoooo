'use strict';
// var authController = require("../controllers/auth");


var Place = require( "../models/place.model");
var _ = require( 'lodash' );
var Joi  = require('joi');

var placeRoot = '/api/places';


// // module.exports = null;
module.exports = [
{
    method: 'GET',
    path: placeRoot,
    config: {
         auth: {
            strategy: 'session'
        },
        handler: function(request, reply)
        {
            if( request.auth.credentials.userType !== 'admin' )
                return;

                console.log( "WHAT PLACES?" );
            // reply('booom')
            return Place.find(function (err, places) 
            {
                if (!err) 
                {
                    // console.log( reply );
                    reply( {
                    places: places,
                    title: 'Places'
                    }   );

                    // console.log( places );
                  
                  
                } else {
                  return console.log(err);
                }
          })
        }
    }
},
{
    method: 'POST',
    path: placeRoot + '/add',
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
            var newPlace = new Place({
                name: payload.name,
                venue: payload.venue,
                description: payload.description,
                image: payload.image,
                creator: request.auth.credentials._id
            });


            newPlace.save(function (err) {
                    if (!err) {
                      return console.log("created a place");
                  } else {
                      //TODO: return page with errors
                      return console.log(err);
                  }
            });
        
            // TODO: return to list page, if saved
            // reply.redirect('/places/', 301);
            return reply(newPlace);  

        }
    }
},
{
    method: 'GET',
    path: placeRoot + '/{id}',
    config: {
        handler: function(req, reply)
        {
            return Place.findById(req.params.id, function (err, place_data) {
                if (!err) {

                  reply('place_edit', {
                    title: 'place data',
                    place: place_data
                });
              } else {
                  return console.log(err);
              }
          });

            reply('place_edit', {
                title: 'place data'
            });

        }
    }
}
];