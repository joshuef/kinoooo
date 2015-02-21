var Database = require('../config/database');
var mongoose = Database.Mongoose;
var Schema = mongoose.Schema;
var _ = require('lodash');


var services = 'facebook window google'.split(' ');
var gender = 'male female'.split(' ');


var userSchema = new Schema({
  firstName:  String,
  middleName:  String,
  lastName:  String,
  password : String,
  gender:  { type: String, enum: gender },
  email:  String,
  picture: String,
  service: { type: String, enum: services },
  serviceUserId: { type: String, index: true },
  accessToken:  String,
  tokenExpiration:  Date,
  created: { type: Date, default: Date.now },
  updated: Date
}, {
  autoIndex: false,
  toObject: { virtuals: false },
  toJSON: { virtuals: false },
  id: false
});


userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});


module.exports = mongoose.model('User', userSchema);


