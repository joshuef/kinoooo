'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Router = require('react-router');
// var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


// CSS
// require('styles/normalize.css');
// require('styles/main.css');

var imageURL = require('../../images/yeoman.png');


var App = React.createClass({
	render: function() {
		return (
			<div className='main'>
				<header>
				<h1>Welcome</h1>
		        <ul>
		          <li><Link to="/">Home</Link></li>
		          <li><Link to="/users">Users</Link></li>
		        </ul>
		        Logged in as Jane
	      	</header>
	        <RouteHandler />
	        <div id="js-page" > </div>	
			</div>
		);
	}
});


module.exports = App;
