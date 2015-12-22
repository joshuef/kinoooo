'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
Constants = require('../constants/Constants'),
ActionTypes = Constants.ActionTypes;


module.exports = {

	added : function(show ) {
		console.log( 'SHOW IN THE ADDING', show );
		AppDispatcher.handleServerAction({
			type: ActionTypes.CREATED_SHOW,
			show  : show 
		});
	},
	updated : function(show ) {
		console.log( 'SHOW Updated', show );
		AppDispatcher.handleServerAction({
			type: ActionTypes.UPDATED_SHOW,
			show  : show 
		});
	},
	addedAllShows : function( shows ) {

		AppDispatcher.handleServerAction({
			type: ActionTypes.SHOWS,
			shows  : shows 
		});
	}

};

