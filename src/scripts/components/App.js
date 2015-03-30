'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Router = require('react-router');


var UserActionCreators = require( './actions/UserActionCreators');
var LoginForm = require('./utils/login.util');

// var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var UserStore = require('./stores/UserStore');
var PlacesStore = require('./stores/PlacesStore');


var getAppState = function () {


	console.log( 'GETTING APP STATE', UserStore.getUser() );
  return {
    places: PlacesStore.getAllPlaces(),
    user: UserStore.getUser()
  };
};


// CSS
// require('styles/normalize.css');
// require('styles/main.css');

var imageURL = require('../../images/yeoman.png');


var App = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

   componentDidMount: function() {

   	console.log( 'here we check for the user' );
   	UserActionCreators.me();

    // EventsStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
    PlacesStore.addChangeListener(this._onChange);
  },

   /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {

  	console.log( 'APPP CHANGED' );
    this.setState(getAppState());
  },

	render: function() {
		console.log( 'RENDERING THE WHOLE APPP' );
		return (
			<div className='main'>
				<header>
				<h1>Welcome</h1>
		        <ul>
		          <li><Link to="/">Home</Link></li>
		          <li><Link to="/users">Users</Link></li>
		          <li><Link to="/places" places={this.state.places}>Places</Link></li>
		          <li><Link to="/things">Things</Link></li>
		        </ul>
		        <LoginForm user={this.state.user}/>
	      	</header>
	        <RouteHandler />
	        <div id="js-page" > </div>	
			</div>
		);
	}
});


module.exports = App;
