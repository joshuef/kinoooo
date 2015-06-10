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


 var mainLink = "http://www.berlin.de/kino/_bin/trefferliste.php?kino=&datum=&genre=&stadtteil=&freitext=&suche=1&kinoid=hl66u24s0gfe3gmql02e70s63a5d71cg8udkoia94cqvrnb43sr0"




 var parser = function( response )
 {
    $ = cheerio.load( response.text );
    var allKinos = [];
      // var allKinos = $( 'h2' );

    var results = $( '.searchresult' ).children();

    var currentKino = '';

    var allShows = [];


    _.each( results, function( result, i )
    {
        result = $( result );

        if( result[0].name === 'h2' )
        {
            // console.log( 'KINOOO', result.text() );
            currentKino = result.text();
            allKinos.push( result.text() );
        }


        var currentShow = {
            name: '',
            showingAt : [ ]
        };
        //only our movie will have the reference here, and then the kinos added later
        if( result[0].name === 'h3' )
        {
            currentShow = { name: result.text() } ;
        }

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


            // console.log( 'TIMESSSSS', result.find( 'tr' ) );
        }


        allShows.push( currentShow );
    } );

    // console.log( 'allSHOWS' , allShows );
    // console.log( 'allkinos' , allKinos );

    return {
        allShows : allShows,
        allKinos : allKinos
    }
};

request.get( mainLink ).on('error', function( err )
{
    console.log( 'ERRORS', error );

} ).end( function( response )
{
    var results = parser( response );
    console.log( 'ALL OUR RESULTS', results );

    _.each( results.allKinos, function( kino )
    {
        console.log( 'adding kino', kino );
        var place = { name: kino };

        request
        .post( 'http://127.0.0.1:8011/places/add' )
        .send( place );

    });

    //now we push all kinos

    // var thisPagesShows = parser( response );

} );



