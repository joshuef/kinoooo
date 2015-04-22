'use strict';
var React = require('react/addons');

var BasicPlaceItem = require( "./basicPlaceItem" );


var PlaceList = React.createClass({

    render: function() {
        console.log( 'BASIC PLACE LIST PROPS', this.props );

        var showPlaces = this.props.showPlaces;
        var places = [];

   
        console.log( 'PLACE BELONGS TO SHOW' );
        for (var key in showPlaces) {
            // places.push( 'bla');
          places.push(<BasicPlaceItem key={key} 
            thisPlace={showPlaces[key]} 
            allPlaces={this.props.allPlaces} 
            belongsToShow={this.props.belongsToShow}/>);
        }
        return (
            <ul class="place-list">{places}</ul>
        );

    
       


    }

});



module.exports = PlaceList;