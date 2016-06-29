'use strict';
// var authController = require("../controllers/auth");


var Place = require( "../models/place.model");
var _ = require( 'lodash' );
var Joi  = require('joi');

var placeRoot = '/places';


// // module.exports = null;
module.exports = [
{
    method: 'GET',
    path: placeRoot,
    config: {
        
        handler: function(request, reply)
        {
            
            return Place.find({ shows: { $gt: [] } }, function (err, places) 
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
    method: 'GET',
    path: placeRoot + '/near',
    config: {
        
        handler: function(request, reply)
        {
            
            var options = { near: [10, 10], maxDistance: 5 };
            var payload = request.payload;


            return Place.geoNear([9,9], { spherical : true, maxDistance : .1 }, function (err, results, stats) 
            {
                console.log(err, results);
            });
          
        }
    }
},


{
    method: 'POST',
    path: placeRoot + '/add',
    config: {
        // auth : 
        // {
        //     strategy: 'session'
        // },
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
            var userIP = request.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress || 
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;
                
            var env = process.env.NODE_ENV;

            console.log( 'handlingggg adding place' );

            if( env === 'production' && userIP !== '185.10.231.179' )
            {
                console.log( 'Not the right IP is it?', userIP );
                reply( 'Not for you');
                return;
            }

            var payload = request.payload;

            // console.log( 'THE AUUUTHHH', request.auth.credentials );
            var newPlace = new Place({
                name: payload.name || 'noname',
                venue: payload.venue || '',
                isFreiluft: payload.isFreiluft || false,
                //needs to be longitude, lat
                location: [ 
                    payload.venue ? payload.venue.geometry.location.F : 0, 
                    payload.venue ? payload.venue.geometry.location.A  : 0 ],
                description: payload.description || '',
                image: payload.image || '',
                url: payload.url || '',
                // creator: request.auth.credentials._id || 0
            });


              // Place.findOneOrCreate({name: payload.name}, newPlace, function(err, thisPlace) {
            Place.update({name: payload.name}, newPlace, { upsert: true }, function(err, thisPlace) {
                
                reply( payload.name + ' is updated');
                });


            // newPlace.save(function (err) {
            //         if (!err) {
            //           reply(newPlace)
            //           return console.log("created a place");

            //       } else {
            //           //TODO: return page with errors
            //             reply( 
            //             { 
            //                 error: true,
            //                 text: "adding place failed"
                        
            //             } );
                        
            //           return console.log(err);
            //       }
            // });

        }
    }
},
{
    method: [ 'GET', 'POST' ],
    path: placeRoot + '/{id}',
    config: {
        handler: function(request, reply)
        {

            if( request.method = 'POST' )
            {
                Place.update( request.params.id, _.omit( request.payload, '_id' ), function( err, place, y )
                {
                    console.log( 'UPDATE DONE?', err, place, y );

                    if( err )
                    {
                        reply( 
                        { 
                            error: true,
                            text: "Didnae update"
                        
                        } );
                    }

                    else
                    {
                        reply( request.payload );
                    }


                } );

            }
            else
            {

                return Place.findById(request.params.id, function (err, place_data) {
                    if (!err) {

                        reply( place_data );

                    } else {
                        reply( { error: 'WHOOOPS' });
                        return console.log(err);
                    }
                });
            }



            // reply('place_edit', {
            //     title: 'place data'
            // });

        }
    }
}
];