// var passport = require("hapi-passport");
// var Mongoose = require('mongoose');
// var Database = require('./config/database');


// exports.signIn = function ()
// {
//   return 'yeaaah';
// };




// var Schema = mongoose.Schema; 
 
// var Drivers = new Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
// });
 
// var Trucks = new Schema({
//     licenceNo: { type: String, required: true },
//     title: { type: String, required: true },
// });
 
// var Routes = new Schema({
//     title: { type: String, required: true },
//   len: {type: Number},
// });
 
// var Trip = new Schema({
//     customRoute: { type: String, required: false },
//   route:[Routes],
//     driver: [Drivers],
//     truck: [Trucks],
//     modified: { type: Date, default: Date.now }
// });
 



// var DriversModel = mongoose.model('Drivers', Drivers);
// var TripsModel = mongoose.model('Trips', Drivers);
 

 
// app.get('/drivers', function(req, res){
 
//   return DriversModel.find(function (err, drivers) {
//     if (!err) {
//       res.render('driver_list', {
//         drivers:drivers,
//         title: 'Drivers'
//       });
      
      
//     } else {
//       return console.log(err);
//     }
//   });
// });
 
// app.get('/drivers/add', function(req, res){
//   var driver_data={
//     _id:"",
//     firstName:"",
//     lastName:""
//   };
//   res.render('driver_edit', {
//     title: 'Driver data',
//     driver:driver_data
//   });
// });
 
// app.post('/drivers/add', function(req, res){
//   console.log(req.body);
//   var driver;
  
//   driver = new DriversModel({
//     firstName:req.body.firstname,
//     lastName:req.body.lastname,
//   });
  
//   driver.save(function (err) {
//     if (!err) {
//       return console.log("created");
//     } else {
//       //TODO: return page with errors
//       return console.log(err);
//     }
//   });
//   //TODO: return to list page, if saved
//   res.redirect('/drivers/', 301);
//   //return res.send(driver);  
// });
 
// app.get('/drivers/:id', function(req, res){
//   return DriversModel.findById(req.params.id, function (err, driver_data) {
//     if (!err) {
//       res.render('driver_edit', {
//         title: 'Driver data',
//         driver:driver_data
//       });
//     } else {
//       return console.log(err);
//     }
//   });
 
//   res.render('driver_edit', {
//     title: 'Driver data'
//   });
// });
 
// app.post('/drivers/:id', function(req, res){
 
//   return DriversModel.findById(req.params.id, function (err, driver_data) {
//     driver_data.firstName=req.body.firstname;
//     driver_data.lastName=req.body.lastname;
//     return driver_data.save(function (err) {
//       if (!err) {
//         console.log("updated");
//       } else {
//         console.log(err);
//       }
//       res.redirect('/drivers/', 301);
//     });
//   });
// });
 
// app.get('/trips', function(req, res){
//   return TripsModel.find(function (err, trip_list) {
//     if (!err) {
//       res.render('trip_list', {
//         trips:trip_list,
//         title: 'trips'
//       });
      
      
//     } else {
//       return console.log(err);
//     }
//   });
 
// });
 
// app.get('/json/drivers', function(req, res){
 
//   DriversModel.find(function (err, drivers_list) {
//     if (!err) {
//     res.json(drivers_list);
//     } else {
//     res.json({});
//     }
//   });
// });
 
 
// app.get('/trips/add', function(req, res){
 
//   var trip_data={
//     _id:"",
//     route:"",
//     customRoute:""
//   };
//   res.render('trip_edit', {
//     title: 'Trips',
//     trip: trip_data
//   });
// });
 
 
// app.get('/routes', function(req, res){
//   res.render('routes', {
//     title: 'Routes'
//   });
// });
 
 
 
// http.createServer(app).listen(app.get('port'), function(){
//   console.log("Express server listening on port " + app.get('port'));
// });


// // exports.signIn = function *() {
// //   var ctx = this;
// //   yield* passport.authenticate("local", function*(err, user, info) {
// //     if (err) {
// //       throw err;
// //     }
// //     if (user === false) {
// //       ctx.status = 401;
// //     } else {
// //       yield ctx.login(user);
// //       ctx.body = { user: user };
// //     }
// //   }).call(this);
// // };

// // exports.getCurrentUser = function *() {
// //   if (this.passport.user) {
// //     this.body = { user: this.passport.user };
// //   }
// //   this.status = 200;
// // };

// // exports.signOut = function *() {
// //   this.logout();
// //   this.session = null;
// //   this.status = 204;
// // };

// // exports.createUser = function *() {
// //   if (!this.request.body) {
// //     this.throw("The body is empty", 400);
// //   }

// //   if (!this.request.body.username) {
// //     this.throw("Missing username", 400);
// //   }
// //   if (!this.request.body.password) {
// //     this.throw("Missing password", 400);
// //   }

// //   var User = require("mongoose").model("User");

// //   try {
// //     var user = new User({ username: this.request.body.username, password: this.request.body.password });
// //     user = yield user.save();
// //     yield this.login(user);
// //   } catch (err) {
// //     this.throw(err);
// //   }

// //   this.status = 200;
// //   this.body = { user: this.passport.user };
// // };
