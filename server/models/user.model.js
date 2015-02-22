var Database = require('../config/database');
var mongoose = Database.Mongoose;
var Schema = mongoose.Schema;
var _ = require('lodash');

// var bcrypt = require('bcrypt');
var passportLocalMongoose = require('passport-local-mongoose');
// var SALT_WORK_FACTOR = 10;

var services = 'facebook window google'.split(' ');
var gender = 'male female'.split(' ');

var userSchema = new Schema({
  firstName:  String,
  middleName:  String,
  lastName:  String,
  password : String,
  userType : String,
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




// userSchema.pre('save', function( next )
// { 
//     var user = this;
//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();
     
//     // generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err);
     
//         // hash the password along with our new salt
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);
     
//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// }

// userSchema.methods.comparePassword = function(candidatePassword, cb) 
// {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

//create the model and add it to the exports
// var User = exports.User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);
