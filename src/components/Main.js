require('normalize.css');
require('styles/App.css');


import React from 'react';
import makeActions  from '../actions/RelationalItemActions';
import Source from '../sources/SetupSource';
import makeItemStore from '../stores/RelationalItemStore';



import Show from './RelationalItemComponent';
// import Place from './RelationalItemComponent';





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
        }
        this.state.shows = ShowsStore.getState();
        // this.state.places = PlacesStore.getState();
        this.onChange = this.onChange.bind(this)

      }

      componentDidMount() {
            ShowsStore.listen(this.onChange);

            ShowsActions.fetchItems();
      }

      componentWillUnmount() {
          ShowsStore.unlisten(this.onChange);
      }

      onChange(state) {
          this.setState( { shows: state.items } );
      }

    render() {


            console.log( 'thisSTATE?', this.state );

        if (this.state.errorMessage) {
            return (
              <div className="index">Something is wrong :(  {this.state.errorMessage}</div>
            );
          }
        if (!this.state.shows.length) {
            return (
              <div className="index">
                LOADING
              </div>
            )
        }


        let allShows = [];

        for ( var key in this.state.shows ) {
          allShows.push(<Show key={key} itemInfo={this.state.shows[ key ]}/>);
        }

        return (
            <div className="index">
                <img src={yeomanImage} alt="Yeoman Generator" />
                <ul className="allPlaces">{ allShows } </ul>
                <ul className="allShows">{ allShows } </ul>
            </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
