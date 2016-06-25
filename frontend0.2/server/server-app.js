import path from 'path'
import Express from 'express'
import { Provider } from 'react-redux';

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import Routes from '../dist/assets/server-routes'

import configureStore from '../src/stores';
import critical from 'critical';


import NodeCache from  "node-cache" ;

var myCache = new NodeCache( { stdTTL: 21600 } );

// let apicache = require('apicache').options({ debug: true }).middleware;

//MOVE THESE TO NOT SRC
import fetchComponentData from '../src/shared/fetchComponentData';

// import ejs from 'e js'


console.log( 'TOPPPPP' );
const app = Express();



console.log( 'PROCESSS', process.env.NODE_ENV );

let port = process.env.PORT  || 8001;
if( process.env.NODE_ENV === 'production' )
{
    port = 30281;
}



console.log( 'AFTER EXPRESSS' );

// app.set('views', 'server/views/');
// app.set('view engine', 'ejs');

// This is fired every time the server side receives a request
app.use('*?/assets', Express.static(path.join(__dirname, '../dist/assets') ) );
// app.use( apicache('5 minutes') );
app.use( handleRender );

console.log( 'AFTER USSE' );

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Create a new Redux store instance
  // const store = createStore(counterApp)
  const store = configureStore();

  //perhaps here, deal with the fetch of basic data for the store. And only update when the store is empty?


  console.log( 'HANDLINGGG', req.url );
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes: Routes, location: req.url }, (error, redirectLocation, renderProps) => {

      // console.log( 'matched url' );

    if( req.url === '/flushAll' )
    {
        console.log( 'Fluching cache' );
        myCache.flushAll();
        res.end( 'flushed' );
    }

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) 
    {

        // console.log( 'RENDER PROPS', req.url );

        let cached = false;
    // let obj = { my: "Special", variable: 42 };
        if( process.env.NODE_ENV === 'production' )
        {
            myCache.get( req.url, function( err, value )
            {
                if( !err ){
                  if(value == undefined){
                    // key not found 
                  }else{
                    console.log( 'serving cached url: ', req.url );

                    cached = true;

                    res.end( value )
                    //{ my: "Special", variable: 42 } 
                    // ... do something ... 
                  }
                }
            });
          
        }


        if ( cached )
        {
            return;
        }


        function renderView( things ) {

          // console.log( 'rendering viewwww' );
          const initialState = store.getState();
          // console.log( 'initalState', initialState );

              const InitialView = (
                <Provider store={store}>
                  <RouterContext {...renderProps} />
                </Provider>
              );
              const componentHTML = renderToString(InitialView);

              const HTML = `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <title>It's Kino Time</title>
                  <link href="dist/assets/styles.css" media="all" rel="stylesheet" />

                  <script>
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                  </script>
                  <style></style>
                </head>
                <body>
                  <div id="app">${componentHTML}</div>
                  <script type="application/javascript" src="assets/app.js"></script>
                </body>
              </html>
              `;

              return HTML;

            }

            function inlineCriticalCss( html )
            {

              // console.log( 'Generating CSSSS', html );
                return critical.generate({
                  html: html,
                  dimensions: [{
                      height: 300,
                      width: 480
                  }, {
                      height: 900,
                      width: 1200
                  }],
                  dest: ''
                }).then(function (output) {

                    // if( process.env.NODE_ENV === 'development' )
                    //   {
                    //     return html;
                    //   }

                  // console.log( 'CSSSSSSSSSSSSSSS OUTPUUUTTT', output);
                    let finalHtml = html.replace(/<style><\/style>/g, '<style>'+ output +'</style>');
                    finalHtml = finalHtml.replace(/dist\//g, '');

                    return finalHtml;

                })
                .catch(function (err) {
                  console.log( 'CSSSSSSSSSSSSSSS ERRROORORORRRR', err);
                });
            }



            fetchComponentData(store, renderProps.components, renderProps.params)
                .then(renderView)
                .then( indexObject => inlineCriticalCss( indexObject ))
                .then(html => 
                    {

                        myCache.set( req.url, html, function( err, success )
                        {
                            if( !err && success ){
                              console.log( 'cacheeeddd!', req.url );

                              // true 
                              // ... do something ... 
                            }
                        });

                        res.end(html);

                    })
                .catch(err => res.end(err));



      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
    } else {
      res.status(404).send('Not fooooound')
    }
  })

// res.end('blam')

}



app.listen(port, () => {
  console.log('listening on *:' + port);
})
