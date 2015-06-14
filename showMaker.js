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
                        if( i > 5 )
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
                                return place._id;
                            });

                        console.log( 'THE POALCE', thePlaceId );

                        updatedShow.showingAt.push(
                        {
                            time: rawObject.time,
                            place: thePlaceId,
                            flags: flags
                        });

                        // console.log( 'UPDATED SHOW?', updatedShow );

                        Show.update( createdShow, updatedShow, function( err, or)
                        {
                            console.log( 'AND FINALLY??', err, or );
                        } );

                    } );

                }
            });
        });
    } )

    // process.exit();


});
