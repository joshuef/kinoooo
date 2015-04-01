'use strict';

var ShowsServerActionCreators = require('../actions/ShowsServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');
var _ = require('lodash');


module.exports = {
  addShow: function( show )
  {
     request
       .post(Constants.Endpoints.ADD_SHOW)
            .send( show )
            .end( function( reply )
                {
                    var show;                    
                    if( reply.body )
                    {
                        show = reply.body;
                    }
                    
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
