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

require('styles/admin-form.scss');


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
                <TextField
                hintText="about the show"
                floatingLabelText="description"
                multiLine={true}
                valueLink={this.linkState('description')} /> 
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
                <RaisedButton label="Add place" onClick={this.addPlaceTime}/>
                <h3>Current Places</h3>
                <BasicPlaceList showPlaceTimes={this.state.showingAt} 
                allPlaces={this.props.allPlaces} belongsToShow={true}  
                onClick={this.removePlaceTime} inForm={true}/>
                <RaisedButton label={submitButtonText} onClick={this.submitForm}/>
            </form>
        );
    },
    defaultState: 
    {
        name : '',
        director : '',
        description : '',
        showingAt : [],
        removePlaceTime : [],
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

    removePlaceTime : function( e, place )
    {
        var showingAt = this.state.showingAt;
        e.preventDefault();

         _.remove( showingAt , function( value, i )
        {
            return value === place;
        } );

        var removePlaceTime = this.state.removePlaceTime;
        
        removePlaceTime.push( showingAt );

        removePlaceTime = _.uniq( removePlaceTime, false, function( place_Id )
            { 
                console.log( 'removing places in loop', place_Id );
                return place_Id; 
            } );


        this.setState( { 
            places: places,
            removePlaceTime: removePlaceTime
             });

    },
    addPlaceTime : function ( e, selectedIndex, menuItem )
    {
        e.preventDefault();
        var showingAt = this.state.showingAt;

        var placeDropdown = this.refs.placeDropdown;
        var selectedPlace = placeDropdown.props.menuItems[ placeDropdown.state.selectedIndex ];

        console.log( 'add a show place in the form', selectedPlace );

        var startTime = this.refs.startTime.getTime();
        // var startDate = this.refs.startDate.getDate();
        // var endDate = this.refs.endDate.getDate();

        var showTime = 
        {
            place: selectedPlace._id,
            time: startTime

        };

        showingAt.push ( showTime );

        console.log( 'add a show before unique', showingAt );
        showingAt = _.uniq( showingAt, false, function( placeTime )
            { 
                console.log( 'add a show... in the loop', placeTime );
                return { place: placeTime.place, time: placeTime.time };
            } );

        console.log( 'add a show after unique', showingAt );

        this.setState( { showingAt: showingAt });

        console.log( 'add a show AFTER', this );

        //GET THE CURRENT TIME ETC
        //

        // this.setState( { 
        //     startTime: startTime,
        //     startDate: startDate,
        //     endDate: endDate
        // });
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

        // var startTime = this.refs.startTime.getTime();
        // var startDate = this.refs.startDate.getDate();
        // var endDate = this.refs.endDate.getDate();

        // this.setState( { 
        //     startTime: startTime,
        //     startDate: startDate,
        //     endDate: endDate
        // });


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