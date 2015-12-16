import alt from 'components/Dispatcher';

export class RelationalItemStore {

  constructor() {
    this.items = [];
    this.actionSet = null;

    this.bindListeners({
        handleFetchItems: this.actionSet.FETCH_ITEMS,
        handleUpdateItems: this.actionSet.UPDATE_ITEMS,
        handleFailedItems: this.actionSet.ITEMS_FAILED
    });

    handleFetchItems() 
    {
        //things to do with fetching
        // this.locations = locations;
    }
  }


}

export default alt.createStore(RelationalItemStore, 'RelationalItemStore');
