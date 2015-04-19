'use strict';
var React = require('react/addons');

var ShowItem = require( "./showItem" );



var ShowList = React.createClass({

    render: function() {

        var allShows = this.props.shows;
        var shows = [];

        for (var key in allShows) {
          shows.push(<ShowItem key={key} show={allShows[key]} places={this.props.places} />);
        }


        return (
            <ul id="show-list">{shows}</ul>
        );
    },

    getInitialState: function ( )
    {
        return null;
    }


});



module.exports = ShowList;