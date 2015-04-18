'use strict';
var React = require('react/addons');

var UserActionCreators = require('../actions/UserActionCreators');
var UserStore = require('../stores/UserStore');
// var UserServer = require('../helpers/UserActionCreators')
// var UserActionCreators = require('../helpers/UserActionCreators')
// var Route = Router.Route;
// var Link = Router.Link;
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var FlatButton = mui.FlatButton;

// require("!style!css!sass!./fi le.scss");


// CSS
// require('material/scaffolding.less');
require('styles/material.less');
// require('styles/main.css');
var page = document.getElementById( 'js-page' );

var LoginForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    render: function() {
        if( this.props.user && this.props.user.loggedIn )
        {
            return(
                <div>
                    <span>Logged in as: </span>
                    <FlatButton label={ this.props.user.firstName } primary={true} />
                    <FlatButton label="Logout" secondary={true} onClick={ UserActionCreators.logout }/>
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
                    <RaisedButton label="Submit" onClick={ this.login }/>


                </form>
            );

        }
    },
    defaultState : { email : '', password: '', loggedIn : false },
    getInitialState: function ( )
    {

        if( ! this.state )
        {
            return this.defaultState;
        }

    },
    login : function ( e )
    {
        e.preventDefault();
        
        // console.log( this.state );
         UserActionCreators.login( this.state );
        // var email = this.state.email;
        this.setState( this.defaultState );


    },

    // loginSuccess : function( response )
    // {
    //     if( response.body && response.body.firstName )
    //     {
    //         var user = response.body;
    //         user.loggedIn = true;
    //     }
    //     this.setState( response.body );

    // },

    logout: function( response )
    {
        this.setState( this.defaultState );
         UserActionCreators.logout( );
        // var self = this;
        // request
        //    .get('/api/logout')
        //     .end( function( reply )
        //         {
        //             self.setState( self.defaultState );
        //         });
    }


});



module.exports = LoginForm;