/**
 * Config Location
 */
 process.env.GETCONFIG_ROOT = __dirname + '/config';

// TODO
// Currently its addings showings twice. WHY???
// Make it scrape first then parse in a oner


var Hapi = require('hapi');
var server = new Hapi.Server();
var _ = require( "lodash" );
var fs = require('fs');
var path = require('path');
// var request = require('superagent');
var request = require('superagent-bluebird-promise');
var cheerio = require('cheerio');
// var moment = require('moment');
var moment = require('moment-timezone');
var Promise = require("bluebird");




var ROOT_LINK = "http://www.berlin.de";
var MAIN_LINK = ROOT_LINK + "/kino/_bin/trefferliste.php?kino=&datum=&genre=&stadtteil=&freitext=&suche=1&kinoid=hl66u24s0gfe3gmql02e70s63a5d71cg8udkoia94cqvrnb43sr0"

var Place = require( "./models/place.model");

var POST_LINK = 'http://127.0.0.1:8011/';
var ENV = process.env.NODE_ENV;
var moreToParse = false;

if( ENV === 'production' )
{
    POST_LINK = "http://theatre.wyli.co.uk/api/"
}

var buildFullShowArray = function( results )
{

    //DYING IN HERE DUE TO CONCATTTTTT

    console.log( 'filtering shows' );
    var giantShowObject = {};

    _.each( results, function( show, i )
    {

        if( show.name === 'placeholderNoName' )
            return;

        var ov      = show.name.indexOf( ' (OV)' ) != -1 ;
        var omu     = show.name.indexOf( ' (OmU)' ) != -1;
        var omEnU   = show.name.indexOf( ' (OmenglU)' ) != -1;
        var threeD  = show.name.indexOf( ' 3D' ) != -1 ;
        var df      = show.name.indexOf( ' (DFmenglU)' ) != -1 ;


        // console.log( 'SHOW NAMMEEE', show.name, '@???');



        show.name = show.name.replace( /\s\((OV|OmU|3D|DFmenglU|OmenglU)\)|\s3D/, '' ).trim();


        // if( placeName.lowercase().indexOf( 'freiluft') > -1 ||
        //     placeName.lowercase().indexOf( 'Open Air') > -1  ||
        //     placeName.lowercase().indexOf( 'Open-Air') > -1  ||
        //     placeName.lowercase().indexOf( 'licht') > -1  ||
        //     )
        var freiluft = show.showingAt.place ? show.showingAt.place.lowercase().indexOf( 'freiluft') != -1 : false ;
        //freilicht
        //openair
        var flags = {
            ov: ov, 
            omu: omu,
            threeD: threeD,
            df: df,
            // freiluft: freiluft,
        };


        // console.log( 'flagggssss', flags );

        // var mainObjectShow = giantShowObject[ show.name ];

        // var showName = show.name;
        var ourShowObject = {}
        var newShow = false;

        if( giantShowObject[ show.name ] )
        {
            // console.log( 'IT EXISTSS ON THE OBJECT' );
            ourShowObject = giantShowObject[ show.name ];

        } 
        else
        {
            newShow = true;
            // console.log( 'it did not already exist' );
            ourShowObject = show;
            // console.log( 'show.name:::', show.name );
        }

        _.each( show.showingAt, function( timePlace )
        {
            // console.log( 'show.showingAt:::', timePlace.place );
            // console.log( 'SHOW @@@@@', timePlace.place );
            timePlace.flags = flags;

        });


        if( ! newShow )
        {
            // console.log( 'about to concattttttt' );
            // console.log( 'not a new showww, so concattt' );
            ourShowObject.showingAt = ourShowObject.showingAt.concat( show.showingAt );
            ourShowObject.showingAt = _.uniq( ourShowObject.showingAt );

            // console.log( 'post concatttt' );
        }

        giantShowObject[ show.name ] = ourShowObject;
        // show.showingAt = _.uniq( show.showingAt );

        // giantShowObject[ show.name ].showingAt = _.concat( giantShowObject[ show.name ].showingAt, show.showingAt );
    })




    var arrayOfShows = Object.keys(giantShowObject).map(function (key) {return giantShowObject[key]});

    // console.log( 'GIANT SHOW OBJECT', giantShowObject );
    return arrayOfShows;


};

// var parseKinos = function(  )
// 
// 
// 








