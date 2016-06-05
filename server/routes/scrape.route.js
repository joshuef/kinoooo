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
    config: {
        handler: function(request, reply)
        {
            console.log( 'handlin\' scrape kinos' );
            scraper.addKinos( MAIN_LINK );

            reply( 'kinos done!' );
            // scraper( MAIN_LINK );
            
        }
    }
},
{
    method: 'GET',
    path: showRoot + '-shows',
    config: {
        handler: function(request, reply)
        {
            console.log( 'handlin\' scrape shows' );
            scraper.addShows( MAIN_LINK );
            reply( 'shows done!' );

        }
    }
}
];