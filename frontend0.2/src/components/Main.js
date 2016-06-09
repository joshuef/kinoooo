    // require('normalize.css');

import React, {
  Component,
  PropTypes
} from 'react';

import RelationalItemList from './RelationalItemList';
import http from 'http';

require('styles/App.css');

import getItemTypeFromRoute from '../shared/getItemType';

class MainPage extends Component {
    static needsItems =
    [
        'shows',
        'places'
    ];
    
  

    render() {

        let itemType = getItemTypeFromRoute( this.props.location );

      
        // console.log( 'relationalitems Here', this.props.relationalItems );
   

        let relationalItems = this.props.relationalItems[ itemType ] || [];

        return (
            <div className="main--{ itemType }  ">
                <h1>{itemType}</h1>
                <RelationalItemList itemType={ itemType } relationalItems={ relationalItems } />
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
