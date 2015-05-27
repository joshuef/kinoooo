'use strict';
var React = require('react/addons');

var BasicPlaceItem = require( "./basicPlaceItem" );


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

        var showPlaces = this.props.showPlaces;
        var places = [];

   
        console.log( 'PLACE BELONGS TO SHOW' );
        for (var key in showPlaces) {
            // places.push( 'bla');
          places.push(<BasicPlaceItem key={key} 
            thisPlace={showPlaces[key]} 
            allPlaces={this.props.allPlaces} 
            belongsToShow={this.props.belongsToShow}
            onClick={ this.onClick }
            inForm={ this.props.inForm } />);
        }
        return (
            <ul className="place-list">{places}</ul>
        );

    
       


    }

});



module.exports = PlaceList;