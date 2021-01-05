import { mount } from 'enzyme';
import React from 'react';
import { NumberSubscript } from '@calc/common-ui';

describe('NumberSubscript', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <NumberSubscript value={''}/>
        );
    });

    it('should render number', () => {
        // when
        container = mount(
            <NumberSubscript value={'12'} subscript={10}/>
        );

        // then
        expect(container.text()).toEqual('12(10)');
    });

    it('should render without braces if no braces is set to true', () => {
        // when
        container = mount(
            <NumberSubscript value={'12'} subscript={10} noBraces/>
        );

        // then
        expect(container.text()).toEqual('1210');
    })
});
