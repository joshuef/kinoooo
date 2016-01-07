'use strict';

import React from 'react';

// require('styles//AppContainer.css');

class AppContainerComponent extends React.Component {
  render() {
    return (
        <div className="appcontainer-component">
            {this.props.children}
        </div>
    );
  }
}

AppContainerComponent.displayName = 'AppContainerComponent';

// Uncomment properties you need
// AppContainerComponent.propTypes = {};
// AppContainerComponent.defaultProps = {};

export default AppContainerComponent;
