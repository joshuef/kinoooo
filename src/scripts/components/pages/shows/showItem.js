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


            console.log( 'showprops name', show.name );
        return(
            <li>
                <h3><Link to={showLink}>{ show.name }</Link></h3>
                <BasicPlaceList showPlaceTimes={show.showingAt} allPlaces={this.props.allPlaces} belongsToShow={true}/>

            </li> 
        );
        
    }
});

module.exports = ShowItem;