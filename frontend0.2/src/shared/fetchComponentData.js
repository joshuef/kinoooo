import  FetchItems   from '../actions/relationalItems/fetchItems';

export default function fetchComponentData(dispatch, components, params) {
  const needs = components.reduce( (prev, current) => {

    // add in some basic items to fetch to reduce reusual
    if( current && current.needsItems )
    {
        let itemsToFetch = current.needsItems.reduce( ( prev, current ) => {

            return [ FetchItems( current ) ].concat(prev);
        }, []);
        
        if( ! Array.isArray(current.needs) )
        {
            current.needs = [];
        }
            current.needs = itemsToFetch.concat( current.needs ) ;
    }


    return current ? (current.needs || []).concat(prev) : prev;
  }, []);

  const promises = needs.map(need => need( dispatch, params));


  //what we need is the 'thing' to be called, and then only return true for promises
  //once that has been received.

  return Promise.all(promises);
}
