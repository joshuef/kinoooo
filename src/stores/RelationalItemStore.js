import alt from 'components/Dispatcher';

export class RelationalItemStore {

    constructor(  options ) {
        this.items = [];

        let actionSet = options.actionSet || null;

        console.log ( this );

        if( actionSet )
        {
            this.bindListeners({
                handleFetchItems:   actionSet.FETCH_ITEMS,
                handleUpdateItems:  actionSet.UPDATE_ITEMS,
                handleItemsFailed:  actionSet.ITEMS_FAILED
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


export default function( options )
{
    var ourItemStore = alt.createStore( RelationalItemStore, options.storeName, options);

    return ourItemStore;
}
