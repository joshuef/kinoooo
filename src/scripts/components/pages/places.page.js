'use strict';
var React = require('react/addons');

var PlaceForm = require( "./places/placeForm" );
var PlaceItem = require( "./places/placeItem" );




var Places = React.createClass({
    render: function() {
        console.log( 'PLACES PROPPPS', this.props );
        
        var allPlaces = this.props.places;
        var places = [];

        for (var key in allPlaces) {
          places.push(<PlaceItem key={key} place={allPlaces[key]} shows={this.props.shows} />);
        }

        return (
          <div className='main'>
                <h1> Places  </h1>
                <PlaceForm user={this.props.user}/>
                <ul id="place-list">{places}</ul>
          </div>
        );
    },
    getInitialState: function ( )
    {
        return null;
    },

});


 


module.exports = Places;