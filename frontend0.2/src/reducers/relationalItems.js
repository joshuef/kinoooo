/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */


const initialState = {
  shows: [ ]
};



module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  switch(action.type) {
    
    case 'FETCH_ITEMS': {
      return state;

    } break;

    case 'RECEIVE_ITEMS' : {

      let nextState = {};

      nextState[ action.parameter ] = action.items;

      //relational items should be debunked up one step to just shows
      nextState = Object.assign({}, state, nextState);
      // Modify next state depending on the action and return it
      return nextState;
    } break;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
