'use strict';

var UserServerActionCreators = require('../actions/UserServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');
var _ = require('lodash');
var MessagesActions = require('../actions/MessagesActionCreators');


module.exports = {
  me: function( question )
  {
    
      request.get( Constants.Endpoints.ME )
            .query( { question: question })
            
            .end( function( reply )
            {
                if( reply.body.error )
                {
                  MessagesActions.addMessage( reply.body );
                  return;
                }

                if( reply.body.answer )
                {
                    console.log( 'ANSWERRRRRRRRRR', reply.body.answer );

                    return reply.body.answer;
                }

                var user;
                if( reply.body && reply.body.firstName  )
                {
                    user = reply.body;
                    user.loggedIn = true;
                    // self.setState( user );
                    UserServerActionCreators.me( user );
                }

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

                MessagesActions.addMessage( { text: 'Added user!!!' } );

                UserServerActionCreators.addedUser( user );

            } );
  }

};
