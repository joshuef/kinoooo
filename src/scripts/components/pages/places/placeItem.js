'use strict';
var React   = require('react/addons');
var _       = require('lodash');
var Router  = require('react-router');
var Link    = Router.Link;

var ShowItem = require( "../shows/showItem" );

var PlaceItem = React.createClass({

    render: function()
    {

        var actualPlace = this.props.place;

        if( ! actualPlace.text )
        {
            //ie. passed from a show
            
            if( this.props.place.placeId )
            {

                var placeId = this.props.place.placeId;
                var placesStore = this.props.placesStore;

                actualPlace = _.findWhere( placesStore, { _id: placeId });
            }
            else
            {
                    console.log( 'NO ID' );
                    return null;
            }
            
        }

        var placeLink = "/places/" + actualPlace.text  + '/' + actualPlace._id;

        //ONLY RENDER THE NAME
        if( this.props.belongsToShow )
        {
            return(
                <li>
                    <h6><Link to={placeLink}>{ actualPlace.text }</Link></h6>
                
                </li> 
                );
        }
        else
        {
            //RENDER ALL
            return(
                <li>
                    <h3><Link to={placeLink}>{ actualPlace.text }</Link></h3>
                
                </li> 
                );
        }

    }
});


module.exports = PlaceItem;