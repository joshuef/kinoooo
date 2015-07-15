'use strict';
var React = require('react/addons');
var _ = require( "lodash" );

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var MessagesActions = require('../actions/MessagesActionCreators');
var moment = require( "moment" );

var ShowsActions = require('../actions/ShowsActionCreators');
var ShowsStore = require('../stores/ShowsStore');
var ShowForm = require( "./shows/showForm" );
var ShowList = require( "./shows/showList" );



var Shows = React.createClass({
 contextTypes: {
    router: React.PropTypes.func
  },
    componentWillMount :function () 
    {
        if( !this.props.filteredShows )
        {
            console.log( 'NO FILTERED SHOWS',this.props.allShows );
            this.setState( { 
                filteredShows: this.props.allShows
            });

        }
    },
    filter: function( e )
    {
        console.log( 'FILTERRRR' );
        e.preventDefault();

        var todaysShowsStillToCome = ShowsStore.filterShowsByTime( moment() );

        this.setState(
        {
            filteredShows: todaysShowsStillToCome
        });

    },
    clearFilters: function( e )
    {
        console.log( 'CLEARRRFILTERRRR' );
        e.preventDefault();

        this.setState(
        {
            filteredShows: this.props.allShows
        });
        // var todaysShowsStillToCome = ShowsStore.filterShowsByTime( moment() );

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
                        <ShowForm thisShow={currentShow} allPlaces={this.props.places} user={this.props.user}/>
                  </div>
                );

            }
            else if ( ! _.isUndefined( currentShow ) && currentShow.name ) 
            {
               return (
                  <div className='main'>
                        <h1>About {currentShow.name}</h1>
                        <span>more to come here, right now no info to show</span>
                  </div>
                );
            }
            
        }
        else
        {
            return (
              <div className='main'>
                    <h1>  Shows on TODAY ONLY (right now filtered by date or so) </h1>
                    <ShowForm allPlaces={this.props.places} thisShow={null} user={this.props.user}/>
                    <RaisedButton label="FilterByDate" onClick={this.filter}/>
                    <RaisedButton label="Clear Filters" onClick={this.clearFilters}/>
                    <ShowList allPlaces={this.props.places} filteredShows={this.state.filteredShows} allShows={this.props.shows}  user={this.props.user}/>
              </div>
            );
        }

    }


});



module.exports = Shows;