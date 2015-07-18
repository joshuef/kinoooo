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

    _.each( shows, function( thisShow, i )
    {
        if( i > 5 )
        {
            return;
        }

        var newShow = new Show(
            { 
                name : thisShow, 
                url: '',
                flags: [], 
                showingAt: [], 
            });

        Show.findOneOrCreate({name: thisShow}, newShow, function(err, createdShow) {

            console.log('CREATED A SHOW', createdShow);

            Raw.find({ 'show': createdShow.name }, function(err, rawShowsObjects)
            {
                console.log( 'FINDING SIMILAR SHOWS IN RAW' );
                if( createdShow && rawShowsObjects.length > 0 )
                {
                    var updatedShow = createdShow;

                    var currentPlace ='';
                    var thePlaceId ='';
                    var showtimeObject = {};

                    _.each( rawShowsObjects, function( rawObject, i )
                    {
                        // if( i > 3 )
                        // {
                        //     return;
                        // }
   
                        var flags = [];


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

                        if( rawObject.place )
                        {
                            //if its not the same place, lets find the new place
                            //
                            
                            currentPlace = rawObject.place;
                            
                            // thePlace = Place.findOne({ 'venue' : { 'name' : rawObject.place  } }, function( err, place )
                            Place.findOne({ 'venue' : { 'name' : rawObject.place  } }, function( err, place )
                                {
                                    console.log( 'THE PLACE', place._id );
                                    thePlaceId =place._id;

                                    if( place._id )
                                    {
                                        showtimeObject = {
                                            time: rawObject.time,
                                            place: thePlaceId,
                                            flags: flags
                                        };

                                        console.log( 'PLACE ID AND SO SHOWTIME OBJECT', showtimeObject );


                                        updatedShow.showingAt.push( showtimeObject );    
                                        console.log( 'UPDATED SHOW (after finding new place)?', updatedShow );
                                        


                                        createdShow = updatedShow;
                                        createdShow.save();
                                    }
                                    else
                                    {
                                        console.log( 'NO PLACE ID OKAAAAYYYYYYYYYY?????', thePlaceId, place );
                                    }

                                    //and then we'd save it cos we have to. then all future things will be for the same show
                                    
                                    return place;
                                    


                                    

                                });

                        }//end if



                    } );


                }
            });
        });
    } )



});
