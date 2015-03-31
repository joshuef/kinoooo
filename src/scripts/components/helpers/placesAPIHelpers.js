'use strict';

var PlacesServerActionCreators = require('../actions/PlacesServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');
var _ = require('lodash');


module.exports = {
  addPlace: function( place )
  {
     request
       .post(Constants.Endpoints.ADD_PLACE)
            .send( place )
            .end( function( reply )
                {
                    var place;                    
                    if( reply.body )
                    {
                        place = reply.body;
                    }
                    
                    PlacesServerActionCreators.added( place );
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
