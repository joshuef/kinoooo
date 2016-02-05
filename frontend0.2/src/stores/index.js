import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

const reducers = require('../reducers');
const loggerMiddleware = createLogger();

let browser = false;
let createStoreWithMiddleware = {};

if( typeof window !== 'undefined' ) //for node compat
{
    browser = true;
    createStoreWithMiddleware = applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    )(createStore)
}
else
{
    browser = browser;

   createStoreWithMiddleware = applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
    )(createStore)
}







module.exports = function(initialState) {

  initialState = {};
  if( typeof window !== 'undefined' ) //for node compat
  {
    initialState = window.__INITIAL_STATE__
  }

  const store = createStoreWithMiddleware(reducers, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
