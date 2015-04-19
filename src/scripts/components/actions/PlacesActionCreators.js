'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
Constants = require('../constants/Constants'),
ActionTypes = Constants.ActionTypes;
var placesAPIHelpers = require('../helpers/placesAPIHelpers');


module.exports = {

	addPlace : function ( place )
	{
		placesAPIHelpers.addPlace( place );
	},
	updatePlace : function ( place )
	{
		placesAPIHelpers.updatePlace( place );
	},
	getAllPlaces : function (  )
	{
		placesAPIHelpers.getAllPlaces(  );
	}
};

