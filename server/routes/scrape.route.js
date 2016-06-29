'use strict';
// var authController = require("../controllers/auth");


var Show = require( "../models/show.model");
var Place = require( "../models/place.model");
var _ = require( 'lodash' );
var Joi  = require('joi');

var showRoot = '/scrape';

var scraper = require( '../scraper');


var ROOT_LINK = "http://www.berlin.de";
var MAIN_LINK = ROOT_LINK + "/kino/_bin/trefferliste.php?kino=&datum=&genre=&stadtteil=&freitext=&suche=1&kinoid=hl66u24s0gfe3gmql02e70s63a5d71cg8udkoia94cqvrnb43sr0"


// // module.exports = null;
module.exports = [
{
    method: 'GET',
    path: showRoot + '-kinos',
    config: 
    {
        handler: function(request, reply)
        { 
             var userIP = request.headers['x-forwarded-for'];
            var env = process.env.NODE_ENV;

            if( env === 'production' && userIP !== '185.10.231.179' )
            {
                reply( 'Not for you');
                return;
            }

            scraper.allKinoPages( MAIN_LINK ).then( function( allPages )
            {

                var parsedPages = allPages.reduce( function( prev, current)
                {
                    return [ scraper.parser( current ) ].concat(prev);
                }, []);


                // _.assign( {},  )
                var theShows = [];
                var thePlaces = [];

                _.each( parsedPages, function( page, i )
                {

                    theShows = theShows.concat( page.allShows );
                    thePlaces = thePlaces.concat( page.allKinos );
                });

                // console.log( 'parsedPages.shows', thePlaces );
                // 
                
                Place.update( {}, { shows: [ ] }  , function( err, place )
                {
                    console.log( 'Places cleaned! Now getting new ones.' );
                   

                    scraper.addKinos( thePlaces );

                    reply( 'kinos done!' + new Date().toString("hh:mm tt") );
                    // scraper( MAIN_LINK );

                });

                // Show.remove({}, function(err)
                // {
                //     if( err )
                //     {
                //         reply( 'error');
                //         return;
                //     }

                //     console.log( 'Shows cleaned! Now scraping'  );
                  
                //     // if( process.env.NODE_ENV == 'production' )
                //     //     return;

                //     console.log( 'handlin\' scraped shows' );
                //     scraper.addShows( theShows );
                //     reply( 'all scraping done!' );


                // })
            });

        }
        
    }
},
{
    method: 'GET',
    path: showRoot + '-shows',
    config: {
        handler: function(request, reply)
        {
            var userIP = request.headers['x-forwarded-for'];
            var env = process.env.NODE_ENV;

            if( env === 'production' && userIP !== '185.10.231.179' )
            {
                reply( 'Not for you');
                return;
            }

            scraper.allKinoPages( MAIN_LINK ).then( function( allPages )
            {

                var parsedPages = allPages.reduce( function( prev, current)
                {
                    return [ scraper.parser( current ) ].concat(prev);
                }, []);


                // _.assign( {},  )
                var theShows = [];
                var thePlaces = [];

                _.each( parsedPages, function( page, i )
                {

                    theShows = theShows.concat( page.allShows );
                    thePlaces = thePlaces.concat( page.allKinos );
                });

                // console.log( 'parsedPages.shows', thePlaces );
                // 
                
                // Place.update( {}, { shows: [ ] }  , function( err, place )
                // {
                //     console.log( 'Places cleaned! Now getting new ones.' );
                   

                //     scraper.addKinos( MAIN_LINK );

                //     // reply( 'kinos done!' );
                //     // scraper( MAIN_LINK );

                // });

                Show.remove({}, function(err)
                {
                    if( err )
                    {
                        reply( 'error');
                        return;
                    }

                    console.log( 'Shows cleaned! Now scraping'  );
                  
                    // if( process.env.NODE_ENV == 'production' )
                    //     return;

                    console.log( 'handlin\' scraped shows' );
                    scraper.addShows( theShows );
                    reply( 'show scraping done!' + new Date().toString("hh:mm tt")  );


                })
            });


        }
    }
}
];