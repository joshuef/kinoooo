'use strict';
var React = require('react/addons');

var PlaceItem = require( "./placeItem" );

var PlaceList = React.createClass({

    render: function() {

        console.log( 'PLACE LIST PROPS', this.props );
        var allPlaces = this.props.allPlaces;
        var places = [];

        if( this.props.filter )
        {
            console.log( 'AYE FILTER AYE' );
        }

        for (var key in allPlaces) {
            console.log( 'placeplace', allPlaces[key].name );

            if( allPlaces[key].name.toLowerCase().indexOf( this.props.filter ) !== -1 )
            {
                places.push(<PlaceItem key={key} 
                    thisPlace={allPlaces[key]} 
                    allPlaces={this.props.allPlaces} 
                    allShows={this.props.allShows}
                    belongsToShow={this.props.belongsToShow}/>);
            }

        }
            
        



        return (
            <ul class="place-list">{places}</ul>
        );
    }

});



module.exports = PlaceList;