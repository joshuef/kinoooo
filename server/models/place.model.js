var Database = require('../config/database');
var mongoose = Database.Mongoose;
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var _ = require('lodash');
var findOneOrCreate = require('mongoose-find-one-or-create');



var placeSchema = new Schema({
  image: { type: String, required: false },
    // details: { type: String, required: true },
    details: { type: String, required: false },
    creationDate: { type: Date, default: Date.now },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    // comments: [{ body: String, date: Date }],
    url: { type: String, required: false },
    shows: [ { type: Schema.Types.ObjectId, ref: 'Show', index: {unique: true, dropDups: true}  }  ],
    name: { type: String, required: false },
    location : { type : [Number], index : '2d'},
    metadata: {
        "plot" : { type: String, required: false },
        "rated" : { type: String, required: false } ,
        "language" : { type: String, required: false } ,
        "title" : { type: String, required: false } ,
        "country" : { type: String, required: false } ,
        "writer" : { type: String, required: false } ,
        "poster" : { type: String, required: false } ,
        "metascore" : { type: String, required: false } ,
        "imdb_id" : { type: String, required: false } ,
        "director" : { type: String, required: false } ,
        "released" : { type: Date, required: false },
        "imdb_rating" : { type: String, required: false } ,
        "awards" :{ type: String, required: false } ,
        "year" : { type: String },
        "genre" : { type: String, required: false } ,
        "actors" : { type: String, required: false } ,
        "runtime" : { type: String, required: false } ,
        "type" : { type: String, required: false } ,
        "response" : { type: String, required: false } ,
        "imdb_votes" : { type: String, required: false } 
    },
    venue: {
        place_id: { type: String, required: false, unique : true },
        formatted_address: { type: String, required: false },
        name: { type: String, required: false },
        url: { type: String, required: false },
        international_phone_number: { type: String },
        geometry: {

            location: {
                A: { type: Number },
                F: {type: Number }
            }
        },
      rating: { type: Number},
      website: { type: String }
    } 
}, {
  autoIndex: false,
  id: false
});
if (!placeSchema.options.toJSON) placeSchema.options.toJSON = {};

// placeSchema.index({ "location" : "geoHaystack", type : 1},{ bucketSize : 1});
// placeSchema.index({ "location" : "2d" } );

placeSchema.options.toJSON.virtuals = true;
placeSchema.virtual('text').get(function() {
	return this.venue.name;
});
// placeSchema.virtual('name').get(function() {
//   return this.venue.name;
// });


placeSchema.virtual('latitude').get(function() {
    return this.venue.geometry.location.A;
});
placeSchema.virtual('longitude').get(function() {
	return this.venue.geometry.location.F;
});

placeSchema.plugin(uniqueValidator);
placeSchema.plugin(findOneOrCreate);

module.exports = mongoose.model('Place', placeSchema);
