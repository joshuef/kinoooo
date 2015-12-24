import alt from 'components/Dispatcher';

export class RelationalItemActions{
    constructor( options )
    {
      if( options )
      {
          this.source     = options.source || null;
          this.store      = options.store || null;
          this.options    = options;
      }

    }

    updateItems( items ) {

        return items;
    }

    fetchItems(){
        return (dispatch) =>
        {
            // we dispatch an event here so we can have "loading" state.
            dispatch();

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


export default function( options )
{
  var ourRlationalItemActions = {}
    var ourRlationalItemActions = alt.createActions( RelationalItemActions, ourRlationalItemActions, options);
    return ourRlationalItemActions;
}
