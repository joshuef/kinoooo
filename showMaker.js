/**
 * Config Location
 */
process.env.GETCONFIG_ROOT = __dirname + '/server/config';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

 var _ = require( "lodash" );
 var moment = require('moment');

var Database = require('./server/config/database');
var mongoose = Database.Mongoose;
var Schema = mongoose.Schema;

var Show = require( "./server/models/show.model");
var Place = require( "./server/models/place.model");


var Raw = mongoose.model('Raw', 
            new Schema(
                {
    "show" : String,
    "is_fl" : Boolean,
    "is_3d" : Boolean,
    "place" : String,
    "time" : Date,
    "is_omu" : Boolean,
    "is_ov" : Boolean
} ), 'raw_showings');


Raw.distinct('show', function( err, shows )
{

    _.each( shows, function( thisShow )
    {

        var newShow = new Show(
            { 
                name : thisShow, 
                url: '',
                flags: [], 
                showingAt: [], 
            });

        Show.findOneOrCreate({name: thisShow}, newShow, function(err, createdShow) {
            // {name: 'Mohammad', age: 20}
            console.log('CREATED A SHOW', createdShow);

            Raw.find({ 'show': createdShow.name }, function(err, rawShowsObjects)
            {
                if( createdShow && rawShowsObjects.length > 0 )
                {
                    var updatedShow = createdShow;

                    _.each( rawShowsObjects, function( rawObject, i )
                    {
                        if( i > 3 )
                        {
                            return;
                        }
                        // console.log( 'RAW OBJECT?', rawObject.show );
                        // console.log( 'RAW OBJECT?', rawObject.place );
                        // console.log( 'RAW OBJECT?', rawObject.time );
                        var flags = [];

                        // if( ! rawObject )
                        // {
                        //     return;
                        // }

                        if( rawObject.is_3d )
                        {
                            flags.push( '3d' );
                        }

                        if( rawObject.is_omu )
                        {
                            flags.push( 'omu' );
                        }

                        if( rawObject.is_ov )
                        {
                            flags.push( 'ov' );
                        }

                        if( rawObject.is_fl )
                        {
                            flags.push( 'fl' );
                        }

                        var thePlaceId = Place.findOne({ 'venue' : { 'name' : rawObject.place  } }, function( err, place )
                            {
                                console.log( 'THE PLACE', place._id );
                                // return place._id;
                                

                                updatedShow.showingAt.push(
                                {
                                    time: rawObject.time,
                                    place: thePlaceId,
                                    flags: flags
                                });

                                createdShow = updatedShow;
                                
                            });

                        // console.log( 'THISISHAPPENING AFTER PLACE ID?', thePlaceId );

                        // console.log( 'UPDATED SHOW?', updatedShow );


                    } );
                    
                    createdShow.save();
                    // Show.update( createdShow, updatedShow, function( err, show)
                    // {
                    //     console.log( 'AND FINALLY??', err, show );
                    // } );

                }
            });
        });
    } )

    // process.exit();


});
