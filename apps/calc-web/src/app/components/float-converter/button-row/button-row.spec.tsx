import React from 'react';
import { shallow } from 'enzyme';
import { ButtonRowComponent } from './button-row';


describe('ButtonRowComponent', () => {
    let container;

    beforeEach(() => {
        container = shallow(
            <ButtonRowComponent values={[]}/>
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });
});
