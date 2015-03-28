var UserServerActionCreators = require('../actions/UserServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');
var _ = require('lodash');
// var Passport = require( 'hapi-passport' );


module.exports = {
  me: function( )
  {
     request.get('/api/me')
          .end( function( reply )
          {
              if( reply.body && reply.body.firstName  )
              {
                  user = reply.body;
                  user.loggedIn = true;
                  // self.setState( user );
                  UserServerActionCreators.me( user );
              }


              // console.log( user );
          })
  },
  login: function() {
    request
     .post(Constants.Endpoints.LOGIN)
      .send( _.omit( this.state, 'loggedIn' ) )
      // .end( this.loginSuccess );
    // request
    //   .del(Constants.Endpoints.LOGOUT)
    //   .on('error', function(err) {
    //     console.error('API Logout Error', err);
    //   })
      .end(function( response ) {
        if( response.body && response.body.firstName )
        {
            var user = response.body;
            user.loggedIn = true;
        }

        // this.setState( response.body );

        UserServerActionCreators.loggedInAPI( user );
      });
  },
  logout: function() {
    var self = this;
        request
           .get(Constants.Endpoints.LOGOUT)
            // .end( function( reply )
            //     {
            //         // self.setState( self.defaultState );
            //     });


    // request
    //   .del(Constants.Endpoints.LOGOUT)
    //   .on('error', function(err) {
    //     console.error('API Logout Error', err);
    //   })
      .end(function() {
        UserServerActionCreators.loggedOutAPI();
      });
  }

};
