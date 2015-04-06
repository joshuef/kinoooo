'use strict';
var React = require('react/addons');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var DropDownMenu = mui.DropDownMenu;
var DatePicker = mui.DatePicker;
var request = require('superagent');
var _ = require('lodash');


// CSS

var page = document.getElementById( 'js-page' );
var ShowsActionCreators = require('../actions/ShowsActionCreators');


console.log( 'SHOW HAPPENING' );
var ShowForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    render: function() {

// console.log( 'PLACES MENU', this.props.places );
            console.log( 'SHOWS AND PLACES', this.props.places );
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
                menuItems={this.props.places}
                onChange={this.placeChanged}
                // hintText="The globe"
                // floatingLabelText="place" 
                valueLink={this.linkState('place')} /> 
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
        place : '',
        startDate : '',
        endDate : ''
    },
    getInitialState: function ( )
    {
        console.log( 'THISISHAPPENING', this );
        return this.defaultState;
    },
    placeChanged : function ( e, selectedIndex, menuItem )
    {
        this.setState( { place: menuItem });
    },
    dateChanged : function ( e, selectedIndex, menuItem )
    {
        console.log( 'DATE CHANGED',  e, selectedIndex, menuItem );
    },
    addShow : function ( e  )
    {
        e.preventDefault();
        ShowsActionCreators.addShow( this.state );
        this.setState( this.getInitialState );
    }


});




var Shows = React.createClass({
    render: function() {

        return (
          <div className='main'>
                <h1>  Shows  </h1>
                <ShowForm places={this.props.places}/>
                <div ref="showShows">{this.props.shows}</div>
                <RaisedButton label="grab shows" onClick={this.getShows}/>
          </div>
        );
    },

    getInitialState: function ( )
    {
        return null;
    },
    getShows : function ( )
    {
        ShowsActionCreators.getAllShows(  );


    }


});



module.exports = Shows;