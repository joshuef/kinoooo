'use strict';
var React = require('react/addons');
// var Route = Router.Route;
// var Link = Router.Link;
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var request = require('superagent');
var _ = require('lodash');
var Passport = require( 'hapi-passport' );

// require("!style!css!sass!./fi le.scss");


// CSS
// require('material/scaffolding.less');
require('styles/material.less');
// require('styles/main.css');
var page = document.getElementById( 'js-page' );

var LoginForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    render: function() {

        return (
            <form className='user-form'>
                <h2>Login</h2>
                <TextField
                hintText="email@bla.com"
                floatingLabelText="email"
                valueLink={this.linkState('email')} /> 
            
                <TextField
                hintText="???"
                type="password"
                floatingLabelText="Password" 
                valueLink={this.linkState('password')} /> 
                <RaisedButton label="Submit" onClick={this.tryLogin}/>


            </form>
        );
    },
    getInitialState: function ( )
    {
        return { email : '', password: '' };
    },
    tryLogin : function ( )
    {
        console.log( 'loggiiinnnnnng inn???' );

         request
           .post('/api/login')
            .send( this.state )
            .end( this.success );
        // var email = this.state.email;


    },

    success : function( response )
    {
        console.log( 'SUCCESS THING', response.body );
        // response = JSON.parse( response );
        // console.log( 'THIS GUY', JSON.parse( response ) );
        // console.log( 'YOU LOGGED INNN!' );
        // console.log(  'YESS', response.text  );
        // this.setState({userText: response.text});
        // this.refs.showUsers.getDOMNode();
                // console.log( 'ANDSO?', res );
        // var users
    }


});



module.exports = LoginForm;