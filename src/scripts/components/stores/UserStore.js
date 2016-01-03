'use strict';


var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _user = {
  loggedIn : false,
};

var _users = [];

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

  userHasLocation: function() {
    if( _user.location && _user.location.coords )
    {
      return true;
      
    }
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


    case ActionTypes.ADDED_USER:
      _.extend(_users, action.user);
      UserStore.emitChange();
      break;

    case ActionTypes.GOT_USER_LOCATION:
      _.extend( _user, action.user );
      UserStore.emitChange();
      break;


    case ActionTypes.LOGGED_IN_API:

      _user = action.user;
      _user.loggedIn = true;

      if( action.user.userType === 'admin' )
      {
        console.log( 'OUR ADMIN GUYYYYY' );
        _user.isAdmin = true;
      }
      
      console.log( 'AND IN ACTION guy', _user );

      UserStore.emitChange();

      // localStorage.setItem('user', JSON.stringify(_user));
      break;


    case ActionTypes.LOGGED_OUT_API:
      // _user.loggedIn = false;
      _user = {};

      UserStore.emitChange();

      break;

    default:
      // do nothing
  }

});

module.exports = UserStore;