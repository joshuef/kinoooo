'use strict';
// var authController = require("../controllers/auth");


var Show = require( "../models/show.model");
var Place = require( "../models/place.model");
var _ = require( 'lodash' );
var Joi  = require('joi');
var moment = require( 'moment' );
var showRoot = '/shows';


/**
 * Adds Shows to the shows array of a place, via mongoose update.
 * @param  {object } place   place object / schema
 * @param  {object} showId The show ID being referenced
 * @param  {boolean} remove Should we remove this?
 */
var updateAPlacesShows = function( place, showId, remove  ){ 

    console.log( 'UPDATING PLACE', place, showId, 'remove?', remove );
    place = { _id: place };
    var mongooseUpdate;

    if( remove )
    {
        mongooseUpdate = { $pullAll:{ shows: [ showId ] } }
    }
    else
    {
        mongooseUpdate = { $addToSet:{ shows: showId } }
    }
        // console.log( 'UPDATE TO BE DONE?', place, mongooseUpdate );

    Place.update( place, mongooseUpdate,{upsert:true}, function( err, place )
    {
        // console.log( 'UPDATE DONE?', err, place, mongooseUpdate );

        if( err )
        {
            console.log( 'ERROR SAVING PLACE TO SHOW' );
        }

        else
        {
            // console.log( 'PLACE UPDATED AS WELL' );
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
           
            console.log( 'Finding showwwssss' );
                // console.log( "WHAT PLACES?" );
            // reply('booom')
            return Show.find( function (err, shows) 
            {
                if (err) 
                {
                    console.log( 'error in get shows', err );
                    return err;
                }

                console.log( 'found shows and dealing' );
                
                var showsWithShowTimes = [];

                _.each( shows, function(show)
                {
                    var relevantShowTimes = [];

                    if( show.showingAt.length )
                    {
                        _.each( show.showingAt, function( showTime)
                        {
                            var time = moment( showTime.time );

                            // console.log( 'time it iswas', time.isBefore( moment(), 'day' ) );

                            if( ! time.isBefore( moment(), 'day' ) )
                            {
                                relevantShowTimes.push( showTime );
                            }

                        });

                        show.showingAt = relevantShowTimes;   
                    }

                    if ( show.showingAt.length > 0 )
                    {
                        showsWithShowTimes.push( show );
                    }
                    // console.log( 'show', show );

                });

                var uniqShows = _.uniqBy( showsWithShowTimes, 'name');
                // let uniqShows = showsWithShowTimes;

                // console.log( reply );
                reply( {
                shows: uniqShows,
                title: 'Shows'
                }   );

                // console.log( shows );
              
                  
               
          })
        }
    }
},
{
    method: 'POST',
    path: showRoot + '/add',
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
            var userIP = request.headers['x-forwarded-for'];
            var env = process.env.NODE_ENV;

            if( env === 'production' && userIP !== '185.10.231.179' )
            {
                reply( 'Not for you');
                return;
            }

            var payload = request.payload;
            if( ! payload.name )
                return;

            console.log( 'PAYLOADNAME', payload.name );
            // console.log( 'PAYLOAD', payload.showingAt );

            var placeQueryArray = [];

             _.each( payload.showingAt , function( placeTime )
            {
                console.log( 'placetimeeeee', placeTime.place );
                placeQueryArray.push( placeTime.place  )
            });



            Place.find({ 'name': { $in:placeQueryArray } }, function(err, foundPlaces)
            {
                console.log( 'FOUND PLACESSSS', foundPlaces[0] );

                _.each( payload.showingAt , function( placeTime )
                {
                    var thisPlace = _.find( foundPlaces, function( foundPlace )
                    {
                        console.log( 'OVER THE PLACES LOOPS', foundPlace.name );
                        // foundPlace.name = placeTime.place;
                        // 
                        return  foundPlace.name === placeTime.place;
                    } );

                    placeTime.place = thisPlace._id;

                    console.log( 'PLACETIMEPLACE' , placeTime.place);

                
                });

                



                 var newShow = new Show({
                    name: payload.name || 'ups',
                    director: payload.director || 'ups',
                    // places: payload.places,
                    image: payload.image || 'ups',
                    description: payload.description || 'ups',
                    showingAt: payload.showingAt || [],
                    startDate: payload.startDate || 'ups',
                    endDate: payload.endDate || 'ups',
                    // creator: request.auth.credentials._id
                });

                Show.findOneOrCreate({name: payload.name}, newShow, function(err, ourShow) {

                    console.log( 'Found a show that exists' );
                    if( ourShow )
                    {
                        Show.update({name: payload.name}, {$pushAll: { showingAt: newShow.showingAt } }, { upsert: true }, function(err, ourShow) {
                        });
                        
                    }
                    // {name: 'Mohammad', age: 20}
                    // console.log( 'errrrrr', err );
                    // console.log( 'ourShow', ourShow.name, ourShow._id );
                    // console.log('CREATED A SHOOOWWW', ourShow.name, 'FROM', newShow.name, 'WITH', newShow.showingAt);
                });

                if( newShow.showingAt.length > 0 )
                {
                    // console.log( 'GOT NEWSHOWPLACES', newShow );
                    _.each( newShow.showingAt, function( placeTime )
                    {
                        console.log( 'showingAt::::', placeTime );
                        updateAPlacesShows( placeTime.place, newShow._id );
                    } );
                }



            });
               


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
                        if( request.payload.showingAt )
                        {
                            //should be a promise for the waiting here
                            console.log( 'GOT NEWSHOWPLACES', request.params.id );
                            _.each( request.payload.showingAt, function( placeTime )
                            {
                                updateAPlacesShows( placeTime.place, request.params.id );
                            } );
                        }

                        if( request.payload.removePlaceTime )
                        {
                            //should be a promise for the waiting here
                            console.log( 'REMOVING PLACES', request.params.id );
                            _.each( request.payload.removePlaceTime, function( placeTime )
                            {
                                updateAPlacesShows( placeTime.place, request.params.id, true );
                            } );
                        }



                        else
                        {
                            //we need to remove the records from the place tooo
                            //
                            //DOHHHHHHH
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