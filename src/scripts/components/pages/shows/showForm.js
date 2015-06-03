'use strict';
var React = require('react/addons');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var DropDownMenu = mui.DropDownMenu;
var DatePicker = mui.DatePicker;
var TimePicker = mui.TimePicker;

var _ = require('lodash');

var MessagesActions = require('../../actions/MessagesActionCreators');
var ShowsActions = require('../../actions/ShowsActionCreators');

var BasicPlaceList = require( "../places/basicPlaceList" );


var ShowForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    guy: function( e)
    {
        e.preventDefault();
        return null;
    },
    render: function() {
        var places = [{
            payload : 0,
            text: 'No Places SORRY!'
        }];

        if( this.props.allPlaces.length > 0 )
        {
            places = this.props.allPlaces;

        }

        if( this.props.user && ! this.props.user.isAdmin )
        {
            return null;
        }

        var titleText = "Add Show";
        var submitButtonText = "Add Show";

        if( this.state.editing )
        {
            submitButtonText = "Update Show";
            titleText = "";
        }

            console.log( 'BASIC PLACE LIST PROPS IN SHOWFORM', this.state.places );

        return (
            <form className='show-form'>
                <h2>{titleText}</h2>
                <TextField
                hintText="Grease"
                floatingLabelText="name"
                valueLink={this.linkState('name')} /> 
                <TextField
                hintText="john"
                floatingLabelText="director"
                valueLink={this.linkState('director')} /> 
                <TimePicker
                format="ampm"
                ref="startTime"
                hintText="Starts when?" /> 
                <DatePicker
                hintText="thesp"
                floatingLabelText="startDate" 
                ref="startDate"/> 
                <DatePicker
                hintText="12356909088098"
                floatingLabelText="endDate"
                ref="endDate" />
                <DropDownMenu
                menuItems={places}
                ref="placeDropdown" /> 
                <RaisedButton label="Add place" onClick={this.addPlace}/>
                <h3>Current Places</h3>
                <BasicPlaceList showPlaces={this.state.places} 
                allPlaces={this.props.allPlaces} belongsToShow={true}  
                onClick={this.removePlace} inForm={true}/>
                <RaisedButton label={submitButtonText} onClick={this.submitForm}/>
            </form>
        );
    },
    defaultState: 
    {
        name : '',
        director : '',
        places : [],
        startDate : '',
        endDate : '',
        editing: false
    },
    getInitialState: function ( )
    {
        return this.defaultState;
    },
    componentDidMount : function( )
    {

        if( this.props.thisShow )
        {
            this.setupForEditing( this.props.thisShow );
        }
    },
    componentWillReceiveProps : function( newProps )
    {
        if( newProps.thisShow )
        {
            this.setupForEditing( newProps.thisShow );
        }
        else
        {
            this.setState( this.defaultState );

        }

    },
    pickerHandler : function ( e )
    {
        console.log( 'OHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH' );
        e.preventDefault();
    },
    removePlace : function( e, place )
    {
        e.preventDefault();
        var places = this.state.places;
        var updatedPlaces =  _.remove( places , function( value, i )
        {
            console.log( 'INSIDE THE STATETTTT', value, i );

            return value.toString === place;
        } );

        this.setState( { places: updatedPlaces });

    },
    addPlace : function ( e, selectedIndex, menuItem )
    {
        e.preventDefault();
        var places = this.state.places;

        var placeDropdown = this.refs.placeDropdown;
        var selectedPlace = placeDropdown.props.menuItems[ placeDropdown.state.selectedIndex ];

        console.log( 'add show place in the form', selectedPlace );
        places.push ( selectedPlace._id );

        places = _.uniq( places, false, function( place )
            { 
                return place.place_Id; 
            } );

        this.setState( { places: places });
    },
    setupForEditing : function( newShow )
    {
        console.log( 'param show EDITING', newShow );
        this.setState( newShow );
        this.setState( { editing: true });
    },

    submitForm : function ( e )
    {
        e.preventDefault();

        console.log( 'ADD SHOW', this.state );

        var startTime = this.refs.startTime.getTime();
        var startDate = this.refs.startDate.getDate();
        var endDate = this.refs.endDate.getDate();

        this.setState( { 
            startTime: startTime,
            startDate: startDate,
            endDate: endDate
        });


        if( this.state.editing )
        {
            ShowsActions.updateShow( _.omit( this.state, 'editing' ) );
        }
        else
        {
            ShowsActions.addShow( this.state );
            //should update a place with this show also.
            this.setState( this.getInitialState );
            
        }
    }


});

module.exports = ShowForm;