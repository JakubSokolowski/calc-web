import { shallow } from 'enzyme';
import React from 'react';
import {
    addPositionalNumbers,
    fromNumber,
    multiplyPositionalNumbers,
    subtractPositionalNumbers
} from '@calc/calc-arithmetic';
import { ResultDetails } from './result-details';

describe('ResultDetails', () => {

    describe('when result has some negative operands', () => {
        it('should complement conversion row', () => {
            // given
            const a = fromNumber(41, 10).result;
            const b = fromNumber(-19, 10).result;
            const result = addPositionalNumbers([a, b]);

            // when
            const container = shallow(
                <ResultDetails result={result}/>
            );

            const complementRow = container.find('.complements-row');

            // then
            expect(complementRow.length).toEqual(1);
        })
    });

    describe('when result is addition', () => {
        it('should render', () => {
            // given
            const a = fromNumber(41, 10).result;
            const b = fromNumber(19, 10).result;
            const result = addPositionalNumbers([a, b]);

            // when
            const container = shallow(
                <ResultDetails result={result}/>
            );

            // then
            expect(container).toBeDefined();
        })
    });

    describe('when result is subtraction', () => {
        it('should render', () => {
            // given
            const a = fromNumber(41, 10).result;
            const b = fromNumber(19, 10).result;
            const result = subtractPositionalNumbers([a, b]);

            // when
            const container = shallow(
                <ResultDetails result={result}/>
            );

            // then
            expect(container).toBeDefined();
        })
    });

    describe('when result is not implemented operation', () => {
        it('should throw error', () => {
            // given
            const a = fromNumber(41, 10).result;
            const b = fromNumber(19, 10).result;
            const result = multiplyPositionalNumbers([a, b]);

           // then
            expect(() => {
                shallow(<ResultDetails result={result}/>);
            }).toThrow();
        })
    });
});
