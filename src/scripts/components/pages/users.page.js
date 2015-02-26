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



var UserForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    render: function() {

        return (
            <form className='user-form'>
                <h2>Add User</h2>
                <TextField
                hintText="l@l.com"
                floatingLabelText="email"
                valueLink={this.linkState('email')} /> 
                <TextField
                hintText="john"
                floatingLabelText="firstName"
                valueLink={this.linkState('firstName')} /> 
                <TextField
                hintText="doe"
                floatingLabelText="lastName" 
                valueLink={this.linkState('lastName')} /> 
               <TextField
                hintText="thesp"
                floatingLabelText="userType" 
                valueLink={this.linkState('userType')} /> 
                <TextField
                hintText="12356909088098"
                floatingLabelText="password" 
                valueLink={this.linkState('password')} /> 
                <RaisedButton label="Add users" onClick={this.addUser}/>


            </form>
        );
    },
    getInitialState: function ( )
    {
        return { 
            email : '',
            firstName : '',
            lastName : '',
            userType : '',
            password : ''
        };
    },
    addUser : function ( )
    {
        console.log( 'ADDING', this.state );
         request
           .post('/api/users/add')
                .send( this.state )
                .end( this.andNow );

    },

    andNow : function( response )
    {
        console.log( 'THISISHAPPENING' );
        console.log( response );
        // console.log(  'YESS', response.text  );
        // this.setState({userText: response.text});
        // // this.refs.showUsers.getDOMNode();
        //         // console.log( 'ANDSO?', res );
        // // var users
    }


});





var Users = React.createClass({
    render: function() {

        return (
          <div className='main'>
                <h1>  Users  </h1>
                <RaisedButton label="grab users" onClick={this.getusers}/>
                <div ref="showUsers">{this.state.userText}</div>
                <UserForm />
          </div>
        );
    },
    getInitialState: function ( )
    {
        return { userText : 'nousers' };
    },
    getusers : function ( )
    {
        console.log( '"CLICKING"' );
         request
           .get('/api/users')
            .end( this.showUsers );

    },

    showUsers : function( response )
    {
        // console.log(  'YESS', response.text  );
        this.setState({userText: response.text});
        // this.refs.showUsers.getDOMNode();
                // console.log( 'ANDSO?', res );
        // var users
    }


});



module.exports = Users;