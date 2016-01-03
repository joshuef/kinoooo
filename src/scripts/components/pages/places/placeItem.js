'use strict';
var React   = require('react/addons');
var _       = require('lodash');
var Router  = require('react-router');
var Link    = Router.Link;

var BasicShowList = require( "../shows/basicShowList" );

var PlaceItem = React.createClass({
    componentWillMount : function( )
    {

    },
    render: function()
    {
        // console.log( 'thisplacceprops', this.props.thisPlace.name, this.props.thisPlace );
        if( ! this.props.thisPlace.name )
        {
            return null;
        }

        var place = this.props.thisPlace;

        var placeUrl = encodeURIComponent( place.name.replace(/ +/g, '_') );
        var placeLink = "/places/" + placeUrl  + '/' + place._id;


        // console.log( 'PLACE ITEM WITH LIST??', place );
        //RENDER ALL
                // <BasicShowList placeShows={ place.shows } allShows={ this.props.allShows } belongsToPlace={true} />
        return(
            <li>
                <h3><Link to={placeLink}>{ place.name }</Link></h3>
            </li> 
            );
        
    },


});


module.exports = PlaceItem;