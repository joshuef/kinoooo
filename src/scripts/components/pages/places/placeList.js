'use strict';
var React = require('react/addons');

// var PlaceItem = require( "./placeItem" );
// might still need basicShowLIst

var mui = require('material-ui');
var List = mui.List;
var ListItem = mui.ListItem;


var BasicShowList = require( "../shows/basicShowList" );


var PlaceList = React.createClass({

    /**
     * Adds your PlaceItem to an array of places for rendering
     * @param {[type]} places    [description]
     * @param {[type]} allPlaces [description]
     * @param {[type]} key       [description]
     */
    addThisPlaceToList : function( places, allPlaces, key )
    {
        var thisPlace = allPlaces[key];

        if( ! thisPlace.name )
        {
            return;
        }

        // console.log( '"ASKKKKKKK"', thisPlace );


        var placeUrl = encodeURIComponent( thisPlace.name.replace(/ +/g, '_') );
        var placeLink = "/places/" + placeUrl  + '/' + thisPlace._id;

         // places.push(<PlaceItem key={key} 
         
         // if( )
         places.push(<ListItem 
                     primaryText={thisPlace.name} >
                        <ListItem> 
                            <BasicShowList placeShows={ thisPlace.shows } allShows={ this.props.allShows }  />
                        </ListItem> 
                     </ListItem>);
                    // allPlaces={this.props.allPlaces} 
                    // allShows={this.props.allShows}
                    // belongsToShow={this.props.belongsToShow}

         return places;
    },
    render: function() {

        console.log( 'PLACE LIST PROPS', this.props );
        var allPlaces = this.props.allPlaces;
        var places = [];

        var filter = this.props.filter;


        for (var key in allPlaces) {

            if( filter && allPlaces[key].name.toLowerCase().indexOf( filter ) !== -1 )
            {
               places = this.addThisPlaceToList( places, allPlaces, key );
            }
            else if ( ! filter )
            {
               places = this.addThisPlaceToList( places, allPlaces, key );
            }

        }


        return (
            <List class="place-list">{places}</List>
        );
    }

});



module.exports = PlaceList;