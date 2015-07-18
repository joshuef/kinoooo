'use strict';
var React   = require('react/addons');
var _       = require('lodash');
var moment       = require('moment');
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

        var thisPlace = this.props.thisPlace;
        var place;

        if( thisPlace )
        {

            var placeId = thisPlace.placeId;
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
            
        if( _.isUndefined( place ) || _.isUndefined( place.name ))
        {
            console.log( 'NO PLACE FOUND' );
            return null;
        }

        var placeUrl = encodeURIComponent(place.name);
        var placeLink = "/places/" + placeUrl  + '/' + place._id;

        var showingsToRender = [];
        //times elements
        for (var key in thisPlace.showings ) 
        {

            //if the 
            var time = thisPlace.showings[key].time;

            if( moment.isMoment( time ) )
            {
                console.log( 'BASIC PLACE ITEM SHOWINGS loop', place.showings );

                // console.log( 'SHOWTIME IS MOMENT?'  );
                // if( )
                // places.push( 'bla');
                showingsToRender.push( <li>{time.format("dddd, MMMM Do YYYY, h:mm:ss a")}</li> );
            }

        }

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
                    <ol>
                        {showingsToRender}
                    </ol>
                </li> 
                );
        }

 

    },


});


module.exports = BasicPlaceItem;