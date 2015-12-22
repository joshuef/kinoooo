'use strict';
var React = require('react/addons');

var BasicPlaceItem = require( "./basicPlaceItem" );
var _ = require( "lodash" );

var PlaceList = React.createClass({
    onClick : function( e, place )
    {
        console.log( 'LIST CLICK', e, this.props );
        if( ! this.props.inForm )
        {
            return;
        }
      
      //we're in a form so run it up
      this.props.onClick( e, place );

    },
    render: function() {
        console.log( 'BASIC PLACE LIST PROPS', this.props );

        var showPlaceTimes = this.props.showPlaceTimes;
        var places = [];
       


        // {
        //     time,
        //     place,
        //     flags
        // }


        // wanted

        // {
        //     place:
        //         showings:[ {time, flags }]
        // }

        _.each( showPlaceTimes, function( showPlaceTime )
        {
            if( !showPlaceTime.place ||
                !showPlaceTime.time )
            {
                console.log( 'no place no time' );
                return;
            }

            var thisPlace = { 
                placeId: showPlaceTime.place,
                showings: [ { 
                    time: showPlaceTime.time,
                    flags: showPlaceTime.flags
                } ]
             };

            var existingPlace = _.findWhere( places, { placeId: thisPlace.placeId});
                
                console.log( 'existing place?', existingPlace );
            if( ! existingPlace  )
            {
                console.log( 'nae place and soooo' );
                //add this new place
                places.push( thisPlace );
            }
            else
            {
                console.log( 'EXISTING PLACE', existingPlace );
                //add the new showing
                existingPlace.showings.push( 
                { 
                    time: showPlaceTime.time,
                    flags: showPlaceTime.flags
                } );

            }

        });

        var placesToRender =[];

        for (var key in places) {

            //if the 

            console.log( 'BASIC PLACE LIST WITH SHOWS loop', places );
            // places.push( 'bla');
          placesToRender.push(<BasicPlaceItem key={key} 
            thisPlace={places[key]} 
            allPlaces={this.props.allPlaces} 
            belongsToShow={this.props.belongsToShow}
            onClick={ this.onClick }
            inForm={ this.props.inForm } />);
        }
        return (
            <ul className="place-list">{placesToRender}</ul>
        );

    
       


    }

});



module.exports = PlaceList;