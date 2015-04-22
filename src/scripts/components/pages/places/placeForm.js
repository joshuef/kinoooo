"use strict";
var PlacesActionCreators = require('../../actions/PlacesActionCreators');

var React = require('react/addons');
var mui             = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField    = mui.TextField;
var _ = require('lodash');

var GoogleMapsLoader = require('google-maps');      // only for common js environments

var PlaceForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    render: function() {

        if( this.props.user && ! this.props.user.isAdmin )
        {
            return null;
        }


        var titleText = "Add Place";
        var submitButtonText = "Add Place";

        if( this.state.editing )
        {
            submitButtonText = "Update Place";
        }

        if( this.props.show )
        {
            titleText = "";
        }

        return (
            <form className='place-form'>
                <h2>{titleText}</h2>
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

                
                <RaisedButton label={submitButtonText} onClick={this.submitForm}/>


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

    componentWillReceiveProps : function( newProps )
    {
        if( newProps.thisPlace )
        {
            this.setState( newProps.thisPlace );
            this.setState( { editing: true });
        }
        else
        {
            this.setState( this.defaultState );
        }

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
        editing: false
    },
    getInitialState: function ( )
    {
        return this.defaultState;
    },
    submitForm : function ( e )
    {

        e.preventDefault();

        if( this.state.editing )
        {
            console.log( 'placeState', this.state );
            PlacesActionCreators.updatePlace( _.omit( this.state, [ 'editing', 'text', 'name' ] ) );
        }
        else
        {
            PlacesActionCreators.addPlace( _.omit( this.state, [ 'text', 'name' ] ) );
            this.setState( this.defaultState );
        }


    }


});

module.exports = PlaceForm;