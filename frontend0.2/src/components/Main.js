    // require('normalize.css');
require('styles/App.css');

import React, {
  Component,
  PropTypes
} from 'react';

import RelationalItemList from './RelationalItemList';
import http from 'http';

import getItemTypeFromRoute from '../shared/getItemType';

class MainPage extends Component {
    static needsItems =
    [
        'shows',
        'places'
    ];
    
    handleClick ( )
    {
        console.log( 'THISISHAPPENING' );
        console.log( http );
    }

    render() {

        let itemType = getItemTypeFromRoute( this.props.location );

      
        console.log( 'relationalitems Here', this.props.relationalItems );
   

        let relationalItems = this.props.relationalItems[ itemType ] || [];

        return (
            <div className="main--{ itemType }  ">
                <h1>{itemType}</h1>
                <button onClick={ this.handleClick }/>
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
