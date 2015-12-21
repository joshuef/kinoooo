'use strict';

import React from 'react';

require('styles//RelationalItem.css');

class RelationalItemComponent extends React.Component {
  render() {

    console.log( 'SHOW PROPS', this.props );


    return (
        <div className="relationalitem-component">
            {this.props.itemInfo.name}
        </div>
    );
  }
}

RelationalItemComponent.displayName = 'RelationalItemComponent';

// Uncomment properties you need
// RelationalItemComponent.propTypes = {};
// RelationalItemComponent.defaultProps = {};

export default RelationalItemComponent;
