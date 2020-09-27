import React, { Suspense } from 'react';
import { shallow } from 'enzyme';
import BaseConverterView from './base-converter-view';
import { Provider } from 'react-redux';
import { store } from '../../store/configure-store';


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
