/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import RelationalItemPage from 'components/RelationalItemPage';

describe('RelationalItemPageComponent', () => {
    let RelationalItemPageComponent;

    beforeEach(() => {
      RelationalItemPageComponent = createComponent(RelationalItemPage);
    });

    it('should have its component name as default className', () => {

        console.log( 'MAine Componnent', RelationalItemPageComponent );
      expect(RelationalItemPageComponent.props.className).to.equal('index');
    });
});
