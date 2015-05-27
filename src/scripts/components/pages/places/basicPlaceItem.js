'use strict';
var React   = require('react/addons');
var _       = require('lodash');
var Router  = require('react-router');
var Link    = Router.Link;

var BasicPlaceItem = React.createClass({
    onClick : function( e )
    {
        console.log( 'CLICK IN' );
      //we're in a form so run it up
      this.props.onClick( e, this.props.thisPlace );

    },
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

            //for reference later
            // this.setState( {place: place });

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

        if( this.props.inForm )
        {  
            //sloppy. sort this into a single fry function here
            return(
                <li>
                    <h6>{ place.name } : <a href="#" onClick={this.onClick} >Remove</a></h6>
                </li> 
                );

        }
        else

        {
            return(
                <li>
                    <h6><Link to={placeLink}>{ place.name }</Link></h6>
                
                </li> 
                );
        }

 

    },


});


module.exports = BasicPlaceItem;