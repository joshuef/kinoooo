var App = require('./App');
var Users = require('./pages/users.page');
var Places = require('./pages/places.page');
var Shows = require('./pages/shows.page');
var Home = require('./pages/home.page');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
// var $ = require('jquery');
var DefaultRoute = Router.DefaultRoute;

// window.$ = $;



var Routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Home}/>
        <Route name="users" handler={Users} />
        <Route name="places" handler={Places}  />
        <Route name="shows" handler={Shows} />
    </Route>
);



Router.run( Routes, Router.HistoryLocation, function (Handler, state) {
    'use strict';
  React.render(<Handler/>, document.body);
});
