'use strict';


var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var moment = require( "moment" );
var CHANGE_EVENT = 'change';

var _shows = [];

var ShowsStore = _.extend({}, EventEmitter.prototype, {

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

  /**
   * @param {function} callback
   */
   addChangeListener: function(callback) {
   	this.on(CHANGE_EVENT, callback);
   },


   getAllShows: function() 
   {
   	    console.log( 'getting all shows in store', _shows );
   	    return _.clone(_shows);
   }, 

   getShowByNameOrId: function( showIdOrName ) 
   {
        var show = _.findWhere(_shows, { _id: showIdOrName });

        if( ! show )
        {
          show = _.findWhere(_shows, { name: showIdOrName });

        }

       	console.log( 'getting a specific show,', showIdOrName, _shows, show );

       	return show;
   },

   filterShowsByTime: function( time )
   {
        console.log( 'THE TIME OF FILTERING IS', _shows );

        var filteredShows = _.filter( _shows, function( show, i)
            {
                // console.log( 'filter show', show.name );

                console.log( 'showshow', showHour );
                //we only care about hours here SORT IT
                var showMoment = moment( show.startTime );
                var showHour = showMoment.hour();
                console.log( 'showHour', showHour );
                // console.log( 'filter', showMoment );

                var nowHour = time.hour();
                console.log( 'show NOW HOUR', nowHour );
                // console.log( 'VALID TIME?', showMoment );
                var isItStillToCome = showHour >= nowHour;
                console.log( 'show filter IS IT?', isItStillToCome );
                // return moment( show.startTime ).isAfter( time, 'hour' );
                return isItStillToCome;
            });

        return filteredShows;

   },


  // getBasicPlace: function() {
  //   return _.pick(_shows, ['_id', 'firstName', 'lastName', 'email']);
  // }

});

var makeTimesMoments = function( shows )
{
    _.each( shows, function( show, i )
    {

        _.each( show.showingAt, function( placeTime, i )
        {
            if( ! moment.isMoment( placeTime.time ) )
            {
                placeTime.time = moment( placeTime.time, "YYYY-MM-DD HH:mm" );

            }
        });

    } );

};

ShowsStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.type) {

		case ActionTypes.INIT_SHOW:
			//is here where we check itsunique?
			_.extend(_shows, action.show );
			ShowsStore.emitChange();
			break;


		case ActionTypes.SHOWS:

            makeTimesMoments( action.shows );
			console.log( 'SHOWS AFTER SERVER RESPONSE?', action.shows );
			//is here where we check itsunique?
			_.extend(_shows, action.shows );
			console.log( 'THEN THE SHOWS IN THE STORE', _shows );
			ShowsStore.emitChange();
			break;

		case ActionTypes.CREATED_SHOW:
			
			_shows.push( action.show );


			ShowsStore.emitChange();

			break;

		case ActionTypes.UPDATED_SHOW:

			console.log( 'SHOW UPDATINGG wow', action.show );
			_.extend(_shows, action.show );

			ShowsStore.emitChange();

			break;




		default:
	  // do nothing
	}

});

module.exports = ShowsStore;
