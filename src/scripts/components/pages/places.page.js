'use strict';
var React = require('react/addons');

var PlaceForm = require( "./places/placeForm" );
var PlaceList = require( "./places/placeList" );
var PlacesStore = require('../stores/PlacesStore');

var mui = require('material-ui');
var DropDownMenu = mui.DropDownMenu;

var Places = React.createClass({
    contextTypes: 
    {
        router: React.PropTypes.func
    },
    // componentWillMount :function()
    // {

    //     if( this.props && this.props.places )
    //     {

    //         this.setState( { places: this.props.places } );
    //     // console.log( 'PAGE STATE ALL PLACES', this.state );
    //     }

    // },
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
               { payload: '2', text: 'A-Z' },
               { payload: '3', text: 'Z-A' },
               {payload: 'location', text: 'By Location' },
               // { payload: '3', text: 'Weeknights' },
               // { payload: '4', text: 'Weekends' },
               // { payload: '5', text: 'Weekly' },
            ];
        
        //should this be in get inital state? I GUESS SO
        if( params.placeName )
        {
            console.log( 'PARAM PLACENAME', params );

            var currentPlace = params.placeId || params.placeName;
     

            //perhaps this should be grtabbed from a places object in props
            currentPlace = PlacesStore.getPlaceByNameOrId( currentPlace );

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

            return (
              <div className='main'>
                    <h1>Places</h1>
                    <PlaceForm allPlaces={this.state.places} allShows={this.props.shows}  thisPlace={null} user={this.props.user}/>
                    <DropDownMenu
                    menuItems={sortOptions}
                    onChange={this.sortTheList}
                    ref="sortDropdown" /> 
                    <PlaceList allPlaces={this.state.places} allShows={this.props.shows}  user={this.props.user}/>
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
        console.log( 'SORTING PLACES', selectedIndex, menuItem );
        var userLocation = this.props.user.location;
        if( userLocation )
        {
            userLocation = this.props.user.location.coords;

        }

        
        if( menuItem.payload === 'location' && userLocation )
        {
            var sortedPlaces = PlacesStore.getPlacesByProximity( userLocation );
            console.log( 'SORTED PLACES', sortedPlaces );
            this.setState( { places: sortedPlaces } )
        }

        // console.log( 'SORTED?', this.state );
    },
    getInitialState: function ( )
    {
        if( this.props && this.props.places )
        {
            return { places: this.props.places } ;

            // this.setState( { places: this.props.places } );
        // console.log( 'PAGE STATE ALL PLACES', this.state );
        }
        else
        {
            return null;
        }
    },

});


 


module.exports = Places;