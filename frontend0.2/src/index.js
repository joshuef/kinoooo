// import AllRoutes from './wrapped-routes'
import { render } from 'react-dom';


import 'core-js/fn/object/assign';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './stores';

import { Router } from 'react-router';
import AllRoutes from './routes';

import { syncReduxAndRouter } from 'redux-simple-router'
import { browserHistory } from 'react-router'


const store = configureStore();
const history = browserHistory;

syncReduxAndRouter(history, store)


render ( (
    <Provider store={store}>
        <Router history={ history } >
             {AllRoutes}
        </Router>
    </Provider>
), document.getElementById('app') ) ;
