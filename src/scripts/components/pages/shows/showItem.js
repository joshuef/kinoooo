'use strict';
var React = require('react/addons');

var BasicPlaceList = require( "../places/basicPlaceList" );
var _ = require('lodash');

var Router = require('react-router');
var Link = Router.Link;

var ShowItem = React.createClass({
    componentWillMount : function( )
    {

    },
    render: function()
    {

        if( ! this.props.thisShow.name  || 
            this.props.thisShow.showingAt.length < 1 )
        {
            return null;
        }



        var show = this.props.thisShow;
        var showLink = "/shows/" + show.name + '/' + show._id;


            // console.log( 'showprops name', show.name );
            // 
            // 
            

            // remove basic place list for now
            // <BasicPlaceList showPlaceTimes={show.showingAt} allPlaces={this.props.allPlaces} belongsToShow={true}/>
        return(
            <li>
                <h3><Link to={showLink}>{ show.name }</Link></h3>

            </li> 
        );
        
    }
});

module.exports = ShowItem;