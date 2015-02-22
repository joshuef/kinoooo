'use strict';
var React = require('react/addons');
// var Route = Router.Route;
// var Link = Router.Link;
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var request = require('superagent');
var _ = require('lodash');


// CSS
// require('styles/normalize.css');
// require('styles/main.css');
var page = document.getElementById( 'js-page' );

var Users = React.createClass({
    render: function() {

        return (
          <div className='main'>
                <h1>  Users  </h1>
                <RaisedButton label="grab users" onClick={this._getusers}/>
                <div ref="showUsers">{this.state.userText}</div>
          </div>
        );
    },
    getInitialState: function ( )
    {
        return { userText : 'nousers' }
    },
    _getusers : function ( )
    {
        console.log( '"CLICKING"' );
         request
           .get('/api/users')
            .end( this.showUsers );

    },

    showUsers : function( response )
    {
        console.log(  'YESS', response.text  );
        this.setState({userText: response.text});
        // this.refs.showUsers.getDOMNode();
                // console.log( 'ANDSO?', res );
        // var users
    }


});


module.exports = Users;