var scraper = 
{

    addKinos : function( kinosArray )
    {
        
        var results = kinosArray;

        console.log( 'kinosArray', kinosArray );

        _.each( results, function( kino )
        {

            console.log( 'kinoooooo', kino );
            var placeName = kino;
            var isFreiluft = false;

            if( placeName.toLowerCase().indexOf( 'freiluft') > -1 ||
                placeName.toLowerCase().indexOf( 'open air') > -1  ||
                placeName.toLowerCase().indexOf( 'open-air') > -1  ||
                placeName.toLowerCase().indexOf( 'licht') > -1  )
            {
                isFreiluft = true;
            }

            var place = { 
                name: kino,
                isFreiluft : isFreiluft
            };

            console.log( 'adding kino', place );
            console.log( 'to link::: ', POST_LINK );

            request
            .post( POST_LINK + 'places/add' )
            .send( place )
            .end( function( err, response )
            {
                if( err )
                {
                    console.log( 'errorrrrr', err );
                }
                else
                {
                    console.log( 'success added' );
                }

            })

        });



    },


    addShows : function ( showsArray )
    {

        console.log( 'adddinnngggg shows' );
      
        var results = showsArray;

        var thisShowsPlace = '';
        var thisShowsPlaceObject = {};
        var filteredShows =  buildFullShowArray( results );


        console.log( 'got filtered' );

        _.each( filteredShows, function( show , i )
        {
            console.log( 'i of show', i , show.name );
            // show.showingAt = _.uniq( show.showingAt ); 
            show.showingAt = _.uniqBy( show.showingAt, function( value )
            {
                // console.log( 'value', value );
                return '' + value.place + value.time;
            } );


            _.each( show.showingAt, function( placeTime , i )
            {

                // console.log( 'placcceee', placeTime.place );
                // console.log( 'FoundPlaceShow', show.name );
                // console.log( 'show.showingAt', placeTime.place + '' + placeTime.time );

                placeTime.time = moment( placeTime.time ).tz("Europe/Berlin").format();



            } );




            // console.log( 'And our number of shows is: i ', i,  show.name );

            request
            .post( POST_LINK + 'shows/add' )
            .send( show )
            .end( function( err, response )
            {
                if( err )
                    console.log( 'errorrrrr', err );

                console.log( 'SENNTTT', response );
                // console.log( 'response on send', response );
            });


                
            // }
            // else
            // {
            //     console.log( 'SAME PLACE', show );
            // }

        });

    


    },

    pagesArray : [],


    allKinoPages : function ( link )
    {
        // this.pagesArray = [];
        var self = this;
        var res = new Promise(function(resolve) {
            //Without new Promise, this throwing will throw an actual exception
            // var params = parse(urlString);
            
            resolve( self.addPageToArray( link , self.pagesArray ) );
        });

        return res;

    },

  


    addPageToArray : function( link, pagesArray )
    {
        console.log( 'adding page' );
        var self = this;

        return new Promise(function(resolve) 
        {

            request.get( link ).then( function( response )
            {

                $ = cheerio.load( response.text );  

                pagesArray.push( response.text );

                var nextLink = $( '.horizontal.pager' ).children().last().children('a');

                if( nextLink.length == 1 )
                {
                    var nextUrl = $(nextLink).attr('href');
                    var actualNextUrl = ROOT_LINK + nextUrl;


                    console.log( 'nextUrl', nextUrl );
                    if( typeof nextUrl !== 'undefined' )
                    {
                        console.log( 'calling again' );
                        resolve( self.addPageToArray( actualNextUrl, pagesArray ) );

                        return;
                    }
                    // else
                    // {

                    //     resolve ( pagesArray );
                    // }
                }
                else
                {
                    console.log( 'FINISSSSSSSSSSSSSSSSHED' );
                    resolve ( pagesArray );
                    
                }

            });
            
        }).catch( function( err )
        {
            console.log( 'Error in addPageToArray request', err );
        });

    },


     parser : function( response )
     {
        $ = cheerio.load( response );
        var allKinos = [];
          // var allKinos = $( 'h2' );

        var results = $( '.searchresult' ).children();

        var currentKino = '';

        var allShows = [];


        var currentShowObject = {
                name: 'placeholderNoName',
                showingAt : [ ]
            };

            // console.log( 'results from cheerio' );

        _.each( results, function( result, i )
        {
            result = $( result );


            //first lets set up the current kino we're in
            if( result[0].name === 'h2' )
            {
                // console.log( 'KINOOO', result.text() );
                currentKino = result.text();
                allKinos.push( result.text() );

                // console.log( 'kino,', result.text() );
            }

            // if( currentKino !== 'Astra-Filmpalast (Treptow)' )
            // {
            //     console.log( 'not this kino, ', currentKino );
            //     return;

            // }


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
     

            // if( currentShow.name !== 'Bastille Day' )
            // {
            //     return

            // }
            // console.log( 'currentSHOWNAME', currentShowName );
            // console.log( 'currentShowName', currentShowName );
            // console.log( 'currentkinoName', currentKino );

            if( result[0].name === 'div' )
            {
                _.each( result.find( 'tr' ), function( time )
                {
                    // console.log( 'found a time' );
                    time = $( time );
                    moment.locale('de');

                    var hours = time.children( '.uhrzeit' ).text().split( ', ' );

                    hours = hours.map( function( hour )
                    {
                        var thisShowTime = time.children( '.datum' ).text() + hour;

                        // console.log( 'showtime FOr the HOURRR',  );
                        //parse out first few chars cos we dont need em
                        thisShowTime = thisShowTime.substring( 4 );

                        var showTime = moment( thisShowTime, 'DD.MM.YY HH:mm' ).tz("Europe/Berlin").format();
                        // var showTime = moment( thisShowTime, 'DD.MM.YY HH:mm' );
                        // console.log( 'on @@@@', showTime );

                        currentShow.showingAt.push( 
                        {
                            place: currentKino,
                            time: showTime
                        });
                    });




                    //then we have td datum and tds for each time; convert to moment
                    //and save
                    // console.log( 'TIME?', time.text() );
                    // currentShow.times.push( time.text() )
                    
                });

                currentShow.showingAt = _.uniq( currentShow.showingAt );


            }



            // console.log( 'CURRENT SHOOWWWW', currentShow );

            //commented out FOR NOW
            allShows.push( currentShow );
        } );

        // console.log( 'allSHOWS' , allShows );
        // console.log( 'allkinos' , allKinos );
        // console.log( 'allShowsInParser', allShows );
        return {
            allShows : allShows,
            allKinos : allKinos
        }
    }
};





module.exports = scraper;

