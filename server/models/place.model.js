var Database = require('../config/database');
var mongoose = Database.Mongoose;
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var _ = require('lodash');


var placeSchema = new Schema({
	image: { type: String, required: false },
  	// details: { type: String, required: true },
  	details: { type: String, required: false },
  	creationDate: { type: Date, default: Date.now },
  	creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  	// comments: [{ body: String, date: Date }],
  	shows: [ { type: Schema.Types.ObjectId, ref: 'Show' }  ],
    venue: {
        place_id: { type: String, required: true, unique : true },
        name: { type: String, required: true },
        formatted_address: { type: String, required: true },
        url: { type: String, required: true },
        international_phone_number: { type: String },
        geometry: {
            location: {
                k: Number,
                B: Number
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

placeSchema.options.toJSON.virtuals = true;
placeSchema.virtual('text').get(function() {
	return this.venue.name;
});
placeSchema.virtual('name').get(function() {
	return this.venue.name;
});

placeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Place', placeSchema);
