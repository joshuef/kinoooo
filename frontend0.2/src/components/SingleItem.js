    // require('normalize.css');
require('styles/App.css');

import React, {
  Component,
  PropTypes
} from 'react';

import _ from 'lodash';
import getItemTypeFromRoute from '../shared/getItemType';

import http from 'http';

class MainPage extends Component {
    static needsItems =
    [
        'places',
        'shows'
    ];
    
    handleClick ( )
    {
        console.log( 'THISISHAPPENING' );
        console.log( http );
    }

    render() {

        let itemType = getItemTypeFromRoute( this.props.location );
        let thisItemList = this.props.relationalItems[ itemType ];

        let props = this.props;

        let thisItem = _.find( thisItemList, function(o) 
            { 
                let theId   = props.params.id;
                return  o.name === theId; 
            });

      
        return (
            <div className="main--{ itemType }  ">
                <h1>{itemType} // {thisItem.name}</h1>
            </div>
        );
  }
}

MainPage.defaultProps = {
    relationalItems: {}
};

MainPage.propTypes = {
  relationalItems: PropTypes.object.isRequired
};

export default MainPage;
