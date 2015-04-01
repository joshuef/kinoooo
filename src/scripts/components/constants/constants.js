var keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_EVENTS: null,
    // GOT_LOCATION: null,
    INIT_USER: null,
    // CREATE_EVENT: null,
    CREATED_PLACE: null,
    PLACES: null,
    CREATED_SHOW: null,
    SHOWS: null,
    LOGGED_OUT_API: null,
    LOGGED_IN_API: null
  }),


  Endpoints: {
    LOGOUT: '/api/logout',
    LOGIN: '/api/login',
    ME: '/api/me',
    ADD_PLACE: '/api/places/add',
    PLACES: '/api/places',
    SHOWS: '/api/shows',
    ADD_SHOW: '/api/shows/add',
    // EVENTS: '/api/events',
  }

  // PayloadSources: keyMirror({
  //   SERVER_ACTION: null,
  //   VIEW_ACTION: null
  // })

};
