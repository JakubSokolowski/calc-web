import { shallow } from 'enzyme';
import React from 'react';
import { DocPage } from '@calc/docs';

describe('DocPage', () => {
    let container;

    const fetchMock = jest.fn();
    window.fetch = fetchMock;

    const docText = '## Base Conversion';
    const docResponse = {
        text: () => Promise.resolve(docText),
    } as Response;

    fetchMock.mockReturnValueOnce(Promise.resolve(docResponse));

    beforeEach(() => {
        container = shallow(
            <DocPage path={'some/path'}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
