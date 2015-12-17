require('normalize.css');
require('styles/App.css');


// import alt from 'components/Dispatcher';

import React from 'react';
import makeActions  from '../actions/RelationalItemActions';
import ShowsSource from '../sources/showsSource';
import makeItemStore from '../stores/RelationalItemStore';



// export default alt.createActions(RelationalItemActions);




// let ShowsActions = alt.createActions( RelationalItemActionsClass, 'ShowsActions', { source: ShowsSource } );
let ShowsActions = makeActions( { source: ShowsSource });

console.log( 'THISISACTIONHAPPENING', ShowsActions );


let ShowsStore = makeItemStore({
  storeName : 'ShowsStore',
  actionSet : ShowsActions
});

console.log( 'THISISSTOREHAPPENING', ShowsStore );
// ShowsActions.store = ShowsStore;


let yeomanImage = require('../images/yeoman.png');




class AppComponent extends React.Component {

    // getInitialState() {
    //     return ShowsStore.getState();
    // }
    //
    // componentDidMount() {
    //       ShowsStore.listen(this.onChange);
    //
    //       // ShowsActions.fetchLocations();
    // }



    // componentWillUnmount() {
    //     ShowsStore.unlisten(this.onChange);
    // }
    //
    // onChange(state) {
    //     this.setState(state);
    // }


    render() {
        // this.state
        console.log( 'this.state', this.state );
        // if (this.state.errorMessage) {
        //     return (
        //       <div>Something is wrong :(</div>
        //     );
        //   }
        // if (!this.state.locations.length) {
        //     return (
        //       <div>
        //         LOADING
        //       </div>
        //     )
        // }
        return (
            <div className="index">
                <img src={yeomanImage} alt="Yeoman Generator" />
                <div className="notice">Please { this.state } edit <code>src/components/Main.js</code> to get started!</div>
            </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;





//// exampe of store listening
///
///
///var LocationStore = require('../stores/LocationStore');

// var Locations = React.createClass({
//   getInitialState() {
//     return LocationStore.getState();
//   },

//   componentDidMount() {
//     LocationStore.listen(this.onChange);
//   },

//   componentWillUnmount() {
//     LocationStore.unlisten(this.onChange);
//   },

//   onChange(state) {
//     this.setState(state);
//   },

//   render() {
//     return (
//       <ul>
//         {this.state.locations.map((location) => {
//           return (
//             <li>{location.name}</li>
//           );
//         })}
//       </ul>
//     );
//   }
// });
