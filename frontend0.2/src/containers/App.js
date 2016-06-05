/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */

import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import  FetchItems   from 'actions/relationalItems/fetchItems';
require('styles/App.css');


// const allItems = [ 'shows', 'places' ];

/* Populated by react-webpack-redux:reducer */
class App extends Component {

            
    //not on server
    componentDidMount(  )
    {
        // if( this.props.actions && this.props.relationalItems.shows < 1 )
        // {
            this.props.actions.fetchItems( 'shows' );
            
        // }

        // if( this.props.actions && this.props.relationalItems.places < 1 )
        // {
            this.props.actions.fetchItems( 'places' );

        // }
    }

    componentWillReceiveProps( nextProps )
    {
        console.log( 'PROPS COMING', nextProps );
        this.setState( nextProps.relationalItems )

    }

    render() {
        return (
            <div className="index">
                {React.cloneElement(this.props.children, {relationalItems: this.props.relationalItems})}
            </div>
        )
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.object.isRequired,
  relationalItems: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = { relationalItems: state.relationalItems };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    updateItem: require('../actions/relationalItems/updateItem.js'),
    fetchItems: require('../actions/relationalItems/fetchItems.js'),
    receiveItems: require('../actions/relationalItems/receiveItems.js'),
    invalidateItems: require('../actions/relationalItems/invalidateItems.js'),
    requestItems: require('../actions/relationalItems/requestItems.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
