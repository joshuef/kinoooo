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
var Snackbar = mui.Snackbar;



var getAppState = function () {
   // var latestMessage = MessagesStore.getLatestMessage();
    // console.log( 'LAST MESSAGE??' , latestMessage );

    // if( !latestMessage )
    // {
    // 	console.log( 'LATESTTT', latestMessage );
	   //  this.setState( { MessageStore: latestMessage } );
    	
    // }
    // else
    // {
    // 	latestMessage = { text: 'no', action: 'thing'};
    // }

	console.log( 'GETTING APP STATE'  );
  return {
    places: PlacesStore.getAllPlaces(),
    user: UserStore.getUser(),
    shows: ShowsStore.getAllShows(),
    message : MessagesStore.getLatestMessage()
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
    // Snackbar.show();
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
			        <Snackbar
			        message={this.state.message.text}
			        action={this.state.message.action}
			        openOnMount={true}
			        />
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
