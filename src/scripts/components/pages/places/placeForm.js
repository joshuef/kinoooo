"use strict";
var PlacesActionCreators = require('../../actions/PlacesActionCreators');

var React = require('react/addons');
var mui             = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField    = mui.TextField;

var GoogleMapsLoader = require('google-maps');      // only for common js environments

var PlaceForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    render: function() {

        if( ! this.props.user.isAdmin )
        {
            return null;
        }

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

    },
    defaultState : 
    {
        name: '',
        description: '',
        image: '',
        venue: {},
    },
    getInitialState: function ( )
    {
        return this.defaultState;
    },
    addPlace : function ( e )
    {
        e.preventDefault();
        PlacesActionCreators.addPlace( this.state );
        this.setState( this.defaultState );

    }


});

module.exports = PlaceForm;