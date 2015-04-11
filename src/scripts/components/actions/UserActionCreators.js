'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;
var userAPIHelpers = require('../helpers/userAPIHelpers');


module.exports = {

  me : function ()
  {
      userAPIHelpers.me();
  },
  login : function ( user )
  {
    console.log( 'ACTIONCREATOR', user );
      userAPIHelpers.login( user );
  },
  logout : function ()
  {
      userAPIHelpers.logout();
  },
  addUser : function ( user )
  {
    userAPIHelpers.addUser( user );
  },
  getAllUsers : function (  )
  {
    userAPIHelpers.getAllUsers(  );
  }

};

