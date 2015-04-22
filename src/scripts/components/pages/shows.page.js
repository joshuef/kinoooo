'use strict';
var React = require('react/addons');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var MessagesActions = require('../actions/MessagesActionCreators');


var ShowsActions = require('../actions/ShowsActionCreators');
var ShowsStore = require('../stores/ShowsStore');
var ShowForm = require( "./shows/showForm" );
var ShowList = require( "./shows/showList" );



var Shows = React.createClass({
 contextTypes: {
    router: React.PropTypes.func
  },
    render: function() {
        console.log( 'SHOWPAGE', this.props );
        //not all are needed here
        var router = this.context.router;
        var params = this.context.router.getCurrentParams();
        var route = this.context.router.getCurrentPath();

        var currentRoutes = this.context.router.getCurrentRoutes();
        var lastRoute = currentRoutes[currentRoutes.length - 1];

        if( params.showName )
        {

            var currentShow = params.showId || params.showName;
     

            //perhaps this should be grtabbed from a shows object in props
            currentShow = ShowsStore.getShowByNameOrId( currentShow );


            if( this.props.user && this.props.user.isAdmin  )
            {                
                //EDITING
                return (
                  <div className='main'>
                        <h1>Edit {currentShow.name}</h1>
                        <ShowForm show={currentShow} places={this.props.places} user={this.props.user}/>
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
            }
            
        }
        else
        {
            return (
              <div className='main'>
                    <h1>  Shows  </h1>
                    <ShowForm places={this.props.places} show={null} user={this.props.user}/>
                    <ShowList places={this.props.places} shows={this.props.shows}  user={this.props.user}/>
              </div>
            );
        }

    },

    getInitialState: function ( )
    {
        return null;
    }


});



module.exports = Shows;