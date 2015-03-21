'use strict';
var React = require('react/addons');
// var Route = Router.Route;
// var Link = Router.Link;
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var request = require('superagent');
var _ = require('lodash');


// CSS
// require('styles/normalize.css');
// require('styles/main.css');
var page = document.getElementById( 'js-page' );



var PlaceForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    render: function() {

        return (
            <form className='place-form'>
                <h2>Add Place</h2>
                <TextField
                hintText="The Globe Theatre"
                floatingLabelText="place name"
                valueLink={this.linkState('name')} /> 
                <TextField
                hintText="address1"
                floatingLabelText="address1"
                valueLink={this.linkState('address1')} /> 
                <TextField
                hintText="address2"
                floatingLabelText="address2" 
                valueLink={this.linkState('address2')} /> 
               <TextField
                hintText="city"
                floatingLabelText="city" 
                valueLink={this.linkState('city')} /> 
                <TextField
                hintText="postcode"
                floatingLabelText="postcode" 
                valueLink={this.linkState('postcode')} /> 
                <RaisedButton label="Add Place" onClick={this.addPlace}/>


            </form>
        );
    },
    getInitialState: function ( )
    {
        return { 
            name : '',
            address1 : '',
            address2 : '',
            city : '',
            postcode : '',
            lat: '',
            lon: ''
        };
    },
    addPlace : function ( )
    {
        console.log( 'ADDING', this.state );
         request
           .post('/api/places/add')
                .send( this.state )
                .end( this.andNow );

    },

    andNow : function( response )
    {
        console.log( 'THISISHAPPENING' );
        console.log( response );
        // console.log(  'YESS', response.text  );
        // this.setState({placeText: response.text});
        // // this.refs.showPlaces.getDOMNode();
        //         // console.log( 'ANDSO?', res );
        // // var places
    }


});





var Places = React.createClass({
    render: function() {

        return (
          <div className='main'>
                <h1> Places  </h1>
                <RaisedButton label="grab places" onClick={this.getPlaces}/>
                <div ref="showPlaces">{this.state.placeText}</div>
                <PlaceForm />
          </div>
        );
    },
    getInitialState: function ( )
    {
        return { placeText : 'no places' };
    },
    getPlaces : function ( )
    {
        console.log( '"CLICKING"' );
         request
           .get('/api/places')
            .end( this.showPlaces );

    },

    showPlaces : function( response )
    {
        // console.log(  'YESS', response.text  );
        this.setState({placeText: response.text});
        // this.refs.showPlaces.getDOMNode();
                // console.log( 'ANDSO?', res );
        // var places
    }


});



module.exports = Places;