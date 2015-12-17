import alt from 'components/Dispatcher';

export class RelationalItemStore {

    constructor(  options ) {
        this.items = [];

        if( options )
        {
            this.actionSet = options.actionSet || null;
        }

        console.log ( this );

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


export default function( options )
{  
    var ourItemStore = alt.createStore( RelationalItemStore, options.storeName, options);

    return ourItemStore;
    // return alt.createStore( ourItemStore, options.storeName )
    // return alt.createActions(ourItemActions);
}

//
// export default function( options )
// {
//     return ourRlationalItemActions;
//     // return alt.createActions( RelationalItemActionsClass, options);
// }
