'use strict';
var React = require('react/addons');

// var BasicShowItem = require( "./basicShowItem" );

var mui = require('material-ui');
var List = mui.List;
var ListItem = mui.ListItem;

var ShowList = React.createClass({

    render: function() {
        console.log( 'basicSHOW LIST PROPS', this.props );

        var placeShows = this.props.placeShows;
        var shows = [];

        for (var key in placeShows) {

            
          shows.push(<ListItem 
            key={key} 
            primarytext={placeShows[key].name} 
            thisShow={placeShows[key]} 
            allShows={this.props.allShows}
            belongsToPlace={this.props.belongsToPlace}/>);
        }

        return (
            <List className="show-list">{shows}</List>
        );
    }


});



module.exports = ShowList;