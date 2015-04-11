'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;


module.exports = {

  addMessage : function( message ) {
    var current_date = (new Date()).valueOf().toString();
    console.log( 'MESSAGE BEING ADDED', message );
    message._id =  current_date;
    AppDispatcher.handleServerAction({
      type: ActionTypes.ADD_MESSAGE,
      message  : message 
    });
  }

};

