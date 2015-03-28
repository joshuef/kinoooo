var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _user = {
  loggedIn : false,
};

var UserStore = _.extend({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    return _user.loggedIn;
  },

  getToken: function() {
    return _user.accessToken || false;
  },


  getUser: function() {

    return _.clone(_user);
  },

  getUserId: function() {
    return _user._id || false;
  },

  getBasicUser: function() {
    return _.pick(_user, ['_id', 'firstName', 'lastName', 'email']);
  }

});


UserStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;


  console.log( 'dispatcher happens??', action );
  switch(action.type) {

    case ActionTypes.INIT_USER:
      _.extend(_user, action.user);
      UserStore.emitChange();
      break;


    // case ActionTypes.GOT_LOCATION:
    //   _user.geolocation =  action.position;
    //   UserStore.emitChange();
    //   break;


    case ActionTypes.LOGGED_IN_API:
      _user.loggedIn = true;
      console.log( 'AND IN ACTION', _user );
      if(_user.serviceUserId === action.user.serviceUserId) {
        // _user._id = action.user._id;
        _user = action.user;
      }
      UserStore.emitChange();

      // localStorage.setItem('user', JSON.stringify(_user));
      break;


    case ActionTypes.LOGGED_OUT_API:
      _user.loggedIn = false;
      _user.name = null;

      UserStore.emitChange();

      break;

    default:
      // do nothing
  }

});

module.exports = UserStore;
