import 'core-js/fn/object/assign';

import React from 'react';
import App from './containers/App';
import Main from './components/Main';
// import Shows from './components/Shows';

import SingleItem from './components/SingleItem';
// import Places from './components/Places';

import { Route, IndexRoute } from 'react-router';




            // <IndexRoute component={RelationalItemPage}/>
            // <Route path="about" component={RelationalItemPage} title="About" />
            // <Route path="shows" component={RelationalItemPage} />
            // <Route path="users" component={RelationalItemPage} />
            // <Route path="user/:userId" component={RelationalItemPage} />
            // <Route path="*" component={RelationalItemPage}/>

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
// render((
//   <Router history={createBrowserHistory()} >
//         <Route path="/" component={Provider} >
//         </Route>
//   </Router>
// ), document.getElementById('app') );
const Routes = (
    <Route component={App} >
        <Route path="/shows" >
            <IndexRoute component={Main} />
            <Route path="/shows/:id" component={SingleItem} relatedTo="places"/>

        </Route>
        <Route path="/places" >
            <IndexRoute component={Main} />
            <Route path="/places/:id" component={SingleItem} relatedTo="shows" />

        </Route>
        <Route path="/" component={Main} />
        <IndexRoute component={Main} />
    </Route>
);

export default Routes;
