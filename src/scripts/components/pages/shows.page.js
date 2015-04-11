'use strict';
var React = require('react/addons');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var DropDownMenu = mui.DropDownMenu;
var DatePicker = mui.DatePicker;
var request = require('superagent');
var _ = require('lodash');

var MessagesActions = require('../actions/MessagesActionCreators');

var UserActionCreators = require( '../actions/UserActionCreators');

// CSS

var page = document.getElementById( 'js-page' );
var ShowsActions = require('../actions/ShowsActionCreators');


console.log( 'SHOW HAPPENING' );
var ShowForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    render: function() {

        var places = [{
            payload : 0,
            text: 'No Places SORRY!'
        }];

        if( this.props.places.length > 0 )
        {
            places = this.props.places;

        }


        if( ! this.props.user.isAdmin )
        {
            return null;
        }
    
        return (
            <form className='show-form'>
                <h2>Add Show</h2>
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
                <RaisedButton label="Add shows" onClick={this.addShow}/>
            </form>
        );
    },
    defaultState: 
    {
        name : '',
        director : '',
        places : [],
        startDate : '',
        endDate : ''
    },
    getInitialState: function ( )
    {
        return this.defaultState;
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
    addShow : function ( e  )
    {
        e.preventDefault();
        ShowsActions.addShow( this.state );
        //should update a place with this show also.
        this.setState( this.getInitialState );
    }


});











var PlaceItem = React.createClass({

    render: function()
    {
        console.log( 'A PLACEPLACE', this.props );
        if( ! this.props.place.placeId )
        {
            console.log( 'NO ID' );
            return null;
        }
        var placeId = this.props.place.placeId;
        var placesStore = this.props.placesStore;

        var actualPlace = _.findWhere( placesStore, { _id: placeId });


        return(
            <li>
                <h6>PLACE::: { actualPlace.text }</h6>
            
            </li> 
            );
        return null
    }
});
















var ShowItem = React.createClass({

    render: function()
    {

        if( ! this.props.show.name )
        {
            console.log( 'NO NAME' );
            return null;
        }
        var show = this.props.show;
        console.log( 'SHOWPLACES', show );

        var allPlaces = show.places;
        var places = [];

        console.log( 'SHOWPLACES', this.props );

        for (var key in allPlaces) {
          places.push(<PlaceItem key={key} place={allPlaces[key]} placesStore={this.props.places}/>);
        }

        console.log( 'SHOWPLACE', places );


        return(
            <li>
                <h3>{ this.props.show.name }</h3>
                <ul class="place-list">{places}</ul>

            </li> 
            );
    }
});


 


var Shows = React.createClass({

    render: function() {
        console.log( 'RENDERING SHOWS', this );

        var allShows = this.props.shows;
        var shows = [];

        for (var key in allShows) {
          shows.push(<ShowItem key={key} show={allShows[key]} places={this.props.places} />);
        }


        return (
          <div className='main'>
                <h1>  Shows  </h1>
                <ShowForm places={this.props.places} user={this.props.user}/>
                <ul id="show-list">{shows}</ul>
          </div>
        );
    },

    getInitialState: function ( )
    {
        return null;
    }


});



module.exports = Shows;