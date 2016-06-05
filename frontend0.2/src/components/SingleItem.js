    // require('normalize.css');
require('styles/App.css');

import React, {
  Component,
  PropTypes
} from 'react';

import getItemTypeFromRoute from '../shared/getItemType';

import http from 'http';

class MainPage extends Component {
    static needsItems =
    [
        'places',
        'shows'
    ];
    
    handleClick ( e )
    {
        console.log( 'THISISHAPPENING' );
        console.log( http );
    }

    render() {

        console.log( 'ITEM props', this.props );

        let itemType = getItemTypeFromRoute( this.props.location );

      
        // console.log( 'relationalitems Here', this.props.relationalItems );
   

        // let relationalItems = this.props.relationalItems[ itemType ] || [];

                // <RelationalItemList itemType={ itemType } relationalItems={ relationalItems } />
        return (
            <div className="main--{ itemType }  ">
                <h1>{itemType} // </h1>
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
