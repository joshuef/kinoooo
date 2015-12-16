require('normalize.css');
require('styles/App.css');

import React from 'react';
import RelationalItemActions from '../actions/RelationalItemActions';
import showsSource from '../sources/showsSource';
import RelationalItemStore from '../stores/RelationalItemStore';

let ShowsActions = new RelationalItemActions({    
    source : showsSource
});


let ShowsStore = new RelationalItemStore({ actionSet : ShowsActions });

let yeomanImage = require('../images/yeoman.png');






class AppComponent extends React.Component {

    // getInitialState() {
    //     return LocationStore.getState();
    // },

    render() {

        // let aye = ShowsActions.fetchItems();
    
        return (
            <div className="index">
                <img src={yeomanImage} alt="Yeoman Generator" />
                <div className="notice">Please {aye} edit <code>src/components/Main.js</code> to get started!</div>
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