var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;
var userAPIHelpers = require('../helpers/userAPIHelpers');


module.exports = {

  me : function ()
  {
      userAPIHelpers.me();
  },
  login : function ()
  {
      userAPIHelpers.login();
  },
  logout : function ()
  {
      userAPIHelpers.logout();
  },

};

