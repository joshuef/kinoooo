var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;


module.exports = {

  me : function(user) {

    console.log( 'USERACTION__API MEEE', user );
    AppDispatcher.handleServerAction({
      type: ActionTypes.INIT_USER,
      user : user
    });
  },

  loggedInAPI : function(user) {

    console.log( 'USERACTION__API', user );
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGGED_IN_API,
      user : user
    });
  },


  loggedOutAPI : function() {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGGED_OUT_API
    });
  }

};

