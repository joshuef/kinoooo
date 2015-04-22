'use strict';
var React = require('react/addons');

var BasicShowItem = require( "./basicShowItem" );


var ShowList = React.createClass({

    render: function() {
        console.log( 'SHOW LIST PROPS', this.props );

        var allShows = this.props.allShows;
        var shows = [];

        for (var key in allShows) {
          shows.push(<BasicShowItem key={key} 
            thisShow={allShows[key]} 
            allShows={this.props.allShows}
            belongsToPlace={this.props.belongsToPlace}/>);
        }

        return (
            <ul id="show-list">{shows}</ul>
        );
    }


});



module.exports = ShowList;