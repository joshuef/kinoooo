var Database = require('../config/database');
var mongoose = Database.Mongoose;
var Schema = mongoose.Schema;
var _ = require('lodash');


var placeSchema = new Schema({
  placeId: { type: Schema.Types.ObjectId, ref: 'Place' }
});
var showSchema = new Schema({
  image: { type: String, required: false },
  name: { type: String, required: false },
  director: { type: String, required: false },
  details: { type: String, required: false },
  creationDate: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // comments: [{ body: String, date: Date }],
  // place: { type: String, required: true },
  places: [ placeSchema ],
    rating: { type: Number},
    website: { type: String }
}, {
    autoIndex: false,
    id: false
});



module.exports = mongoose.model('Show', showSchema);
