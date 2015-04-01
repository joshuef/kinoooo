'use strict';
var React = require('react/addons');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var DatePicker = mui.DatePicker;
var request = require('superagent');
var _ = require('lodash');


// CSS
// require('styles/normalize.css');
// require('styles/main.css');
var page = document.getElementById( 'js-page' );


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
                valueLink={this.linkState('startDate')}
                onChange={this.dateChanged} /> 
                <DatePicker
                hintText="12356909088098"
                floatingLabelText="endDate" 
                valueLink={this.linkState('endDate')}
                onChange={this.dateChanged} /> 
                <RaisedButton label="Add shows" onClick={this.addUser}/>


            </form>
        );
    },
    getInitialState: function ( )
    {
        console.log( 'SHOW STATE', this.props );
        return { 
            name : '',
            director : '',
            place : '',
            startDate : '',
            endDate : ''
        };
    },
    dateChanged : function ( e )
    {
        console.log( 'DATE CHANGED' );
        e.preventDefault();
    },
    addUser : function ( )
    {
        console.log( 'ADDING', this.state );
         request
           .post('/api/shows/add')
                .send( this.state )
                .end( this.andNow );

    },

    andNow : function( response )
    {
        console.log( 'THISISHAPPENING' );
        console.log( response );
        // console.log(  'YESS', response.text  );
        // this.setState({showText: response.text});
        // // this.refs.showShows.getDOMNode();
        //         // console.log( 'ANDSO?', res );
        // // var shows
    }


});





var Shows = React.createClass({
    render: function() {

        return (
          <div className='main'>
                <h1>  Shows  </h1>
                <RaisedButton label="grab shows" onClick={this.getShows}/>
                <div ref="showShows">{this.state.showText}</div>
                <ShowForm />
          </div>
        );
    },
    getInitialState: function ( )
    {
        return { showText : 'noshows' };
    },
    getShows : function ( )
    {
        console.log( '"CLICKING"' );
         request
           .get('/api/shows')
            .end( this.showShows );

    },

    showShows : function( response )
    {
        // console.log(  'YESS', response.text  );
        this.setState({showText: response.text});
        // this.refs.showShows.getDOMNode();
                // console.log( 'ANDSO?', res );
        // var shows
    }


});



module.exports = Shows;