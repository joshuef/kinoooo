'use strict';
var React   = require('react/addons');
var _       = require('lodash');
var Router  = require('react-router');
var Link    = Router.Link;

var BasicPlaceItem = React.createClass({

    render: function()
    {
        console.log( 'placeprops', this.props );
        // if( ! this.props.thisPlace.name )
        // {
        //     console.log( 'NO NAME' );
        //     return null;
        // }

        var place = this.props.thisPlace;





        if( ! place.name )
        {
            //ie. passed from a show
            
            if( place.placeId )
            {

                var placeId = place.placeId;
                var allPlaces = this.props.allPlaces;

                place = _.findWhere( allPlaces, { _id: placeId });

            }
            else
            {
                    console.log( 'NO ID' );
                    return null;
            }
            
        }

        if( ! place.name )
        {
            console.log( 'NO PLACE FOUND', place );
        }


        var placeLink = "/places/" + place.name  + '/' + place._id;

        console.log( 'rENDERING PLACE wihtout list' );
        return(
            <li>
                <h6><Link to={placeLink}>{ place.name }</Link></h6>
            
            </li> 
            );
 

    },


});


module.exports = BasicPlaceItem;