'use strict';
var React   = require('react/addons');
var _       = require('lodash');
var Router  = require('react-router');
var Link    = Router.Link;

var BasicShowList = require( "../shows/basicShowList" );

var PlaceItem = React.createClass({
componentWillMount : function( )
{
    console.log( 'PLACE ITEM MOUNTING' );
},
    render: function()
    {
        console.log( 'thisplacceprops', this.props.thisPlace.name, this.props.thisPlace );
        if( ! this.props.thisPlace.name )
        {
            console.log( 'NO NAME' );
            return null;
        }

        var place = this.props.thisPlace;

        var placeLink = "/places/" + place.name  + '/' + place._id;


        // if( ! place.name )
        // {
        //     //ie. passed from a show
            
        //     if( place.placeId )
        //     {

        //         var placeId = place.placeId;
        //         var placesStore = place.allPlaces;

        //         place = _.findWhere( places, { _id: placeId });

        //     }
        //     else
        //     {
        //             console.log( 'NO ID' );
        //             return null;
        //     }
            
        // }

        console.log( 'PLACE ITEM WITH LIST??', place );
        //RENDER ALL
        return(
            <li>
                <h3><Link to={placeLink}>{ place.name }</Link></h3>
                <BasicShowList placeShows={ place.shows } allShows={ this.props.allShows } belongsToPlace={true} />
            </li> 
            );
        


        return null;

    },


});


module.exports = PlaceItem;