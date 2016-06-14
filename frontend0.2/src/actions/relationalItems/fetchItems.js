import fetch from 'isomorphic-fetch'


import receiveItems from './receiveItems';
import requestItems from './requestItems';

const API = `/api/`;

module.exports = function fetchItems( itemName ) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return dispatch => {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestItems( itemName ))

console.log( 'PROCESSS', process.env.NODE_ENV );

    let URIbase = '//dev.londonplay.com';

    if ( process.env.NODE_ENV === 'production' )
    {
        URIbase = 'http://theatre.wyli.co.uk';

      console.log( 'PRODDUCCTIIOOOONNNNNN' );
    }

    let jsonURL =  URIbase + API + itemName 
    console.log( 'before the thinnngggg' , jsonURL);

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch( jsonURL )
      .then(response => response.json() )
      .catch( (error, respose) => {

        console.log('ERRRRRRR:', error) //do something with this!
      })
      .then(json =>
      {
        if( json[itemName] )
        {
          json = json[itemName];
        }
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveItems( itemName , json))
        
      })

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}
