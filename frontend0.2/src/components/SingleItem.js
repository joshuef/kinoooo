    // require('normalize.css');
require('styles/App.css');

import React, {
  Component,
  PropTypes
} from 'react';

import _ from 'lodash';
import getItemTypeFromRoute from '../shared/getItemType';
import { Link } from 'react-router'
import moment from 'moment';
import http from 'http';

class MainPage extends Component {
    static needsItems =
    [
        'places',
        'shows'
    ];

 

    //   //not on server
    // componentDidMount(  )
    // {

    //     console.log( 'MOUNTYYYYY' );
    //     if( this.props.actions && this.props.relationalItems.shows < 1 )
    //     {
    //         this.props.actions.fetchItems( 'shows' );
    //         this.props.actions.fetchItems( 'places' );
            
    //     }

    //     if( this.props.actions && this.props.relationalItems.places < 1 )
    //     {

    //     }
    // }
    
    handleClick( )
    {
        console.log( 'THISISHAPPENING' );
        console.log( http );
    }





    listForShows( thisItem, allPlaces )
    {
        let showings = thisItem.showingAt;

        if( showings.length < 1 )
            return;

        let uniqPlaceList = {};

        showings.map( showing =>
        {
            let place = _.find( allPlaces, p => p._id === showing.place );

            if( !place )
                return;

            let placeShowingThis = uniqPlaceList[ place.name ] || { name: place.name, showings: [] };

            let showTime = moment( showing.time , "YYYY-MM-DD HH:mm" );
            showTime = moment( showTime ).calendar( );

            let showingLi = <li>{ showTime }</li>;

            placeShowingThis.showings.push( showingLi );

            uniqPlaceList[ place.name ] = placeShowingThis;
        })

        console.log( 'ALL UNIQ', uniqPlaceList );
        
        var arrayOfPlaces = Object.keys(uniqPlaceList).map(function (key) 
        {
            return uniqPlaceList[key]

          
        });

        let arrayOfComponents = arrayOfPlaces.map((place, index) =>
        {
            return <li {...place}
                    key={index}
                    >
                  <Link to={ '/places/' + encodeURIComponent( place.name ) + '/' }>{place.name}</Link>
                  <ul>
                    {place.showings}
                  </ul>
              </li>
            
        });

        return arrayOfComponents;

    }


    render() {

        let itemType = getItemTypeFromRoute( this.props.location );
        let thisItemList = this.props.relationalItems[ itemType ];


        let props = this.props;

        console.log( 'SIngleItem props', props );
        console.log( 'SIngleItem ', this );

        let thisItem = _.find( thisItemList, function(o)
            {
                let theId   = props.params.id;


                console.log( 'theId', theId );
                return  o.name === theId;
            }) ;

        if( ! thisItem )
        {
            return ( <span>loading...</span>);
        }



        console.log( 'THIS ITEMMM???', thisItem );

        let itemName = thisItem.name || '...?';


        //showSpecifics file
        let list = [];

        if( itemType = 'shows' )
        {
            list = this.listForShows( thisItem , this.props.relationalItems.places );
        }

        if( itemType = 'places' )
        {
            console.log( 'PLACCEESSSS' );
            // list = this.listForShows( thisItem , this.props.relationalItems.places );
        }



        console.log( 'THE LISTTTT', list );

        _.forEach( list, place=> 
        {
            console.log( 'A PLACE IN THE LIST', place.name );
        })


      
        return (
            <div className="main--{ itemType }  ">
                <h1>{itemType} // {itemName}</h1>
                <ul>
                    {list}

                   
                </ul>
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
