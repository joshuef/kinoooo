'use strict';
var React = require('react/addons');

var BasicShowItem = require( "./basicShowItem" );


var ShowList = React.createClass({

    render: function() {
        console.log( 'basicSHOW LIST PROPS', this.props );

        var placeShows = this.props.placeShows;
        var shows = [];

        for (var key in placeShows) {
          shows.push(<BasicShowItem key={key} 
            thisShow={placeShows[key]} 
            allShows={this.props.allShows}
            belongsToPlace={this.props.belongsToPlace}/>);
        }

        return (
            <ul className="show-list">{shows}</ul>
        );
    }


});



module.exports = ShowList;