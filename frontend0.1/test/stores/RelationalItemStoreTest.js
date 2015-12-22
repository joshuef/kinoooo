'use strict';

import alt from 'components/Dispatcher';
import RelationalItemStore from 'stores/RelationalItemStore';
// import AltTestingUtils from 'alt/utils/AltTestingUtils';



let fakeActionSet = {
    FETCH_ITEMS : 'here',
    UPDATE_ITEMS : 'here',
    ITEMS_FAILED : 'here'
};

let testStore = RelationalItemStore({ storeName: 'testStore', actionSet: fakeActionSet });

describe('RelationalItemStore', () => {

  let storeClass;

  // Clean up localStorage before each try
  // beforeEach(() => {
  //   // testStore = RelationalItemStore({ storeName: 'testStore', actionSet: fakeActionSet });
  //   // storeClass = AltTestingUtils.makeStoreTestable(alt, RelationalItemStore);
  // });


  it( 'should have items and it should be an array' );
  it( 'should have an actionset' );
  it( 'should have empty items at the start' );
});
