var Database = require('../config/database');
var mongoose = Database.Mongoose;
var Schema = mongoose.Schema;
var _ = require('lodash');
var findOneOrCreate = require('mongoose-find-one-or-create');



var showSchema = new Schema({
  image: { type: String, required: false },
  name: { type: String, required: false, unique: true },
  director: { type: String, required: false },
  isOmenlU: { type: Boolean, required: false },
  creationDate: { type: Date, default: Date.now },
  showingAt: [ 
    { 
      // place: { type: Schema.Types.ObjectId, ref: 'Place' },
      place: { type: Schema.Types.ObjectId, ref: 'Place' },
      time: { type: Date } ,
      id: false,
      details: { type: String, required: false },
      flags: [],
    } ],
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    rating: { type: Number},
    website: { type: String }
}, {
    autoIndex: false,
    id: false
});


showSchema.plugin(findOneOrCreate);

module.exports = mongoose.model('Show', showSchema);
