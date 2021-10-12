import { mount, shallow } from 'enzyme';
import React from 'react';
import { HeadingRenderer } from './heading-renderer';
import { IconButton, Snackbar } from '@mui/material';
import { act } from 'react-dom/test-utils';


const history = {
    push: jest.fn()
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => history,
    useLocation: () => ({
        pathname: '/docs/somedoc'
    })
}));

describe('HeadingRenderer', () => {
    let container;

    beforeEach(() => {
        container = shallow(
            <HeadingRenderer level={1}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });

    it('should render heading with id equal to heading slug', () => {
        // given
        container = mount(
            <HeadingRenderer level={1}>
                {'Some important heading'}
            </HeadingRenderer>
        );

        const slug = 'some-important-heading';

        // when
        const heading = container.find('h4');

        // then
        expect(heading.length).toEqual(1);
        expect(heading.prop('id')).toEqual(slug);
    });

    describe('when heading copy button is clicked', () => {
        it('should push heading id as query param to history', () => {
            // given
            container = mount(
                <HeadingRenderer level={1}>
                    {'Some important heading'}
                </HeadingRenderer>
            );

            document.execCommand = jest.fn();

            // when
            container
                .find(IconButton)
                .simulate('click');

            // then
            const expectedQuery = {search: '?h=some-important-heading'};
            expect(history.push).toBeCalledWith(expectedQuery)
        });

        it('should show notification and auto-hide-it after some time', async () => {
            // given
            container = mount(
                <HeadingRenderer level={1}>
                    {'Some important heading'}
                </HeadingRenderer>
            );

            document.execCommand = jest.fn();

            // when
            await act(async () => {
                container
                    .find(IconButton)
                    .simulate('click');

                // then
                await new Promise((r) => setTimeout(r, 1500));
            });

            // then
            expect(container.find(Snackbar).prop('open')).toBeFalsy()
        })
    });
});
