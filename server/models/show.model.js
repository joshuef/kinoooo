var Database = require('../config/database');
var mongoose = Database.Mongoose;
var Schema = mongoose.Schema;
var _ = require('lodash');


var showSchema = new Schema({
  image: { type: String, required: false },
  // details: { type: String, required: true },
  director: { type: String, required: false },
  details: { type: String, required: false },
  creationDate: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // comments: [{ body: String, date: Date }],
  place: { type: String, required: false },
  // place: { type: Schema.Types.ObjectId, ref: 'Show', required: true },
    rating: { type: Number},
    website: { type: String }
}, {
    autoIndex: false,
    id: false
});



module.exports = mongoose.model('Show', showSchema);
