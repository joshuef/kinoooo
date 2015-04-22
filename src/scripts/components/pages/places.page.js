'use strict';
var React = require('react/addons');

var PlaceForm = require( "./places/placeForm" );
var PlaceList = require( "./places/placeList" );
var PlacesStore = require('../stores/PlacesStore');

var Places = React.createClass({
    contextTypes: 
    {
        router: React.PropTypes.func
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
                    <PlaceForm allPlaces={this.props.places} allShows={this.props.shows}  thisPlace={null} user={this.props.user}/>
                    <PlaceList allPlaces={this.props.places} allShows={this.props.shows}  user={this.props.user}/>
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
    getInitialState: function ( )
    {
        return null;
    },

});


 


module.exports = Places;