    // require('normalize.css');

import React, {
  Component,
  PropTypes
} from 'react';

import RelationalItemList from './RelationalItemList';
import http from 'http';
import KinosNav from './KinosNav'
require('styles/App.css');

import getItemTypeFromRoute from '../shared/getItemType';

const defaultType = 'shows';

class MainPage extends Component {
    // static needsItems =
    // [
    //     'shows',
    //     'places'
    // ];
    
  

    render() {

        let props = this.props;

        let itemType = getItemTypeFromRoute( props.location ) || defaultType;

      
        // console.log( 'relationalitems Here', props.relationalItems );
   

        let relationalItems = props.relationalItems[ itemType ];

        return (
            <div className="main--{ itemType }  ">
                <RelationalItemList params={ props.params } itemType={ itemType } relationalItems={ relationalItems } />
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
