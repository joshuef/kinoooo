'use strict';

var PlacesServerActionCreators = require('../actions/PlacesServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');
var _ = require('lodash');
var MessagesActions = require('../actions/MessagesActionCreators');


module.exports = {
	addPlace: function( place )
	{
		request
		.post(Constants.Endpoints.ADD_PLACE)
		.send( place )
		.end( function( reply )
		{
			// console.log( 'PLACETHING', reply );
			if( reply.body.error )
			{
				console.log( 'ERRORR WITH addine place' );
				MessagesActions.addMessage( reply.body );
				return;
			}

			var place;                    
			if( reply.body )
			{
				place = reply.body;
			}

			PlacesServerActionCreators.added( place );

			MessagesActions.addMessage( {text: 'Added Place',
			action: place.name } );
		});



	},
	updatePlace: function( place )
	{
		request
		.post(Constants.Endpoints.PLACES + '/' + place._id )
		.send( place )
		.end( function( reply )
		{
			if( reply.body.error )
			{
				console.log( 'ERRORR WITH PLACE' );
				MessagesActions.addMessage( reply.body );
				return;
			}

			var place;                    
			if( reply.body )
			{
				place = reply.body;
			}

			MessagesActions.addMessage( {text: 'Updated Place',
				action: place.name } );

			PlacesServerActionCreators.updated( place );
		});


	},
	getAllPlaces : function ( )
	{
		request
		.get(Constants.Endpoints.PLACES)
		.end( function ( reply )
		{
			var places = reply.body.places;
			PlacesServerActionCreators.addedAllPlaces( places );

		});
	}

};
