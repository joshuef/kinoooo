import 'core-js/fn/object/assign';
import React from 'react';
// import ReactDOM from 'react-dom';
import RelationalItemPage from './RelationalItemPage';
import AppContainer from './AppContainerComponent';

// using an ES6 transpiler, like babel
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router';
// import { Router, Route, Link } from 'react-router';

// Render the main component into the dom

const createBrowserHistory = require('history/lib/createBrowserHistory');






// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router history={createBrowserHistory()} >
        <Route path="/" component={AppContainer} >
            <IndexRoute component={RelationalItemPage}/>
            <Route path="about" component={RelationalItemPage} title="About" />
            <Route path="shows" component={RelationalItemPage} />
            <Route path="users" component={RelationalItemPage} />
            <Route path="user/:userId" component={RelationalItemPage} />
            <Route path="*" component={RelationalItemPage}/>
        </Route>
  </Router>
), document.getElementById('app') );

