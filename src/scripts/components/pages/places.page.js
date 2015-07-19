'use strict';
var React = require('react/addons');

var PlaceForm = require( "./places/placeForm" );
var PlaceList = require( "./places/placeList" );
var PlacesStore = require('../stores/PlacesStore');
var _ = require('lodash');

var mui = require('material-ui');
var DropDownMenu = mui.DropDownMenu;

var Places = React.createClass({
    contextTypes: 
    {
        router: React.PropTypes.func
    },
    componentWillMount : function()
    {
        console.log( 'prepage props', this.props );
        if( this.props.places )
        {
            this.setState( { places: this.props.places })
        }

    },

    componentWillReceiveProps : function()
    {
        //should check for any filters and reapply first
        if( this.props.places )
        {
            this.setState( { places: this.props.places })
        }

    },

    render: function() {


        //not all are needed here
        var router = this.context.router;
        var params = this.context.router.getCurrentParams();
        var route = this.context.router.getCurrentPath();

        var currentRoutes = this.context.router.getCurrentRoutes();
        var lastRoute = currentRoutes[currentRoutes.length - 1];


        console.log( 'PLACESS', lastRoute );
        console.log( 'PLACES params', params );


        var sortOptions = [
               { payload: '2', text: 'A-ZZZZ' },
               { payload: '3', text: 'Z-A' },
               {payload: 'location', text: 'By Location' },
               // { payload: '3', text: 'Weeknights' },
               // { payload: '4', text: 'Weekends' },
               // { payload: '5', text: 'Weekly' },
            ];

        if( this.state.places.length < 1 )
        {
            return false;
        }
        
        //should this be in get inital state? I GUESS SO
        if( params.placeName )
        {
            console.log( 'PARAM PLACENAME', params );

            //need to decode the URI here.
            var currentPlace = params.placeId || params.placeName;

            //perhaps this should be grtabbed from a places object in props
            currentPlace = PlacesStore.getPlaceByNameOrId( currentPlace );

        }


        if( currentPlace )
        {
            // console.log( 'NAE PLACE AND SO?' );
            console.log( 'PARAM PLACENAME current', currentPlace );

            if( this.props.user && this.props.user.isAdmin  )
            {                
                //EDITING
                return (
                  <div className='main'>
                        <h1>Edit {currentPlace.name}</h1>
                        <PlaceForm allShows={this.props.shows} thisPlace={currentPlace}  user={this.props.user}/>
                  </div>
                );

            }
            else if ( params.placeName ) 
            {
               return (
                  <div className='main'>
                        <h1>About {currentPlace.name}</h1>
                  </div>
                );
            }
        }            
        else
        {
            //no placename or id found, so lets filter by that. Does that make sense?

            return (
              <div className='main'>
                    <h1>Places</h1>
                    <DropDownMenu
                    menuItems={sortOptions}
                    onChange={this.sortTheList}
                    ref="sortDropdown" /> 
                    <PlaceForm allPlaces={this.state.places} allShows={this.props.shows}  thisPlace={null} user={this.props.user}/>
                    <PlaceList allPlaces={this.state.places} allShows={this.props.shows} filter={params.placeName}  user={this.props.user}/>
              </div>
            );
        }

        // return (
        //   <div className='main'>
        //         <h1> Places  </h1>
        //         <PlaceForm user={this.props.user}/>
        //         <PlaceList places={this.props.places} />
        //   </div>
        // );
    },
    sortTheList : function( e, selectedIndex, menuItem )
    {
        console.log( 'sortingggg' );
        var userLocation =  this.props.user.location;

        if( !userLocation )
        {
            return;
        }
   
        if( menuItem.payload === 'location' && userLocation )
        {
            var sortedPlaces = PlacesStore.getPlacesByProximity( userLocation );
            console.log( 'SORTED PLACES', sortedPlaces );
            this.setState( { places: sortedPlaces } );
        }

    },
    getInitialState: function ( )
    {
        if( this.props && this.props.places )
        {
            return { places: this.props.places };
        }
        else
        {
            return null;
        }
    },

});


 


module.exports = Places;