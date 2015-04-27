'use strict';
// var authController = require("../controllers/auth");


var Show = require( "../models/show.model");
var Place = require( "../models/place.model");
var _ = require( 'lodash' );
var Joi  = require('joi');

var showRoot = '/api/shows';


/**
 * Adds Shows to the shows array of a place, via mongoose update.
 * @param  {object } place   place object / schema
 * @param  {object} newShowId The show ID being referenced
 */
var updatePlaceWithShow = function( place, newShowId ){ 


    // place.shows = [ newShowId ];

    console.log( 'UPDATING PLACE', place );

    Place.update( place.placeId, { $pushAll:{ shows: [ newShowId ] } },{upsert:true}, function( err, place )
    {
        console.log( 'UPDATE DONE?', err, place );

        if( err )
        {
            // console.log( err );
            reply( 
            { 
                error: true,
                text: "Place Didnae update as well"
            
            } );
        }

        else
        {
            console.log( 'PLACE UPDATED AS WELLLLLLL' );
        }


    } );
};

// // module.exports = null;
module.exports = [
{
    method: 'GET',
    path: showRoot,
    config: {
        handler: function(request, reply)
        {
           

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
                places: payload.places,
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



            if( newShow.places )
            {
                console.log( 'GOT NEWSHOWPLACES' );
                _.each( newShow.places, function( place )
                {
                    updatePlaceWithShow( place, newShow._id );
                } );
            }
        
            // TODO: return to list page, if saved
            // reply.redirect('/shows/', 301);
            return reply(newShow);  

        }
    }
},
{
    method: [ 'GET', 'POST' ],
    path: showRoot + '/{id}',
    config: {
        handler: function(request, reply)
        {
            if( request.method = 'POST' )
            {
                Show.update( request.params.id, _.omit( request.payload, '_id' ), function( err, show )
                {

                    console.log( 'SHOW UPDATED THANKS' );



                    if( err )
                    {
                        reply( { error: 'Didnae update' });
                    }

                    else
                    {
                        //update the place now, aye
                        if( request.payload.places )
                        {
                            //should be a promise for the waiting here
                            console.log( 'GOT NEWSHOWPLACES', request.params );
                            _.each( request.payload.places, function( place )
                            {
                                updatePlaceWithShow( place, request.params );
                            } );
                        }

                        reply( request.payload );
                    }
                } );

            }
            else
            {
                return Show.findById(request.params.id, function (err, show_data) {
                    if (!err) 
                    {

                        reply( show_data );
                    } 
                    else 
                    {
                         reply( {
                            error: 'Errrrrrr'
                        });

                        return console.log(err);
                    }
                });

                
                reply('show_edit', {
                    title: 'show data'
                });
            }

        }

    }
}
];