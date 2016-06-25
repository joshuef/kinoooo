// require('styles/App.css');

import React, {
  Component,
  PropTypes
} from 'react';

import { Link } from 'react-router';
import Sole from './Sole';
import _ from 'lodash';
import { browserHistory } from 'react-router'
import { getSingularItemType } from '../shared/getItemType';
import Styles from '../styles/RelationalItemList.css';

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

        this.setState( { query: val });

        if( val.length > 0 )
        {
            browserHistory.push( '/' + this.props.itemType + '/search/' + val )
            
        }
        else
        {
            browserHistory.push( '/' + this.props.itemType )

        }
     
    }


    getRelevantItemsFromProps( query )
    {
        let matches = this.sole.isThereAnythingRelatedTo( val, this.state.searchableItems );

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
    

    componentWillReceiveProps(nextProps) 
    {

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

        }


        let relationalItems = nextProps.relationalItems || [];
        let matches = null;
        let matchesForDisplay = null;
        let query;


        if( searchableItems && nextProps.params && nextProps.params.query )
        {
            query = nextProps.params.query;

            matches = this.sole.isThereAnythingRelatedTo( query, searchableItems );
        }


        if ( matches )
        {

            matchesForDisplay = matches.map( result => 
            {
                return  _.findWhere( relationalItems, { name: result.d.text } );
            });

          
        }

          this.setState({
            allListItems : relationalItems,
            allRelevantListItems : matchesForDisplay || relationalItems
            // query : query
          });
    }

    render() {

        const allRelevantListItems = this.state.allRelevantListItems;
        console.log( 'STYLES', Styles );
        let singleItemType = getSingularItemType( this.props.itemType );

        // if( allRelevantListItems.length < 1 )
        // {
        //     return ( <div /> );
        // }

        return (
            <div>
                <h1>Search all {this.props.itemType}:</h1>

                <input placeholder={ 'Search ' +  this.props.itemType + '...'} className={ Styles.searchBox } type="text" ref="search" value={this.props.params.query} onChange={ this.fuzzySearch.bind( this ) } />
               
                <ul>
                    { allRelevantListItems.map((item, index) =>
                        <li {...item}
                              key={index}
                              >
                            <Link to={ '/' + singleItemType + '/' + encodeURIComponent( item.name ) + '/' }>{item.name}</Link>
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
