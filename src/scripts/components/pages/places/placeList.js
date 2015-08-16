'use strict';
var React = require('react/addons');

// var PlaceItem = require( "./placeItem" );
// might still need basicShowLIst

var mui = require('material-ui');
var List = mui.List;
var ListItem = mui.ListItem;
var ShowsStore = require( '../../stores/ShowsStore');

// var BasicShowList = require( "../shows/basicShowList" );


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

        if( ! thisPlace || ! thisPlace.name )
        {
            return;
        }


        var placeUrl = encodeURIComponent( thisPlace.name.replace(/ +/g, '_') );
        var placeLink = "/places/" + placeUrl  + '/' + thisPlace._id;



        var placeShows = thisPlace.shows;

        var showsOnHere = [];

        for (var key in placeShows) {

            var actualShow = ShowsStore.getShowByNameOrId( placeShows[ key ] );

            if( actualShow )
            {
                showsOnHere.push(<ListItem 
                primaryText={actualShow.name} 
                thisShow={actualShow} 
                allShows={this.props.allShows}/>);
                
            }


        }


         places.push(<ListItem
                     primaryText={thisPlace.name} >
                        {showsOnHere}
                     </ListItem>);
                       

         return places;
    },
    render: function() {

        var allPlaces = this.props.allPlaces;
        var placesToRender = [];

        var filter = this.props.filter;


        for (var key in allPlaces) {

            if ( ! filter )
            {
               placesToRender = this.addThisPlaceToList( placesToRender, allPlaces, key );
            }
            else if( filter && allPlaces[key].name.toLowerCase().indexOf( filter ) !== -1 )
            {
               placesToRender = this.addThisPlaceToList( placesToRender, allPlaces, key );
            }

        }


        return (
            <List className="place-list">{placesToRender}</List>
        );
    }

});



module.exports = PlaceList;