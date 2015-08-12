var keyMirror = require('react/lib/keyMirror');
var apiServer = '';

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_EVENTS: null,
    // GOT_LOCATION: null,
    INIT_USER: null,
    CREATED_USER: null,
    GOT_USER_LOCATION: null,
    CREATED_PLACE: null,
    UPDATED_PLACE: null,
    PLACES: null,
    CREATED_SHOW: null,
    UPDATED_SHOW: null,
    SHOWS: null,
    LOGGED_OUT_API: null,
    LOGGED_IN_API: null,
    ADD_MESSAGE: null
  }),


  Endpoints: {
    LOGOUT: apiServer + '/api/logout',
    LOGIN: apiServer + '/api/login',
    ADD_USER: apiServer + '/api/users/add',
    ME: apiServer + '/api/me',
    ADD_PLACE: apiServer + '/api/places/add',
    PLACES: apiServer + '/api/places',
    SHOWS: apiServer + '/api/shows',
    ADD_SHOW: apiServer + '/api/shows/add',
    // EVENTS: '/api/events',
  }

  // PayloadSources: keyMirror({
  //   SERVER_ACTION: null,
  //   VIEW_ACTION: null
  // })

};
