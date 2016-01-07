require('normalize.css');
require('styles/App.css');


import React from 'react';
import makeActions  from '../actions/RelationalItemActions';
import Source from '../sources/SetupSource';
import makeItemStore from '../stores/RelationalItemStore';




import Show from './RelationalItemComponent';
import Place from './RelationalItemComponent';





/// DEFINE MAJOR ENDPOINTs
let showsSource =  new Source( { endpoint: 'shows' } );
let placeSource =  new Source( { endpoint: 'places' } );


let ShowsActions = makeActions( { source: showsSource } );
let PlacesActions = makeActions( { source: placeSource } );

let ShowsStore = makeItemStore({
  storeName : 'ShowsStore',
  actionSet : ShowsActions
});

let PlacesStore = makeItemStore({
  storeName : 'PlacesStore',
  actionSet : PlacesActions
});

ShowsActions.store = ShowsStore;
PlacesActions.store = PlacesStore;






//bullsh
let yeomanImage = require('../images/yeoman.png');





// let Show = RelationalItem();

class RelationalItemPage extends React.Component {

    constructor( props, context ) {
        super( );

        console.log( 'RELATIONAL CONSTRUCTOR PROPS', props, context );
        this.state = {
            shows: [],
            places: [],
            title: props.title || 'RelationalItemPage Default Title',
            itemStore: props.itemStore || null,
            itemActions: props.itemActions || null

        };


        //suppress errors until routing context is sorted. AKA v2 of react router
        let x = context;
        x =x;


        // console.log( 'THISISHAPPENING CONSTRUCTOR', this.props.name );
        this.state.shows = ShowsStore.getState();
        this.state.places = PlacesStore.getState();

        

        //on change events should be handled in a onner
        this.onChangePlaces = this.onChangePlaces.bind(this)
        this.onChangeShows = this.onChangeShows.bind(this)

    }
      

    componentDidMount() {
            ShowsStore.listen(this.onChangeShows);
            ShowsActions.fetchItems();

            PlacesStore.listen(this.onChangePlaces);
            PlacesActions.fetchItems();
    }

    componentWillUnmount() {
          ShowsStore.unlisten(this.onChangeShows);
          PlacesStore.unlisten(this.onChangePlaces);
      }

      onChangeShows(state) {
          this.setState( { shows: state.items } );
      }
      onChangePlaces(state) {
          this.setState( { places: state.items } );
      }

    render() {

        if (this.state.errorMessage) {
            return (
              <div className="index">Something is wrong :(  {this.state.errorMessage}</div>
            );
          }
        // if (!this.state.shows.length) {
        //     return (
        //       <div className="index">
        //         LOADING
        //       </div>
        //     )
        // }

        console.log( 'RelationalPage  RENDER', this.state );

        let allPlaces = [];

        for ( var key in this.state.places ) {
          allPlaces.push(<Place key={key} itemInfo={this.state.places[ key ]} titleKey='text' />);
        }


        let allItems = [];

        for ( var key in this.state.shows ) {
          allItems.push(<Show key={key} titleKey='name' itemInfo={this.state.shows[ key ]}/>);
        }
        return (
            <div className="index">
                <img src={yeomanImage} alt="Yeoman Generator" />
                <h1>{ this.state.title }</h1>
                <ul className="relational-page__list">{ allItems } </ul>
            </div>
    );
  }
}

RelationalItemPage.defaultProps = {
};


export default RelationalItemPage;
