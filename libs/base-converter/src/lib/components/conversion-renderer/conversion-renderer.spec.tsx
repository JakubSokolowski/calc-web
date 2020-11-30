import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import {
    AssociatedBaseConversionRenderer,
    ConversionAlgorithm,
    ConversionPart,
    ConversionRenderer,
    ConversionTemplate, FractionalConversionRenderer, IntegralConversionRenderer
} from './conversion-renderer';

describe('ConversionRenderer', () => {
    let container: ReactWrapper;

    const baseParams: ConversionTemplate = {
        part: ConversionPart.Integral,
        algorithm: ConversionAlgorithm.Default,
        inputBase: 8,
        outputBase: 2,
        representation: '1234'
    };

    beforeEach(() => {
        container = mount(
            <ConversionRenderer {...baseParams} />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });

    it('should render associated base renderer when algorithm is set to Associated', () => {
        // given
        const params: ConversionTemplate = {...baseParams, algorithm: ConversionAlgorithm.Associated};

        // when
        container = mount(
            <ConversionRenderer {...params} />
        );

        // then
        const renderer = container.find(AssociatedBaseConversionRenderer);
        expect(renderer.length).toEqual(1);
    });

    it('should render integral conversion renderer when algorithm is set to Default and part is set to Integral', () => {
        // given
        const params: ConversionTemplate = {...baseParams, algorithm: ConversionAlgorithm.Default, part: ConversionPart.Integral};

        // when
        container = mount(
            <ConversionRenderer {...params} />
        );

        // then
        const renderer = container.find(IntegralConversionRenderer);
        expect(renderer.length).toEqual(1);
    });

    it('should render fractional conversion renderer when algorithm is set to Default and part is set to Fractional', () => {
        // given
        const params: ConversionTemplate = {...baseParams, algorithm: ConversionAlgorithm.Default, part: ConversionPart.Fractional, precision: 5};

        // when
        container = mount(
            <ConversionRenderer {...params} />
        );

        // then
        const renderer = container.find(FractionalConversionRenderer);
        expect(renderer.length).toEqual(1);
    });

    it('should not render anything when params are not recognized', () => {
        const params = {} as ConversionTemplate;

        container = mount(
            <ConversionRenderer {...params} />
        );
    })
});
