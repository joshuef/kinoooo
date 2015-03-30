'use strict';

var Dispatcher = require('flux').Dispatcher;

var _ = require('lodash');

var AppDispatcher = new Dispatcher();

_.extend(AppDispatcher, {

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the server.
   */
  handleServerAction: function(action) {
    var payload = {
      source: 'SERVER_ACTION',
      action: action
    };
    this.dispatch(payload);
  },

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  handleViewAction: function(action) {
    var payload = {
      source: 'VIEW_ACTION',
      action: action
    };
    this.dispatch(payload);
  },


  handleInitAction: function(action) {
    var payload = {
      source: 'INIT_ACTION',
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;
