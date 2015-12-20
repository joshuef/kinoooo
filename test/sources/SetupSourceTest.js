'use strict';

import alt from 'components/Dispatcher';
import SetupSource from 'sources/SetupSource';
// import AltTestingUtils from 'alt/utils/AltTestingUtils';


let  testSource = new SetupSource({ endpoint: 'test' });


describe('Make a Source ', () => {


    beforeEach(() => {
      });


    it( 'should be an object', () => {
            expect( testSource ).to.be.an( 'object' );
      } );



    describe('Fetch ', () => {
         it( 'should be an function', () => {
                expect( testSource.fetch ).to.be.a( 'function' );
          } );


         it( 'should return items from a source');
         it( 'should return error message when source fails');
    } );

});

