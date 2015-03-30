'use strict';
var React = require('react/addons');

var PlacesActionCreators = require('../actions/PlacesActionCreators');

var mui             = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField    = mui.TextField;
var _ = require('lodash');
var GoogleMapsLoader = require('google-maps');      // only for common js environments

// 
var page = document.getElementById( 'js-page' );
var PlacesStore = require('../stores/PlacesStore');


var PlaceForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    render: function() {

        return (
            <form className='place-form'>
                <h2>Add Place</h2>
                <TextField
                hintText="The Globe Theatre"
                floatingLabelText="place name"
                valueLink={this.linkState('name')} />  
                <TextField
                hintText="About the place"
                floatingLabelText="place description"
                valueLink={this.linkState('description')} />  
                <TextField
                hintText="Image link"
                floatingLabelText="image link"
                valueLink={this.linkState('image')} />    
                <TextField
                id="js-venue-search"
                alueLink={this.linkState('venue')} /> 

                
                <RaisedButton label="Add Place" onClick={this.addPlace}/>


            </form>
        );
    },
    componentDidMount : function( )
    {
        var self = this;

        var autocompleteOpts = {
          types: ['establishment']
        };

        var autoInput =  document.getElementById('js-venue-search');

        GoogleMapsLoader.LIBRARIES = ['places'];

        GoogleMapsLoader.load(function(google) {
            console.log( 'map loooaddder' );

            self.autocomplete =  new google.maps.places.Autocomplete(autoInput, autocompleteOpts);
            google.maps.event.addListener( self.autocomplete, 'place_changed', self._onGoogleVenueChange);
        });
        

    },

    _onGoogleVenueChange: function() 
    {
        var place = this.autocomplete.getPlace();

        // forbid places that don't exist on google maps
        if(!place.place_id) {
        return;
        }

        this.setState( { 'venue': place } );
        this.setState( { 'name': place.name } );
        // console.log( 'PLACE?', place );
        // this.setState({ venue: place });
    },

    getInitialState: function ( )
    {
        return { 
           
        };
    },
    addPlace : function ( e )
    {
        e.preventDefault();

        console.log( 'THE STATE BEFORE SENINDDD', this.state );
        PlacesActionCreators.addPlace( this.state );

        this.setState( this.defaultState );

    }


});



var getPlacesState = function () {

    var places = PlacesStore.getAllPlaces();
    console.log( 'AND THE PLACES WE GET?', places );
    // console.log( 'GETTING APP STATE', UserStore.getUser() );
  return {
    places: places
  };
};


var Places = React.createClass({
    render: function() {

        return (
          <div className='main'>
                <h1> Places  </h1>
                <RaisedButton label="grab places" onClick={this.getPlaces}/>
                <div ref="showPlaces">{this.state}</div>
                <PlaceForm />
          </div>
        );
    },
    getInitialState: function ( )
    {
        return { placeText : 'no places' };
    },

   componentDidMount: function() {

    console.log( 'here we check for the user' );

    // EventsStore.addChangeListener(this._onChange);
    PlacesStore.addChangeListener(this._onChange);
  },
    _onChange: function() {

    console.log( 'PLACES CHANGED' );
    this.setState(getPlacesState());

    console.log( 'THE STATE AFTER', this.state );

  },

    getPlaces : function ( )
    {

        PlacesActionCreators.getAllPlaces(  );

        // console.log( '"CLICKING"' );
        //  request
        //    .get('/api/places')
        //     .end( this.showPlaces );

    },

    showPlaces : function( response )
    {
        // console.log(  'YESS', response.text  );
        // this.setState({placeText: response.text});
        // this.refs.showPlaces.getDOMNode();
                // console.log( 'ANDSO?', res );
        // var places
    }

});



  // componentDidMount: function() {
  //   // var venueEl = this.getDOMNode().getElementsByClassName('js-venue-search')[0];

  //   // this.autocomplete = new google.maps.places.Autocomplete(venueEl, autocompleteOpts);
  //   // set bounds to the user's location
  //   // if (navigator.geolocation) {
  //   //   navigator.geolocation.getCurrentPosition(_.bind(function(position) {
  //   //     var geolocation = new google.maps.LatLng(
  //   //         position.coords.latitude, position.coords.longitude);
  //   //     this.autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
  //   //         geolocation));
  //   //   }, this));
  //   // }

  //   // Listen for the event fired when the user selects an item from the
  //   // pick list. Retrieve the matching places for that item.
  //   google.maps.event.addListener(this.autocomplete, 'place_changed', this._onGoogleVenueChange);
  // },

 


module.exports = Places;