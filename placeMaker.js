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

Raw.distinct('place', function( err, places )
{

    _.each( places, function( thisPlace )
    {
\        
        var newPlace = new Place({ venue: { name : thisPlace }, url: '' });


        Place.findOneOrCreate({name: thisPlace}, newPlace, function(err, thisPlace) {
            // {name: 'Mohammad', age: 20}
            console.log('CREATED A PLACE', thisPlace);
        });
    } )

    // process.exit();


});
