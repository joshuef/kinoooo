var Database = require('../config/database');
var mongoose = Database.Mongoose;
var Schema = mongoose.Schema;
var _ = require('lodash');


var placeSchema = new Schema({
  image: { type: String, required: false },
  // details: { type: String, required: true },
  details: { type: String, required: false },
  creationDate: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // comments: [{ body: String, date: Date }],
  venue: {
    place_id: { type: String, required: true },
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



module.exports = mongoose.model('Place', placeSchema);
