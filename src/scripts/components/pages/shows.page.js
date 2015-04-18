'use strict';
var React = require('react/addons');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var MessagesActions = require('../actions/MessagesActionCreators');


var ShowsActions = require('../actions/ShowsActionCreators');
var ShowForm = require( "./shows/showForm" );
var ShowList = require( "./shows/showList" );



var Shows = React.createClass({
 contextTypes: {
    router: React.PropTypes.func
  },
    render: function() {
        var router = this.context.router;
        var params = this.context.router.getCurrentParams();
        var route = this.context.router.getCurrentPath();

        var currentRoutes = this.context.router.getCurrentRoutes();
        var lastRoute = currentRoutes[currentRoutes.length - 1];
        console.log( lastRoute, params );


        // if( ! this.props.user.isAdmin )
        // {
        //     return null;
        // }
        console.log( 'THE USER ADMIN STATE', this.props.user );

        if( params  )
        {
            var currentShow = {
                name: params.showName,
                id: params.showId
            };

                console.log( 'ALL ABOPUTTHE USER IF THEY ARE ADMIN', this.props.user );
                
                console.log( 'THE CURRENT SHOW ISSS' );
                console.log( currentShow );
            if( params.showName && this.props.user && this.props.user.isAdmin  )
            {

                return (
                  <div className='main'>
                        <h1>Edit {currentShow.name}</h1>
                        <ShowForm places={this.props.places} user={this.props.user}/>
                  </div>
                );

            }
            else if ( params.showName ) 
            {
                return (
                  <div className='main'>
                        <h1>About {currentShow.name}</h1>
                  </div>
                );
            };
            
        }


        return (
          <div className='main'>
                <h1>  Shows  </h1>
                <ShowForm places={this.props.places} user={this.props.user}/>
                <ShowList places={this.props.places} shows={this.props.shows}  user={this.props.user}/>
          </div>
        );
    },

    getInitialState: function ( )
    {
        return null;
    }


});



module.exports = Shows;