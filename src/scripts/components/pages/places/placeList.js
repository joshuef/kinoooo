'use strict';
var React = require('react/addons');

var PlaceItem = require( "./placeItem" );



var PlaceList = React.createClass({

    render: function() {

        var allPlaces = this.props.places;
        var places = [];

        for (var key in allPlaces) {
          places.push(<PlaceItem key={key} place={allPlaces[key]} places={this.props.places} />);
        }


        return (
            <ul id="show-list">{places}</ul>
        );
    },

    getInitialState: function ( )
    {
        return null;
    }


});



module.exports = PlaceList;