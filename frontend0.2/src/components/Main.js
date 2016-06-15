    // require('normalize.css');

import React, {
  Component,
  PropTypes
} from 'react';

import RelationalItemList from './RelationalItemList';
import http from 'http';
import { Link } from 'react-router';

require('styles/App.css');

import getItemTypeFromRoute from '../shared/getItemType';

class MainPage extends Component {
    // static needsItems =
    // [
    //     'shows',
    //     'places'
    // ];
    
  

    render() {

        console.log( 'this.props', this.props );

        let itemType = getItemTypeFromRoute( this.props.location ) || "It's Kino Time";

      
        // console.log( 'relationalitems Here', this.props.relationalItems );
   

        let relationalItems = this.props.relationalItems[ itemType ] || [];

        return (
            <div className="main--{ itemType }  ">
                <h1>{itemType}</h1>
                <Link to="/shows">shows</Link>
                <Link to="/places">kinos</Link>
                <RelationalItemList params={ this.props.params } itemType={ itemType } relationalItems={ relationalItems } />
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
