/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';
// import ReactAddons    from 'react/addons' // You also need to require the addons

import RelationalItemComponent from 'components/RelationalItemComponent.js';

describe('RelationalItemComponent', () => {
    let component;
    let componentProps = { 

                        itemInfo:
                            { 
                                    name: 'bob' 
                            },
                        titleKey : 'name'
                        } ;
                    

    beforeEach(() => {
      component = createComponent( RelationalItemComponent, componentProps );

      console.log( 'COMPONENT??', component.props );
    });


    it('should output a string from provided props', () => {
      expect(component.props.children).to.be.an( 'string' );
      expect(component.props.children).to.equal( 'bob' );
    });



    it('should have its component name as default className', () => {
      expect(component.props.className).to.equal('relationalitem-component');
    });
});
