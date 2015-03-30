'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;


module.exports = {

  added : function(place ) {

    // console.log( 'USERACTION__API MEEE', place  );
    AppDispatcher.handleServerAction({
      type: ActionTypes.CREATED_PLACE,
      place  : place 
    });
  },
  addedAllPlaces : function( places ) {

    // console.log( 'USERACTION__API MEEE', place  );
    AppDispatcher.handleServerAction({
      type: ActionTypes.PLACES,
      places  : places 
    });
  }

};

