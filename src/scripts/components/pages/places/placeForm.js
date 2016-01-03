"use strict";
var PlacesActionCreators = require('../../actions/PlacesActionCreators');

var React = require('react/addons');
var mui             = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField    = mui.TextField;
var _ = require('lodash');

var BasicShowList = require( "../shows/basicShowList" );



var PlaceForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    componentWillMount : function( )
    {
        if( this.props.user && ! this.props.user.isAdmin )
        {
            this.render = function( ){ return false;};
        }

    },
    render: function() {

        console.log( 'PLACEFORM', this.props );


        var titleText = "Add Place";
        var submitButtonText = "Add Place";

        if( this.state.editing )
        {
            submitButtonText = "Update Place";
            titleText = "";
        }

        var placeShows = [];
        if( this.props.thisPlace )
        {
            placeShows = this.props.thisPlace.shows;
            
        }



        return (
            <form className='place-form'>
                <h2>{titleText}</h2>
                <TextField
                id="js-venue-search"
                alueLink={this.linkState('venue')} /> 
                <br/>
                <TextField
                hintText="The Globe Theatre"
                floatingLabelText="place name"
                valueLink={this.linkState('name')} />  
                <TextField
                hintText="link"
                floatingLabelText="link"
                valueLink={this.linkState('url')} />  
                <TextField
                hintText="About the place"
                floatingLabelText="place description"
                multiLine={true}
                valueLink={this.linkState('description')} />  
                <TextField
                hintText="Image link"
                floatingLabelText="image link"
                valueLink={this.linkState('image')} /> 

                <h3>Current Shows</h3>
                <BasicShowList 
                placeShows={ placeShows }
                allShows={this.props.allShows} 
                belongsToPlace={true}  
                inForm={true}/>    
         

                <br/>
                <RaisedButton label={submitButtonText} onClick={this.submitForm}/>


            </form>
        );
    },
    componentDidMount : function( )
    {
        var GoogleMapsLoader = require('google-maps');      // only for common js environments
        // console.log( 'param placename  MOUNTEDDD', this.props );

        if( this.props.thisPlace )
        {
            this.setupForEditing( this.props.thisPlace );
        }

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
        console.log( 'param placename RECEIVING PROPS' );
        if( newProps.thisPlace )
        {
            this.setupForEditing(newProps.thisPlace);
        }
        else
        {
            this.setState( this.defaultState );
        }

    },

    setupForEditing : function( newPlace )
    {
        console.log( 'SETTING EDITING', newPlace );
        this.setState( newPlace );
        this.setState( { editing: true });
        // this.forceUpdate();
    },

    _onGoogleVenueChange: function() 
    {
        var place = this.autocomplete.getPlace();

        // forbid places that don't exist on google maps
        if(!place.place_id) {
            return;
        }

        this.setState( { 'venue': place } );
        this.setState( { 'url': place.url } );
        this.setState( { 'name': place.name } );

    },
    defaultState : 
    {
        name: '',
        description: '',
        image: '',
        url: '',
        venue: {},
        editing: false
    },
    getInitialState: function ( )
    {
        return this.defaultState;
    },
    submitForm : function ( e )
    {
        console.log( 'placesubmit', this.state );
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