import React from 'react';
import { ListEntry, NestedList } from '@calc/common-ui';
import { act } from 'react-dom/test-utils';
import { createMount } from '@material-ui/core/test-utils';
import {  ListItem } from '@material-ui/core';


const pushMock = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => {
        return {
            push: pushMock
        }
    }
}));


describe('NestedList', () => {
    let container;
    const mount = createMount();

    const items: ListEntry[] = [
        {
            text: 'first',
            key: 'first',
            link: 'first'
        },
        {
            text: 'second',
            key: 'second',
            link: 'second'
        }
    ];

    beforeEach(() => {
        container = mount(
            <NestedList header={'List'} items={items}/>
        );

        jest.clearAllMocks();
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });

    it('should expand nested items on click', () => {
        // when
        act(() => {
            container
                .findWhere(node => node.key() === 'expand-nested')
                .simulate('click')
        });

        const listItems = container.find(ListItem);
        expect(listItems.length).toEqual(3);
    });

    it('should change route on item click', () => {
        // when
        act(() => {
            container
                .findWhere(node => node.key() === 'expand-nested')
                .simulate('click');

            container.find(ListItem)
                .at(1)
                .simulate('click');
        });

        // then
        expect(pushMock).toBeCalledWith('first');
    });
});
