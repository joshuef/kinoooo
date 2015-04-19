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
  
       	console.log( 'getting all places from store', _places );
       	return _.clone(_places);
   },


   getPlaceByNameOrId: function( placeIdOrName ) 
   {
        console.log( 'getting a specific place,', placeIdOrName, _places );
        var place = _.findWhere(_places, { _id: placeIdOrName });

        if( ! place )
        {
            place = _.findWhere(_places, { name: placeIdOrName });

        }

        return place;
   },



  // getBasicPlace: function() {
  //   return _.pick(_places, ['_id', 'firstName', 'lastName', 'email']);
  // }

});


PlacesStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

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


		case ActionTypes.CREATED_PLACE:

			_places.push( action.place );
			PlacesStore.emitChange();

			break;

		case ActionTypes.UPDATED_PLACE:

			_places.push( action.place );
			PlacesStore.emitChange();

			break;




		default:
	  // do nothing
	}

});

module.exports = PlacesStore;
