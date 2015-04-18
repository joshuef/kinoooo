'use strict';
var React = require('react/addons');

var _ = require('lodash');


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

        //ONLY RENDER THE NAME
        if( this.props.belongsToShow )
        {
            return(
                <li>
                    <h6>{ actualPlace.text }</h6>
                
                </li> 
                );
        }
        else
        {
            //RENDER ALL
            return(
                <li>
                    <h3>{ actualPlace.text }</h3>
                
                </li> 
                );
        }

    }
});


module.exports = PlaceItem;