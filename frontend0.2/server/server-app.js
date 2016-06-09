import path from 'path'
import Express from 'express'
// import { Provider } from 'react-redux';

// import React from 'react'
// import { renderToString } from 'react-dom/server'
// import { match, RouterContext } from 'react-router'
// import { RouterContext } from 'react-router';
// import Routes from '../dist/assets/server-routes'

// import configureStore from '../src/stores';
// import critical from 'critical';

// import fetchComponentData from '../src/shared/fetchComponentData';

// import ejs from 'e js'


console.log( 'TOPPPPP' );
const app = Express()
const port = process.env.PORT || 8001;


console.log( 'AFTER EXPRESSS' );

// app.set('views', 'server/views/');
// app.set('view engine', 'ejs');

// This is fired every time the server side receives a request
app.use('/assets', Express.static(path.join(__dirname, '../dist/assets')));
app.use(handleRender);

console.log( 'AFTER USSE' );

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Create a new Redux store instance
  // const store = createStore(counterApp)
  const store = configureStore();
  console.log( 'HANDLINGGG' );
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  // match({ routes: Routes, location: req.url }, (error, redirectLocation, renderProps) => {

  //   if (error) {
  //     res.status(500).send(error.message)
  //   } else if (redirectLocation) {
  //     res.redirect(302, redirectLocation.pathname + redirectLocation.search)
  //   } else if (renderProps) {


  //       function renderView( things ) {

  //         const initialState = store.getState();

  //             // const InitialView = (
  //             //   <Provider store={store}>
  //             //     <RouterContext {...renderProps} />
  //             //   </Provider>
  //             // );
  //             // const componentHTML = renderToString(InitialView);
  //             const componentHTML = '';

  //             const HTML = `
  //             <!DOCTYPE html>
  //             <html>
  //               <head>
  //                 <meta charset="utf-8">
  //                 <title>It's Kino Time</title>
  //                 <link href="dist/assets/styles.css" media="all" rel="stylesheet" />

  //                 <script>
  //                   window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
  //                 </script>
  //                 <style></style>
  //               </head>
  //               <body>
  //                 <div id="app">${componentHTML}</div>
  //                 <script type="application/javascript" src="assets/app.js"></script>
  //               </body>
  //             </html>
  //             `;

  //             return HTML;

  //           }

  //           function inlineCriticalCss( html )
  //           {
  //               return critical.generate({
  //                 html: html,
  //                 dimensions: [{
  //                     height: 300,
  //                     width: 480
  //                 }, {
  //                     height: 900,
  //                     width: 1200
  //                 }],
  //                 dest: ''
  //               }).then(function (output) {


  //                 console.log( 'CSSSSSSSSSSSSSSS OUTPUUUTTT', output);
  //                   let finalHtml = html.replace(/<style><\/style>/g, '<style>'+ output +'</style>');
  //                   finalHtml = finalHtml.replace(/dist\//g, '');

  //                   return finalHtml;

  //               })
  //               .error(function (err) {
  //                 console.log( 'CSSSSSSSSSSSSSSS ERRROORORORRRR', err);
  //               });
  //           }

  //           fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
  //               .then(renderView)
  //               .then( indexObject => inlineCriticalCss( indexObject ))
  //               .then(html => res.end(html))
  //               .catch(err => res.end(err.message));



  //     // You can also check renderProps.components or renderProps.routes for
  //     // your "not found" component or route respectively, and send a 404 as
  //     // below, if you're using a catch-all route.
  //   } else {
  //     res.status(404).send('Not fooooound')
  //   }
  // })

res.end('blam')

}



app.listen(port, () => {
  console.log('listening on *:' + port);
})
