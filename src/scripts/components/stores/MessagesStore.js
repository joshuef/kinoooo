'use strict';


var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _messages = [];

var MessagesStore = _.extend({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  
  getAllMessages: function() {
    console.log( 'getting all messages in store', _messages );
    return _.clone(_messages);
  },

  getLatestMessage: function() {
    var lastMessage = _.last(_messages);

    console.log( 'getting message', lastMessage );
    if( ! lastMessage )
    {
      lastMessage = {
        text: 'no', 
        action: 'thing'
      };
    }
    console.log( 'getting latest message', _.last(_messages) );
    return lastMessage;
  },


  // getBasicPlace: function() {
  //   return _.pick(_messages, ['_id', 'firstName', 'lastName', 'email']);
  // }

});


MessagesStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;


  console.log( 'messages dispatcher happens??', action );
  switch(action.type) {

    case ActionTypes.ADD_MESSAGE:
        //is here where we check itsunique?
      // _.extend(_messages, action.message );

      _messages.push( action.message );
        console.log( 'ADDING MESSAGE', action.message, _messages );
      MessagesStore.emitChange();
      break;


    // case ActionTypes.MESSAGES:
    // console.log( 'MESSAGES AFTER SERVER RESPONSE?', action.messages );
    //     //is here where we check itsunique?
    //   _.extend(_messages, action.messages );
    //   console.log( 'THEN THE MESSAGES IN THE STORE', _messages );
    //   MessagesStore.emitChange();
    //   break;


    // case ActionTypes.CREATED_MESSAGE:
 
    //      _messages.push( action.message );


    //     MessagesStore.emitChange();

    //   break;


   

    default:
      // do nothing
  }

});

module.exports = MessagesStore;
