'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
Constants = require('../constants/Constants'),
ActionTypes = Constants.ActionTypes;


module.exports = {

	added : function( place ) {
		AppDispatcher.handleServerAction({
			type: ActionTypes.CREATED_PLACE,
			place  : place 
		});
	},
	updated : function( place ) {
		AppDispatcher.handleServerAction({
			type: ActionTypes.UPDATED_PLACE,
			place  : place 
		});
	},
	addedAllPlaces : function( places ) {

		AppDispatcher.handleServerAction({
			type: ActionTypes.PLACES,
			places  : places 
		});
	}

};

