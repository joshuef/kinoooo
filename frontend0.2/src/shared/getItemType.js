const getItemTypeFromRoute = function ( location )
{
  if( ! location )
        return new Error( 'no type from route');

    let pathArray       = location.pathname.split( /\// ) || [];
    let itemType        = pathArray[ 1 ] || ''; //should always be second
    

    return itemType;

}

export default getItemTypeFromRoute;