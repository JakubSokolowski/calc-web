import React, { Suspense } from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { BaseConverterView } from '@calc/base-converter';
import { store } from '@calc/core';


describe('BaseConverterView', () => {
    let container;

    beforeEach(() => {
        container = shallow(
            <Suspense fallback={<div>Loading</div>}>
                <Provider store={store}>
                    <BaseConverterView/>
                </Provider>
            </Suspense>
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });
});
