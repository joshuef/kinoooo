'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;


module.exports = {

  added : function(show ) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CREATED_SHOW,
      show  : show 
    });
  },
  addedAllPlaces : function( shows ) {

    AppDispatcher.handleServerAction({
      type: ActionTypes.SHOWS,
      shows  : shows 
    });
  }

};

