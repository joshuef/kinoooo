require('normalize.css');
require('styles/App.css');

import React from 'react';
import RelationalItemActions from '../actions/RelationalItemActions';
import ShowsSource from '../sources/showsSource';
import RelationalItemStore from '../stores/RelationalItemStore';
console.log( 'THISISHAPPENING', RelationalItemActions );

// let ShowsActions = new RelationalItemActions({    
//     source : ShowsSource,
//     store  : null
// });



let ShowsStore = new RelationalItemStore({ actionSet : ShowsActions });

ShowsActions.store = ShowsStore;


let yeomanImage = require('../images/yeoman.png');




class AppComponent extends React.Component {

    getInitialState() {
        return ShowsStore.getState();
    }

    componentDidMount() {
          ShowsStore.listen(this.onChange);

          // ShowsActions.fetchLocations();
    }



    componentWillUnmount() {
        ShowsStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }


    render() {
        console.log( 'this.state', this.state );
        if (this.state.errorMessage) {
            return (
              <div>Something is wrong :(</div>
            );
          }
        if (!this.state.locations.length) {
            return (
              <div>
                LOADING
              </div>
            )
        }
        return (
            <div className="index">
                <img src={yeomanImage} alt="Yeoman Generator" />
                <div className="notice">Please { this.state.items } edit <code>src/components/Main.js</code> to get started!</div>
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