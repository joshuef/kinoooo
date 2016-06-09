// require('styles/App.css');

import React, {
  Component,
  PropTypes
} from 'react';

import { Link } from 'react-router';
import Sole from './Sole';
import _ from 'lodash';

// import SearchProps from './SearchProps';

class RelationalItemList extends Component {

 /**
     * ## fuzzySearch
     *
     * searches for things
     *
     * @param {Object} e event object
     *
     * @return _Void_
     */
    fuzzySearch( e )
    {

        let val =  this.refs.search.value.trim();


        let matches = this.sole.isThereAnythingRelatedTo( val, this.state.searchableItems );

        // console.log( 'matcccchhessss', val, matches  );


        if ( matches )
        {
            let matchesForDisplay = matches.map( result => 
            {
                // console.log( 'resulttttt', result );
                return  _.findWhere( this.props.relationalItems, { name: result.d.text } );
            });

            // console.log( 'matchesForDisplay' );

            //we match the names from the matches to the original array
            //
            

           this.setState({ allRelevantListItems : matchesForDisplay })
        }
        // else
        // {
        //     this.fuzzySearchReset();
        // }
     
    }


    /**
     * ## fuzzySearchReset
     *
     * resets all options to visible
     *
     * @return _Void_
     */
    // fuzzySearchReset()
    // {
    //     let refs = this.refs;

    //     refs.search.value = '';
    // }


    constructor( props )
    {
        super( props );

        this.state = {
            allListItems : props.relationalItems || [],
            allRelevantListItems : props.relationalItems || []
        }

        this.sole = new Sole();
    }
    
    // handleTextChange ( )
    // {
    //     let searchValue = this.refs.search.value ;

    //     console.log( 'THISISHAPPENING', searchValue );

    //     let score 
    // }

    componentWillReceiveProps(nextProps) {

        let searchableItems;

        if( nextProps.relationalItems )
        {
            searchableItems = nextProps.relationalItems.map( item => 
            {
                return {
                    text: item.name,
                    value: ''
                }
            });

            // console.log( 'searchable ITEMSMSSSS', searchableItems );
        }

          this.setState({
            allListItems : nextProps.relationalItems || [],
            allRelevantListItems : nextProps.relationalItems || [],
            searchableItems : searchableItems
          });
        }
    render() {

        const allRelevantListItems = this.state.allRelevantListItems;

        return (
            <div>
                <input type="text" ref="search" onChange={ this.fuzzySearch.bind( this ) } />

                <ul>
                    { allRelevantListItems.map((item, index) =>
                              <li {...item}
                                    key={index}
                                    >
                                  <Link to={ '/' + this.props.itemType + '/' + encodeURIComponent( item.name ) + '/' }>{item.name}</Link>
                              </li>
                    )}
                </ul>
            </div>
        )
    }
}

RelationalItemList.defaultProps = {
    relationalItems: []

};

RelationalItemList.propTypes = {
  relationalItems: PropTypes.array.isRequired
};

export default RelationalItemList;
