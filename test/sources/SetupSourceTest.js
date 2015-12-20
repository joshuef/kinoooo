'use strict';

import alt from 'components/Dispatcher';
import SetupSource from 'sources/SetupSource';
// import AltTestingUtils from 'alt/utils/AltTestingUtils';



// let source = {
//     fetch: function() {
//         return [1,2,3];
//     }
// };
// let fakeStore = {
//   fetch: [1,2,3]
// };

let  testSource = new SetupSource({ endpoint: 'test' });


describe('Make a Source ', () => {

    // let storeClass;

      // Clean up localStorage before each try
    beforeEach(() => {
      });


    it( 'should be an object', () => {
            expect( testSource ).to.be.an( 'object' );
      } );



    // describe('Fetchitems ', () => {
    //      it( 'should be an function', () => {
    //             expect( testSource.fetchItems ).to.be.a( 'function' );
    //       } );


    //      it( 'should return items from a source');
    //      it( 'should return error message when source fails');
    // } );


    // describe('Updateitems ', () => {
    //     let testItemArray = [ 1, 2 ];
    //     it( 'should be an function', () => {
    //             expect( testSource.updateItems ).to.be.a( 'function' );
    //       } );
    //     it( 'should return passed items', () => {
    //             expect( testSource.updateItems( testItemArray ) ).to.equal( testItemArray );
    //       } );
    // } );
    // describe('Items failed', () => {

    //     it( 'should to be an function', () => {
    //         expect( testSource.itemsFailed ).to.be.a( 'function' );
    //     } );

    //     it( 'should return a message passed', () => {
    //         expect( testSource.itemsFailed( 'woops' ) ).to.be.a( 'string' );
    //         expect( testSource.itemsFailed( 'woops' ) ).to.equal( 'woops' );
    //     } );
    // } );
});

