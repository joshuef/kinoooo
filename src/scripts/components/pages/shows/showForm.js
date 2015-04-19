'use strict';
var React = require('react/addons');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var DropDownMenu = mui.DropDownMenu;
var DatePicker = mui.DatePicker;

var _ = require('lodash');

var MessagesActions = require('../../actions/MessagesActionCreators');


var ShowsActions = require('../../actions/ShowsActionCreators');



var ShowForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    render: function() {

        console.log( 'SHOWFOOOO' );
        var places = [{
            payload : 0,
            text: 'No Places SORRY!'
        }];

        if( this.props.places.length > 0 )
        {
            places = this.props.places;

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
        }

        if( this.props.show )
        {
            titleText = "";
        }
    
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
                <DropDownMenu
                menuItems={places}
                ref="placeDropdown" /> 
                <RaisedButton label="Add place" onClick={this.addPlace}/>
                <DatePicker
                hintText="thesp"
                floatingLabelText="startDate" 
                onChange={this.dateChanged} /> 
                <DatePicker
                hintText="12356909088098"
                floatingLabelText="endDate"
                onChange={this.dateChanged} />  
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

    componentWillReceiveProps : function( newProps )
    {
        if( newProps.show )
        {
            this.setState( newProps.show );
            this.setState( { editing: true });
        }

    },
    addPlace : function ( e, selectedIndex, menuItem )
    {
        e.preventDefault();
        var places = this.state.places;
        var placeDropdown = this.refs.placeDropdown;

        var selectedPlace = placeDropdown.props.menuItems[ placeDropdown.state.selectedIndex ];

        places.push( { placeId: selectedPlace._id } );
        //check the place is unique

        this.setState( { places: places });
        console.log( 'PLACE ADDDEDDD', this.state.places );
    },
    dateChanged : function ( e, selectedIndex, menuItem )
    {
        console.log( 'DATE CHANGED',  e, selectedIndex, menuItem );
    },
    submitForm : function ( e )
    {
        e.preventDefault();

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