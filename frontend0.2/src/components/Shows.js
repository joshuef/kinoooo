    // require('normalize.css');
require('styles/App.css');

import React, {
  Component,
  PropTypes
} from 'react';

import RelationalItemList from './RelationalItemList';
import http from 'http';

class MainPage extends Component {
    static needsItems =
    [
        'shows'
    ];
    
    handleClick ( e )
    {
        console.log( 'THISISHAPPENING' );
        console.log( http );
    }

    render() {

        let itemType = '';

        if( this.props.route )
        {
            let pathArray       = this.props.route.path.split( /\// ) || [];
            itemType            = pathArray[ pathArray.length -1 ] || '';
        }


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
