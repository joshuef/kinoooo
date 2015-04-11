'use strict';

var UserServerActionCreators = require('../actions/UserServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');
var _ = require('lodash');
var MessagesActions = require('../actions/MessagesActionCreators');


module.exports = {
  me: function( )
  {
    request.get(Constants.Endpoints.ME)
        .end( function( reply )
        {
            if( reply.body.error )
            {
                MessagesActions.addMessage( reply.body );
                return;
            }

            var user;
            if( reply.body && reply.body.firstName  )
            {
                user = reply.body;
                user.loggedIn = true;
                  // self.setState( user );
                UserServerActionCreators.me( user );
            }


              // console.log( user );
        });
  },
  login: function( user ) {   
    console.log( 'LOGGING IN', user );
    request
     .post(Constants.Endpoints.LOGIN)
      .send( _.omit( user, 'loggedIn' ) )
      .end(function( reply ) {
        console.log( 'reply',reply );
        var user;
        if( reply.body.error )
        {
            MessagesActions.addMessage( reply.body );
            return;
        }

        if( reply.body && reply.body.firstName )
        {
            user = reply.body;
            user.loggedIn = true;
        }

        // this.setState( reply.body );
        MessagesActions.addMessage( {text: 'Logged in', action: 'cool.' });

        UserServerActionCreators.loggedInAPI( user );
      });
  },
  logout: function() {
    var self = this;
        request
           .get(Constants.Endpoints.LOGOUT)

      .end(function() {
        UserServerActionCreators.loggedOutAPI();
      });
  },
  addUser : function( user )
  {
    request
       .post(Constants.Endpoints.ADD_USER)
            .send( user )
            .end( function( reply )
            {
                if( reply.body.error )
                {
                    console.log( 'ERROR WITH ADDING USER' );
                    MessagesActions.addMessage( reply.body );
                    return;
                }

                UserServerActionCreators.addedUser( user );

            } );
  }

};
