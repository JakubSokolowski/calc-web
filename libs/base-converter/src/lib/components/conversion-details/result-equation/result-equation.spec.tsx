import { mount } from 'enzyme';
import React from 'react';
import { ResultEquation } from './result-equation';
import { fromNumberDetailed } from '@calc/calc-arithmetic';

describe('ResultEquation', () => {
    let container;
    const conversion = fromNumberDetailed(10, 2);

    beforeEach(() => {
        container = mount(
           <ResultEquation conversion={conversion} firstStage={0} lastStage={0}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
