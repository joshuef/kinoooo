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
var MessagesActions = require('./actions/MessagesActionCreators');

var UserStore = require('./stores/UserStore');
var MessagesStore = require('./stores/MessagesStore');
var PlacesStore = require('./stores/PlacesStore');
var ShowsStore = require('./stores/ShowsStore');

// Notifications
var mui             = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();

var Snackbar = mui.Snackbar;
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var FlatButton = mui.FlatButton;

require('styles/normalize.css');
require('styles/main.scss');

var getAppState = function () {

	console.log( 'GETTING APP STATE'  );
	return {
		places: PlacesStore.getAllPlaces(),
		user: UserStore.getUser(),
		shows: ShowsStore.getAllShows(),
		message : MessagesStore.getLatestMessage()
	};
};



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
	childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
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
			this.getGeoLocation(this.addLocationToUser, this.noLocation);
			PlacesActions.getAllPlaces();
			ShowsActions.getAllShows();
		}

	},

	addLocationToUser : function( location )
	{

		var user = this.state.user;
		//dont clone the coords or location object as they
		//are special and hasOwnProperty doesnt work
		user.location = {};
		user.location.latitude =  location.coords.latitude;
		user.location.longitude =  location.coords.longitude;
		UserActionCreators.addLocation( user );
	},

	getGeoLocation : function ( success, fail )
	{

	    if( navigator && navigator.geolocation ) 
	    {
	      	navigator.geolocation.getCurrentPosition( success, fail );
	    } 
	    else 
	    {
    		this.noLocation();
	    }
	},

	noLocation : function( )
	{
		MessagesActions.addMessage( {text: 'Error getting location', action : 'fuck...' });

	},

	 componentDidMount: function() 
	 {
		UserActionCreators.me( 'isAdmin' );

		UserStore.addChangeListener(this._onChange);
		PlacesStore.addChangeListener(this._onChange);
		ShowsStore.addChangeListener(this._onChange);
		MessagesStore.addChangeListener(this._onChangeMessage);
	},

	 /**
	 * Event handler for 'change' events coming from the MessageStore
	 */
	_onChange: function() {

		console.log( 'APPP CHANGED', this.state );
		this.setState(getAppState());

	},
 /**
	 * Event handler for 'change' events coming from the MessageStore
	 */
	_onChangeMessage: function() {

		console.log( 'APPP CHANGED FROM MESSAGE', this.state );
		this.setState(getAppState());
		console.log( this );
		this.refs.Snackbar.show();
		// Snackbar.show();
	},

	render: function() {
		// console.log( 'RENDERING THE WHOLE APPP', this.state );
		return (
			<div className='main'>
				<header>
					<Toolbar >
						<ToolbarGroup key={0} float="left">
							<Link to="/">
								<FlatButton label="Home"/>
							</Link>
							<Link to="/users">
								<FlatButton label="users"/>
							</Link>
							<Link to="/places">
								<FlatButton label="places"/>
							</Link>
							<Link to="/shows">
								<FlatButton label="shows"/>
							</Link>

						</ToolbarGroup>
						<ToolbarGroup key={1} float="right">
							<LoginForm user={this.state.user}/>
						</ToolbarGroup>
					</Toolbar>
					<h1>Welcome</h1>
					<Snackbar
					ref="Snackbar"
					message={this.state.message.text}
					action={this.state.message.action}/>
				</header>
				<RouteHandler {...this.state}/>
				<div id="js-page" > </div>	
			</div>
		);
	},

	snackbarAction : function( e )
	{
		console.log( 'YOU CLICKED THE SNACKBAR THING' );
	}
});


module.exports = App;
