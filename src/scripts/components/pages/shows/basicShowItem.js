'use strict';
var React = require('react/addons');

var _ = require('lodash');

var Router = require('react-router');
var Link = Router.Link;

var ShowItem = React.createClass({

    
    render: function()
    {
        console.log( 'BASICSHOWITEM', this.props );
        if( ! this.props.thisShow )
        {
            console.log( 'NO SHOW' );
            return null;
        }

        var show = this.props.thisShow;

        if( show )
        {
            var showId = show;
            var showsStore = this.props.allShows;

            show = _.findWhere( showsStore, { _id: showId });

        }
        else
        {
            console.log( 'NO ID' );
            return null;
        }
            
        if( _.isUndefined( show ) || _.isUndefined( show.name ) )
        {
            console.log( 'STILL NO SHOW NAME' );
            return null;
        }

        var showLink = "/shows/" + show.name + '/' + show._id;
       
    return(
        <li>
            <h6><Link to={showLink}>{ show.name }</Link></h6>
        </li> 
        );
      
    }
});

module.exports = ShowItem;