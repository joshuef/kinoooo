'use strict';
var React = require('react/addons');

var BasicPlaceList = require( "../places/basicPlaceList" );
var _ = require('lodash');

var Router = require('react-router');
var Link = Router.Link;

var ShowItem = React.createClass({
componentWillMount : function( )
{
    console.log( 'SHOW ITEM MOUNTING' );
},
    render: function()
    {
        console.log( 'SHOWPROPS', this.props );
        if( ! this.props.thisShow.name )
        {
            console.log( 'NO NAME' );
            return null;
        }

        var show = this.props.thisShow;


        var showLink = "/shows/" + show.name + '/' + show._id;


        // if( ! show.name )
        // {
        //     //ie. passed from a show
            
        //     if( show.showId )
        //     {

        //         var showId = this.props.show.showId;
        //         var showsStore = this.props.shows;

        //         show = _.findWhere( showsStore, { _id: showId });

        //     }
        //     else
        //     {
        //             console.log( 'NO ID' );
        //             return null;
        //     }
            
        // }

        console.log( 'showprops name', show.name );
        return(
            <li>
                <h3><Link to={showLink}>{ show.name }</Link></h3>
                <BasicPlaceList showPlaces={show.places} allPlaces={this.props.allPlaces} belongsToShow={true}/>

            </li> 
        );
        
    }
});

module.exports = ShowItem;