var App = require('./App');
var Users = require('./pages/users.page');
var Home = require('./pages/home.page');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
// var $ = require('jquery');
var DefaultRoute = Router.DefaultRoute;

// window.$ = $;


var content = document.getElementById('content');

var Routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Home}/>
        <Route name="users" handler={Users}/>
    </Route>
);

Router.run(Routes, function (Handler) {
    'use strict'
  React.render(<Handler/>, content);
});
