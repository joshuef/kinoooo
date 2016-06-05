/**
 * Config Location
 */
 process.env.GETCONFIG_ROOT = __dirname + '/config';


 var Hapi = require('hapi');
 var server = new Hapi.Server();
 var _ = require( "lodash" );
 var fs = require('fs');
 var path = require('path');
 var request = require('superagent');
 var cheerio = require('cheerio');
 var moment = require('moment');

var ROOT_LINK = "http://www.berlin.de";
var MAIN_LINK = ROOT_LINK + "/kino/_bin/trefferliste.php?kino=&datum=&genre=&stadtteil=&freitext=&suche=1&kinoid=hl66u24s0gfe3gmql02e70s63a5d71cg8udkoia94cqvrnb43sr0"

var Place = require( "./models/place.model");



// var parseKinos = function(  )

var scraper = 
{

    addKinos : function( link )
    {
        request.get( link ).end( function( err, response )
        {
            if( err )
            {
                console.log( 'ERRRORRS', err );
            }

            console.log( 'RESSSPPOONNNNNNCCCEEEEEEEEEE' );

            var results = parser( response );

            console.log( 'ALL OUR RESULTS', results );

            _.each( results.allKinos, function( kino )
            {
                var place = { name: kino };
                console.log( 'adding kino', place.name );

                request
                .post( 'http://127.0.0.1:8011/places/add' )
                .send( place )
                .end( function( err, response )
                {
                    console.log( 'errorrrrr', err );
                    console.log( 'response on send', response );
                })

            });
        });


        // var results = getResults(link);

    },


    addShows : function ( link )
    {
        request.get( link ).end( function( err, response )
        {
            if( err )
            {
                console.log( 'ERRRORRS', err );
            }

            console.log( 'RESSSPPOONNNNNNCCCEEEEEEEEEE' );

            var results = parser( response );

            var thisShowsPlace = '';
            var thisShowsPlaceObject = {};

            _.each( results.allShows, function( show )
            {
                // console.log( 'adding show', show );
                // var show = { 
                //     name: show.name
                //      };
            

                //before we do this, we need to find the place Ids.
                //Each show as scraped is at one place. They are deduped and merged when adding or updating
                //the show and place
                

            // console.log( 'PAYLOADDDDD', payload.showingAt );

                if( show.showingAt.length <1 )
                    return;

                if( thisShowsPlaceObject.name !== show.showingAt[0].place )
                {
                    console.log( 'new PLACe', show.showingAt[0].place, 'not', thisShowsPlaceObject.name );

                    Place.findOne({ 'name': show.showingAt[0].place }, 'name', function(err, foundPlace)
                    {
                        // console.log( 'err', err );
                        // console.log( 'FOUNDPLACE', foundPlace.name );

                        thisShowsPlaceObject = foundPlace;

                        _.each( show.showingAt, function( placeTime )
                        {

                            placeTime.place = foundPlace._id;

                            console.log( 'PLACE IDDDD', foundPlace._id );

                        } );


                        //then we make a request to add!!
                        request
                        .post( 'http://127.0.0.1:8011/shows/add' )
                        .send( show )
                        .end( function( err, response )
                        {
                            if( err )
                                console.log( 'errorrrrr', err );
                            // console.log( 'response on send', response );
                        })
                    
                    });
                }
                else
                {
                    console.log( 'SAME PLACE', show );
                }

            });

        });


    }
};





 var parser = function( response )
 {
    $ = cheerio.load( response.text );
    var allKinos = [];
      // var allKinos = $( 'h2' );

    var results = $( '.searchresult' ).children();

    var currentKino = '';

    var allShows = [];

    var nextLink = $( '.horizontal.pager' ).children().last().children('a');
    // console.log( 'NEXXXXXXTTTTTTTTTTTT', nextLink );

    // if( nextLink.length == 1 )
    // {
    //     var nextUrl = $(nextLink).attr('href');
    //     var actualNextUrl = ROOT_LINK + nextUrl;
    //     console.log( 'ACTUALLLLNEXXXXXXTTTTTTTTTTTT', actualNextUrl );

    //     if( typeof nextUrl != 'undefined' )
    //     {
    //         getAndParseLinkForPlaces( actualNextUrl );
    //     }
    // }



    var currentShowObject = {
            name: 'noname',
            showingAt : [ ]
        };

    _.each( results, function( result, i )
    {
        result = $( result );


        //first lets set up the current kino we're in
        if( result[0].name === 'h2' )
        {
            // console.log( 'KINOOO', result.text() );
            currentKino = result.text();
            allKinos.push( result.text() );
        }

        var currentShowName = '';

        //only our movie will have the reference here, and then the kinos added later
        if( result[0].name === 'h3' )
        {
            currentShowName = result.text();
        }

        //setup default object
        var currentShow = {
            name: currentShowName,
            showingAt : [ ]
        };

        //replace with previous if no new title
        if( currentShowName === '' )
        {
            currentShow = currentShowObject;
            
        }

        currentShowObject = currentShow;
 

        if( result[0].name === 'div' )
        {
            _.each( result.find( 'tr' ), function( time )
            {
                time = $( time );
                moment.locale('de');
                time = time.children( '.datum' ).text() + time.children( '.uhrzeit' ).text();

                //parse out first few chars cos we dont need em
                time = time.substring( 4 );

                var showTime = moment( time, 'DD-MM-YY HH:mm' );

                currentShow.showingAt.push( 
                {
                    place: currentKino,
                    time: showTime
                });

                //then we have td datum and tds for each time; convert to moment
                //and save
                // console.log( 'TIME?', time.text() );
                // currentShow.times.push( time.text() )
                
            });


        }



        // console.log( 'CURRENT SHOOWWWW', currentShow );

        //commented out FOR NOW
        allShows.push( currentShow );
    } );

    // console.log( 'allSHOWS' , allShows );
    // console.log( 'allkinos' , allKinos );

    return {
        allShows : allShows,
        allKinos : allKinos
    }
};


// getResults = function( link )
// {
//     console.log( 'getting results' );
//     return request.get( link )

//     .end( function( err, response )
//     {
//         if( err )
//         {
//             console.log( 'ERRRORRS', err );
//         }

//         console.log( 'RESSSPPOONNNNNNCCCEEEEEEEEEE' );

//         return parser( response );
//     });

// }

// getAndParseLinkForPlaces = function( link )
// {
    

//     addKinos( link );


        

//         //now we push all kinos

//         // var thisPagesShows = parser( response );

//     } );

// }

module.exports = scraper;
// module.exports = getResults;
// getAndParseLinkForPlaces( MAIN_LINK );

