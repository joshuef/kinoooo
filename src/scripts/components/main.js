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
        <Route name="shows"  >
            <Route name="show" path=":showName" handler={Shows} >
                <Route name="showId" path=":showId" handler={Shows} />
            </Route>
            <DefaultRoute  handler={Shows} />
        </Route>
    </Route>
);



// Router.run( Routes, Router.HistoryLocation, function (Handler, state) {
Router.run( Routes, function (Handler, state) {
    'use strict';
  React.render(<Handler/>, document.body);
});