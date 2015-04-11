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


var ShowsActions = require('./actions/ShowsActionCreators');
var PlacesActions = require('./actions/PlacesActionCreators');
var UserStore = require('./stores/UserStore');
var PlacesStore = require('./stores/PlacesStore');
var ShowsStore = require('./stores/ShowsStore');


var getAppState = function () {


	console.log( 'GETTING APP STATE', UserStore.getUser() );
  return {
    places: PlacesStore.getAllPlaces(),
    user: UserStore.getUser(),
    shows: ShowsStore.getAllShows()
  };
};


// CSS
// require('styles/normalize.css');
// require('styles/main.css');

var imageURL = require('../../images/yeoman.png');


var App = React.createClass({

  getInitialState: function() {
  	this._initialStoreFiller();
    return getAppState();

    //should check local store and check if its out of date to reduce
  	//requests etc
  	//
  	//assuming they are empty:
  },

  /**
   * Fills local stores in general for app.
   * 
   TODO: Check local storage once states are being saved there.
   And if local storage, check the when... (older data can be sneakily
   retrieved while the app is still working);
   */
  _initialStoreFiller : function( )
  {
  	
  	if( !this.state )
  	{
  		PlacesActions.getAllPlaces();
  		ShowsActions.getAllShows();
  	}

  },

   componentDidMount: function() 
   {
   	UserActionCreators.me();

    UserStore.addChangeListener(this._onChange);
    PlacesStore.addChangeListener(this._onChange);
  },

   /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {

  	console.log( 'APPP CHANGED', this.state );
    this.setState(getAppState());
  },

	render: function() {
		// console.log( 'RENDERING THE WHOLE APPP', this.state );
		return (
			<div className='main'>
				<header>
				<h1>Welcome</h1>
		        <ul>
		          <li><Link to="/">Home</Link></li>
		          <li><Link to="/users">Users</Link></li>
		          <li><Link to="/places">Places</Link></li>
		          <li><Link to="/shows">Shows</Link></li>
		        </ul>
		        <LoginForm user={this.state.user}/>
	      	</header>
	        <RouteHandler {...this.state}/>
	        <div id="js-page" > </div>	
			</div>
		);
	}
});


module.exports = App;
