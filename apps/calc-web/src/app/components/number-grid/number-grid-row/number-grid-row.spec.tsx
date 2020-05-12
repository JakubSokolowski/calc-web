import React from 'react';
import { shallow } from 'enzyme';
import { NumberGridRow } from './number-grid-row';
import { CellConfig } from '../../../core/operation-grid';
import { NumberGridCell } from '../number-grid-cell/number-grid-cell';


describe('NumberGridRow', () => {
    let container;

    beforeEach(() => {
        const values: CellConfig[] = [
            { value: '1' },
            { value: '2' },
            { value: '3' }
        ];
        container = shallow(
            <NumberGridRow
                rowIndex={1}
                values={values}
            />
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });

    it('should render cell for each of the values', () => {
        // given
        const expectedCount = 3;

        // when
        const cells = container.find(NumberGridCell);

        // then
        expect(cells).toHaveLength(expectedCount);
    });
});
