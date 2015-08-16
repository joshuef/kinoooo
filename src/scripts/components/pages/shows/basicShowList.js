'use strict';
var React = require('react/addons');

// var BasicShowItem = require( "./basicShowItem" );

var mui = require('material-ui');
var List = mui.List;
var ListItem = mui.ListItem;

var BasicShowList = React.createClass({

    render: function() {

        var placeShows = this.props.placeShows;
        var shows = [];

        for (var key in placeShows) {

            
          // shows.push(<ListItem 
          //   key={key} 
          //   primarytext={placeShows[key].name} 
          //   thisShow={placeShows[key]} 
          //   allShows={this.props.allShows}
          //   belongsToPlace={this.props.belongsToPlace}/>);

        shows.push(<ListItem 
            primarytext='lalala' />);
        }

            // <List className="show-list">{shows}</List>
        return <div>{shows}</div>;
    }


});



module.exports = BasicShowList;