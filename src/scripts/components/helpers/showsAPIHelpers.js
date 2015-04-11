'use strict';

var ShowsServerActionCreators = require('../actions/ShowsServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');
var _ = require('lodash');
var MessagesActions = require('../actions/MessagesActionCreators');


module.exports = {
  addShow: function( show )
  {
    request
       .post(Constants.Endpoints.ADD_SHOW)
            .send( show )
            .end( function( reply )
                {
                    if( reply.body.error )
                    {
                        console.log( 'ERRORR WITH SHOWWW' );
                        MessagesActions.addMessage( reply.body );
                        return;
                    }

                    var show;                    
                    if( reply.body )
                    {
                        show = reply.body;
                    }
                    
                    MessagesActions.addMessage( {text: 'Added Show',
                    action: show.name } );

                    ShowsServerActionCreators.added( show );
                });


  },
  getAllShows : function ( )
  {
     request
       .get(Constants.Endpoints.SHOWS)
        .end( function ( reply )
        {
            var shows = reply.body.shows;
            ShowsServerActionCreators.addedAllShows( shows );

        });
  }

};
