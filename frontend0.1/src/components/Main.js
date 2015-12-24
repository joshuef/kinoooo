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

class AppComponent extends React.Component {

      constructor( options ) {
        super( options );
        this.state = {
            shows: [],
            places: []
        };

        console.log( 'THISISHAPPENING' );
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

        console.log( 'THISISHAPPENING', this.props );

        let allPlaces = [];

        for ( var key in this.state.places ) {
          allPlaces.push(<Place key={key} itemInfo={this.state.places[ key ]} titleKey='text' />);
        }


        let allShows = [];
                // <h1>{this.props.params.path}</h1>

        for ( var key in this.state.shows ) {
          allShows.push(<Show key={key} titleKey='name' itemInfo={this.state.shows[ key ]}/>);
        }

        return (
            <div className="index">
                <img src={yeomanImage} alt="Yeoman Generator" />
                <ul className="allPlaces">{ allPlaces } </ul>
                <ul className="allShows">{ allShows } </ul>
            </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
