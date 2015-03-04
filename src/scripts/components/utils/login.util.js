'use strict';
var React = require('react/addons');
// var Route = Router.Route;
// var Link = Router.Link;
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var FlatButton = mui.FlatButton;
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

        if( this.state.loggedIn )
        {
            return(
                <div>
                    <span>Logged in as: </span>
                    <FlatButton label={ this.linkState('firstName') } primary={true} />
                    <FlatButton label="Logout" secondary={true} onClick={ this.logout }/>
                </div>
                );
        }
        else
        {
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

        }
    },
    defaultState : { email : '', password: '', loggedIn : false },
    getInitialState: function ( )
    {
        var user = this.defaultState;
        var self = this;

        request.get('/api/deets')
            .end( function( reply )
            {
                if( reply.body && reply.body.firstName  )
                {
                    user = reply.body;
                    user.loggedIn = true;
                    self.setState( user );
                }


                // console.log( user );
            })

        return user;
    },
    tryLogin : function ( )
    {
         request
           .post('/api/login')
            .send( _.omit( this.state, 'loggedIn' ) )
            .end( this.loginSuccess );
        // var email = this.state.email;


    },

    loginSuccess : function( response )
    {
        if( response.body && response.body.firstName )
        {
            var user = response.body;
            user.loggedIn = true;
        }
        this.setState( response.body );

    },

    logout: function( response )
    {
        var self = this;
        request
           .get('/api/logout')
            .end( function( reply )
                {
                    self.setState( self.defaultState );
                });
    }


});



module.exports = LoginForm;