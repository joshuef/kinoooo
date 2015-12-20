require('normalize.css');
require('styles/App.css');


import React from 'react';
import makeActions  from '../actions/RelationalItemActions';
import Source from '../sources/SetupSource';
import makeItemStore from '../stores/RelationalItemStore';

let showsSource =  new Source( { endpoint: 'shows' } );


let ShowsActions = makeActions( { source: showsSource } );

let ShowsStore = makeItemStore({
  storeName : 'ShowsStore',
  actionSet : ShowsActions
});

ShowsActions.store = ShowsStore;


let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {

      constructor( options ) {
        super( options );
        this.state = ShowsStore.getState();
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
          this.setState(state);
      }

    render() {
        console.log( 'this.state', this.state );


        if (this.state.errorMessage) {
            return (
              <div>Something is wrong :(  {this.state.errorMessage}</div>
            );
          }
        if (!this.state.items.length) {
            return (
              <div>
                LOADING
              </div>
            )
        }
        return (
            <div className="index">
                <img src={yeomanImage} alt="Yeoman Generator" />
                <div className="notice">Please { this.state.items[0].name } edit <code>src/components/Main.js</code> to get started!</div>
            </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
