var keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_EVENTS: null,
    // GOT_LOCATION: null,
    INIT_USER: null,
    // CREATE_EVENT: null,
    // CREATED_EVENT: null,
    LOGGED_OUT_API: null,
    LOGGED_IN_API: null
  }),


  Endpoints: {
    LOGOUT: '/api/logout',
    LOGIN: '/api/login',
    ME: '/api/me',
    // EVENT: '/api/event',
    // EVENTS: '/api/events',
  }

  // PayloadSources: keyMirror({
  //   SERVER_ACTION: null,
  //   VIEW_ACTION: null
  // })

};
