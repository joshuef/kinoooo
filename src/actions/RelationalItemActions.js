import alt from 'components/Dispatcher';

class RelationalItemActions {
    constructor( options )
    {
        this.source = null;
    }

    updateItems() {
        var allItems = [ 1,2,3 ];

        return allItems;
    }

    fetchItems() 
    {
        return (dispatch) => 
        {
            // we dispatch an event here so we can have "loading" state.
            dispatch();

            // import 

            this.source.fetch()
                .then(( items ) => {
                    // we can access other actions within our action through `this.actions`
                    this.updateItems( items );
                  })
                .catch((errorMessage) => {
                    this.itemsFailed(errorMessage);
                  });
        }
    }
    itemsFailed(errorMessage) {
      return errorMessage;
    }
}

export default alt.createActions(RelationalItemActions);
