import 'core-js/fn/object/assign';
import React from 'react';
// import ReactDOM from 'react-dom';
import App from './RelationalItemPage';

// using an ES6 transpiler, like babel
import { render } from 'react-dom'
import { Router, Route } from 'react-router';
// import { Router, Route, Link } from 'react-router';

// Render the main component into the dom

const createBrowserHistory = require('history/lib/createBrowserHistory');


// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <Route path="about" component={App}/>
      <Route path="shows" component={App}/>
      <Route path="users" component={App}>
        <Route path="/user/:userId" component={App}/>
      </Route>
      <Route path="*" component={App}/>
    </Route>
  </Router>
), document.getElementById('app') );


  // <Router>
    // <Route path="/" component={App}>
      // <Route path="about" component={About}/>
      // <Route path="users" component={Users}>
        // <Route path="/user/:userId" component={User}/>
      // </Route>
      // <Route path="*" component={NoMatch}/>
    // </Route>
  // </Router>
