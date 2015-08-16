'use strict';


var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Geolib = require( 'geolib' );

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
  
        return _.clone(_places);
   },

   getPlacesByProximity: function( location ) {

        // coords object
// Geolib.orderByDistance({latitude: 51.515, longitude: 7.453619}, {
        var sortedByProximity = Geolib.orderByDistance( location, _places);
        
        _.each( sortedByProximity, function( sortInfo )
        {
            _places[ sortInfo.key ].distance = sortInfo.distance;

        });
  
        // homes.sort(sort_by('price', true, parseInt));

       	return _.clone( _places ).sort(this.sort_by('distance', false, parseInt));
   },


   sort_by : function(field, reverse, primer){
    console.log( 'SORTING' );
       var key = primer ? 
           function(x) { return primer(x[field]); } : 
           function(x) { return x[field]; };

       reverse = !reverse ? 1 : -1;

       return function (a, b) {
           return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
         } ;
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
