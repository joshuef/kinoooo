const getItemTypeFromRoute = function ( location, singular )
{
  if( ! location )
        return new Error( 'no type from route');

    let pathArray       = location.pathname.split( /\// ) || [];
    let itemType        = pathArray[ 1 ] || ''; //should always be second
    
    let last = itemType[itemType.length-1];

    if( itemType.length > 3 && last !== 's' )
    {
        itemType = itemType + 's';
    }

    // if( singular )
    // {
    //     itemType = getSingularItemType( itemType );
    // }

    return itemType;

}

export let getSingularItemType = function( itemType )
{
    return  itemType.replace( /s$/,'')

}

// export getSingularItemType;

export default getItemTypeFromRoute;