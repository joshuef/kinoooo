'use strict';
var React = require('react/addons');
var PlaceItem = require( "../places/placeItem" );
var _ = require('lodash');

var Router = require('react-router');
var Link = Router.Link;

// var EditLink = React.createClass({
//     render : function( )
//     {
//         if( ! this.props.user.isAdmin )
//         {
//             return null;
//         }

//         return ( 
//             <a href="/edit">Edit</a>);

//     }
// });
var ShowItem = React.createClass({

    render: function()
    {

        if( ! this.props.show.name )
        {
            console.log( 'NO NAME' );
            return null;
        }

        var show = this.props.show;
        // console.log( 'SHOWPLACES', show );

        var allPlaces = show.places;
        var places = [];


        for (var key in allPlaces) {
          places.push(<PlaceItem belongsToShow={true} key={key} place={allPlaces[key]} placesStore={this.props.places}/>);
        }


        var showLink = "/shows/" + this.props.show.name + '/' + this.props.show._id;

        if( this.props.belongsToPlace )
        {
            return(
                <li>
                    <h6><Link to={showLink}>{ this.props.show.name }</Link></h6>
                    <ul class="place-list">{places}</ul>

                </li> 
                );
        }
        else
        {
             return(
                <li>
                    <h3><Link to={showLink}>{ this.props.show.name }</Link></h3>
                    <ul class="place-list">{places}</ul>

                </li> 
                );
        }
    }
});

module.exports = ShowItem;