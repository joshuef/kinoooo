'use strict';


var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _places = [];

var PlacesStore = _.extend({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  
  getAllPlaces: function() {
    console.log( 'getting all places', _places );
    return _.clone(_places);
  },


  // getBasicPlace: function() {
  //   return _.pick(_places, ['_id', 'firstName', 'lastName', 'email']);
  // }

});


PlacesStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;


  console.log( 'places dispatcher happens??', action );
  switch(action.type) {

    case ActionTypes.INIT_PLACE:
        //is here where we check itsunique?
      _.extend(_places, action.place );
      PlacesStore.emitChange();
      break;


    case ActionTypes.PLACES:
    console.log( 'PLACES AFTER SERVER RESPONSE?', action.places );
        //is here where we check itsunique?
      _.extend(_places, action.places );
      PlacesStore.emitChange();
      break;


    // case ActionTypes.GOT_LOCATION:
    //   _places.geolocation =  action.position;
    //   PlacesStore.emitChange();
    //   break;


    case ActionTypes.CREATED_PLACE:
      // _places.loggedIn = true;
      
      console.log( 'AND IN CREATING A PLACE', action.place );
      console.log( 'Already', _places );

      // _places.

      // if(_places.servicePlaceId === action.places.servicePlaceId) {
      //   // _places._id = action.places._id;
      //   _places = action.places;
      // }
      PlacesStore.emitChange();

      // localStorage.setItem('places', JSON.stringify(_places));
      break;


   

    default:
      // do nothing
  }

});

module.exports = PlacesStore;
