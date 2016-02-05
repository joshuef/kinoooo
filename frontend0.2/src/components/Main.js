    // require('normalize.css');
require('styles/App.css');

import React, {
  Component,
  PropTypes
} from 'react';

import RelationalItemList from './RelationalItemList';


class MainPage extends Component {
        static needsItems =
    [
        'shows'
    ];

    render() {

        let itemType = '';

        if( this.props.route )
        {
            let pathArray       = this.props.route.path.split( /\// ) || [];
            itemType            = pathArray[ pathArray.length -1 ] || '';
        }
   

        let relationalItems = this.props.relationalItems[ itemType ] || this.props.relationalItems;

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
