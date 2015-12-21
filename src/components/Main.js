require('normalize.css');
require('styles/App.css');


import React from 'react';
import makeActions  from '../actions/RelationalItemActions';
import Source from '../sources/SetupSource';
import makeItemStore from '../stores/RelationalItemStore';



import Show from './RelationalItemComponent';

let showsSource =  new Source( { endpoint: 'shows' } );


let ShowsActions = makeActions( { source: showsSource } );

let ShowsStore = makeItemStore({
  storeName : 'ShowsStore',
  actionSet : ShowsActions
});

ShowsActions.store = ShowsStore;


let yeomanImage = require('../images/yeoman.png');





// let Show = RelationalItem();

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

        if (this.state.errorMessage) {
            return (
              <div className="index">Something is wrong :(  {this.state.errorMessage}</div>
            );
          }
        if (!this.state.items.length) {
            return (
              <div className="index">
                LOADING
              </div>
            )
        }


        let allItems = [];


        for (var key in this.state.items ) {
          allItems.push(<Show itemInfo={this.state.items[ key ]}/>);
        }

        return (
            <div className="index">
                <img src={yeomanImage} alt="Yeoman Generator" />
                <ul className="allItems">{ allItems } </ul>
            </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
