import { mount } from 'enzyme';
import React from 'react';
import { DocPage } from '@calc/docs';
import { waitForComponentToPaint } from '@calc/utils';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useRouteMatch: () => ({
        path: '/tools/positional'
    }),
    useLocation: () => ({
        pathname: '/tools/positional',
        search: '?h=base-conversion'
    })
}));


describe('DocPage', () => {
    const fetchMock = jest.fn();
    window.fetch = fetchMock;

    const docText = '## Base Conversion' +
        '![alt text][logo]';
    const docResponse = {
        text: () => Promise.resolve(docText),
        status: 200
    } as Response;

    fetchMock.mockReturnValue(Promise.resolve(docResponse));

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        const div = document.createElement('div');
        div.setAttribute('id', 'container');
        document.body.appendChild(div);
    });

    afterAll(() => {
        const div = document.getElementById('container');
        if (div) document.body.removeChild(div);
    });

    it('should render', () => {
        // when
        const container = mount(
            <DocPage path={'some/path'}/>
        );

        // then
        expect(container).toBeTruthy();
    });

    it('should scroll to given header if h parameters is specified in url query', async () => {
        // given
        window.scrollTo = jest.fn();

        // when
        const container = mount(
            <DocPage path={'some/path?h=123'}/>,
            { attachTo: document.getElementById('container') }
        );
        await waitForComponentToPaint(container);

        // then
        expect(window.scrollTo).toBeCalled();
    });
});
