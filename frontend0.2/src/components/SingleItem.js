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

// moment.locale( 'de' );

class SingleItemPage extends Component {
 
    
    handleClick( )
    {
        // console.log( 'THISISHAPPENING' );
        // console.log( http );
    }

    listForPlaces( thisItem, allShows )
    {

        // console.log( 'THIS PLACE' ,  thisItem );
        let shows = thisItem.shows;

        if( shows.length < 1 )
            return;

        let uniqShowList = {};

        shows.map( show =>
        {
            let showObject = _.find( allShows, s => s._id === show );

            if( !showObject )
                return;

            // console.log( 'showwwwwwww', showObject.name );

            let thisShow = uniqShowList[ showObject.name ] || showObject;

            //filter showings
            

            let filteredShowingsOnHere = showObject.showingAt.filter( showing => showing.place === thisItem._id );

            filteredShowingsOnHere = _.uniq( filteredShowingsOnHere );

            thisShow.showingsHere = [];

            filteredShowingsOnHere.map( showing => 
            {
                let showTime = moment( showing.time );
                // console.log( 'showTime', showTime );
                showTime = moment( showTime ).calendar( );


                let showLi = <li>{ showTime }</li>;
                thisShow.showingsHere.push( showLi );
            })


            uniqShowList[ thisShow.name ] = thisShow;
        })

        // console.log( 'ALL UNIQQQQQ', uniqShowList );
        
        var arrayOfShows = Object.keys(uniqShowList).map(function (key) 
        {
            return uniqShowList[key]

          
        });

        let arrayOfComponents = arrayOfShows.map((show, index) =>
        {
            return <li {...show}
                    key={index}
                    >
                  <Link to={ '/show/' + encodeURIComponent( show.name ) + '/' }>{show.name}</Link>
                   <ul>
                    {show.showingsHere}
                  </ul>
              </li>
            
        });
                  // <ul>
                  //   {show.showings}
                  // </ul>

        return arrayOfComponents;

    }




    listForShows( thisItem, allPlaces )
    {
        let showings = thisItem.showingAt;

        if( showings.length < 1 )
            return;

        let uniqPlaceList = {};

        // console.log( 'ALL SHOWINGS', showings );
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

        // console.log( 'ALL UNIQ', uniqPlaceList );
        
        var arrayOfPlaces = Object.keys(uniqPlaceList).map(function (key) 
        {
            return uniqPlaceList[key]

          
        });

        let arrayOfComponents = arrayOfPlaces.map((place, index) =>
        {
            return <li {...place}
                    key={index}
                    >
                  <Link to={ '/place/' + encodeURIComponent( place.name ) + '/' }>{place.name}</Link>
                  <ul>
                    {place.showings}
                  </ul>
              </li>
            
        });

        return arrayOfComponents;

    }


    render() {

        let itemType = getItemTypeFromRoute( this.props.location );

        // console.log( 'SINGLE itemType', itemType );

        let thisItemList = this.props.relationalItems[ itemType ];


        let props = this.props;

        // console.log( 'SIngleItem props', props );
        // console.log( 'SIngleItem ', this );

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



        let itemName = thisItem.name || '...?';


        //showSpecifics file
        let list = [];

        if( itemType === 'shows' )
        {
            list = this.listForShows( thisItem , this.props.relationalItems.places );


        }

        if( itemType === 'places' )
        {
            // console.log( 'PLACCEESSSS' );
            list = this.listForPlaces( thisItem , this.props.relationalItems.shows );
        }



        // console.log( 'THE LISTTTT', list );
        // console.log( 'THE LOCATIONSSS', list );

        // _.forEach( list, place=> 
        // {
        //     // console.log( 'A PLACE IN THE LIST', place.name );
        // })


      
        return (
            <div className="main--{ itemType }  ">
                <h1>{itemName}</h1>
                <ul>
                    {list}
                </ul>
            </div>
        );
  }
}





SingleItemPage.defaultProps = {
    relationalItems: {}
};

SingleItemPage.propTypes = {
  relationalItems: PropTypes.object.isRequired
};


export default SingleItemPage;
