'use strict';

var PlacesServerActionCreators = require('../actions/PlacesServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');
var _ = require('lodash');


module.exports = {
  addPlace: function( place )
  {


    console.log( 'ADDING PLACE', place );
     request
       .post('/api/places/add')
            .send( place )
            .end( function( reply )
                {
                    var place;
                    console.log( 'THE PLACE SEZ', reply );
                    
                    if( reply.body )
                    {
                        place = reply.body;
                    }
                  PlacesServerActionCreators.added( place );
                });


     // request.get('/api/me')
     //      .end( function( reply )
     //      {
     //          var user;
     //          if( reply.body && reply.body.firstName  )
     //          {
     //              user = reply.body;
     //              user.loggedIn = true;
     //              // self.setState( user );
     //              PlacesServerActionCreators.added( user );
     //          }


     //          // console.log( user );
     //      });
  }

};
