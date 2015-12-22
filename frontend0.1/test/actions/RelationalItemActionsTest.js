'use strict';

import alt from 'components/Dispatcher';
import makeActions from 'actions/RelationalItemActions';
// import AltTestingUtils from 'alt/utils/AltTestingUtils';



let source = {
    fetch: function() {
        return [1,2,3];
    }
};
let fakeStore = {
  fetch: [1,2,3]
};

let  testItemActions = makeActions({ source: source, store: fakeStore });


describe('Make a RelationalItemActions object', () => {

    let storeClass;

      // Clean up localStorage before each try
    beforeEach(() => {
      });


    it( 'should be an object', () => {
            expect( testItemActions ).to.be.an( 'object' );
      } );



    describe('Fetchitems ', () => {
         it( 'should be an function', () => {
                expect( testItemActions.fetchItems ).to.be.a( 'function' );
          } );


         it( 'should return items from a source');
         it( 'should return error message when source fails');
    } );


    describe('Updateitems ', () => {
        let testItemArray = [ 1, 2 ];
        it( 'should be an function', () => {
                expect( testItemActions.updateItems ).to.be.a( 'function' );
          } );
        it( 'should return passed items', () => {
                expect( testItemActions.updateItems( testItemArray ) ).to.equal( testItemArray );
          } );
    } );
    describe('Items failed', () => {

        it( 'should to be an function', () => {
            expect( testItemActions.itemsFailed ).to.be.a( 'function' );
        } );

        it( 'should return a message passed', () => {
            expect( testItemActions.itemsFailed( 'woops' ) ).to.be.a( 'string' );
            expect( testItemActions.itemsFailed( 'woops' ) ).to.equal( 'woops' );
        } );
    } );
});

