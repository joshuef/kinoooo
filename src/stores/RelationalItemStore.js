import alt from 'components/Dispatcher';

export class RelationalItemStore {

    constructor(  options ) {
        this.items = [];

        if( options )
        {
            this.actionSet = options.actionSet || null;
        }

        if( this.actionSet )
        {
            this.bindListeners({
                handleFetchItems:   this.actionSet.FETCH_ITEMS,
                handleUpdateItems:  this.actionSet.UPDATE_ITEMS,
                handleItemsFailed:  this.actionSet.ITEMS_FAILED
            });
            
        }
    }

    handleFetchItems() {
        // reset the array while we're fetching new locations so React can
        // be smart and render a spinner for us since the data is empty.
        this.items = [];

    }


    handleUpdateItems( items ) {
        // reset the array while we're fetching new locations so React can
        // be smart and render a spinner for us since the data is empty.
        this.items = items;

    }

    handleItemsFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

}

export default alt.createStore(RelationalItemStore, 'RelationalItemStore');
