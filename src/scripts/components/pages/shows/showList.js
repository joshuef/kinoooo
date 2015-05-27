'use strict';
var React = require('react/addons');

var ShowItem = require( "./showItem" );


var ShowList = React.createClass({
    render: function() {
        console.log( 'SHOW LIST PROPS', this.props );

        var allShows = this.props.allShows;
        var filteredShows = this.props.filteredShows || this.props.allShows;
        var shows = [];

        for (var key in filteredShows) {
          shows.push(<ShowItem key={key} 
            thisShow={filteredShows[key]} 
            allPlaces={this.props.allPlaces} 
            belongsToPlace={this.props.belongsToPlace}/>);
        }

        return (
            <ul id="show-list">{shows}</ul>
        );
    }


});



module.exports = ShowList;