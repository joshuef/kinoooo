'use strict';

import alt from 'components/Dispatcher';
import { RelationalItemStore } from 'stores//RelationalItemStore';
import AltTestingUtils from 'alt/utils/AltTestingUtils';

describe('RelationalItemStore', () => {

  let storeClass;

  // Clean up localStorage before each try
  beforeEach(() => {
    storeClass = AltTestingUtils.makeStoreTestable(alt, RelationalItemStore);
  });
});
