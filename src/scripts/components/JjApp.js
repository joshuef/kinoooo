'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
// require('styles/normalize.css');
// require('styles/main.css');

var imageURL = require('../../images/yeoman.png');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var JjApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
        </ReactTransitionGroup>
      <RaisedButton label="YaaaS" />
      </div>
    );
  }
});

module.exports = JjApp;
