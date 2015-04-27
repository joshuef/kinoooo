'use strict';
var React   = require('react/addons');
var _       = require('lodash');
var Router  = require('react-router');
var Link    = Router.Link;

var BasicPlaceItem = React.createClass({

    render: function()
    {
        console.log( 'placeprops', this.props );
        if( ! this.props.thisPlace )
        {
            console.log( 'NO PLACE' );
            return null;
        }

        var place = this.props.thisPlace;

        if( place )
        {

            var placeId = place;
            var allPlaces = this.props.allPlaces;

            place = _.findWhere( allPlaces, { _id: placeId });

        }
        else
        {
                console.log( 'NO ID' );
                return null;
        }
            

        if( ! place.name )
        {
            console.log( 'NO PLACE FOUND', place );
        }


        var placeLink = "/places/" + place.name  + '/' + place._id;

        return(
            <li>
                <h6><Link to={placeLink}>{ place.name }</Link></h6>
            
            </li> 
            );
 

    },


});


module.exports = BasicPlaceItem;