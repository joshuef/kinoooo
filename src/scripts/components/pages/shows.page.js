'use strict';
var React = require('react/addons');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
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
                <TextField
                hintText="The globe"
                floatingLabelText="place" 
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
        return this.defaultState;
    },
    dateChanged : function ( e )
    {
        console.log( 'DATE CHANGED' );
    },
    addShow : function ( e  )
    {
        e.preventDefault();
        ShowsActionCreators.addShow( this.state );
        this.setState( this.getInitialState );
    }


});

var ShowsStore = require('../stores/ShowsStore');


var getShowsState = function () {

  return {
    shows: ShowsStore.getAllShows()
  };
};


var Shows = React.createClass({
    render: function() {

        return (
          <div className='main'>
                <h1>  Shows  </h1>
                <ShowForm />
                <div ref="showShows">{this.state}</div>
                <RaisedButton label="grab shows" onClick={this.getShows}/>
          </div>
        );
    },
    componentDidMount: function() {

        ShowsStore.addChangeListener(this._onChange);
    },
    _onChange: function() {

    this.setState(getShowsState());


  },
    getInitialState: function ( )
    {
        
    },
    getShows : function ( )
    {
        ShowsActionCreators.getAllShows(  );


    }


});



module.exports = Shows;