var JjApp = require('./JjApp');
var Bla = require('./bla');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var $ = require('jquery');

window.$ = $;


var content = document.getElementById('content');

var Routes = (
  <Route handler={JjApp}>
    <Route name="/" handler={JjApp}/>
    <Route name="/bla" handler={Bla}/>
  </Route>
);

Router.run(Routes, function (Handler) {
    'use strict'
  React.render(<Handler/>, content);
});
