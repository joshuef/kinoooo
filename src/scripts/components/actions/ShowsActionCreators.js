'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;
var showsAPIHelpers = require('../helpers/showsAPIHelpers');


module.exports = {

  addShow : function ( show )
  {
    showsAPIHelpers.addShow( show );
  },
  updateShow : function ( show )
  {
    showsAPIHelpers.updateShow( show );
  },
  getAllShows : function (  )
  {
    showsAPIHelpers.getAllShows(  );
  }
};

