import React, { FC } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { buildFractionalConversionGrid, buildIntegralConversionGrid, HoverGrid } from '@calc/grid';
import { IntegralConversionRow } from './integral-conversion-row/integral-conversion-row';
import { FractionalConversionRow } from './fractional-conversion-row/fractional-conversion-row';
import { useTranslation } from 'react-i18next';
import { useConverterStyles } from '../../core/styles/converter-styles';
import { Section } from '@calc/common-ui';

interface P {
    conversion: Conversion;
    precision: number;
}

export const ConversionDetails: FC<P> = ({ conversion, precision }) => {
    const { t } = useTranslation();
    const classes = useConverterStyles();

    const fractionalHoverGrid = conversion.result.fractionalPart.length > 0
        ? buildFractionalConversionGrid(conversion, precision)
        : undefined;


    const integralHoverGrid = buildIntegralConversionGrid(conversion);

    const floatingHoverPopover = (hoverProps) => {
        return <FractionalConversionRow {...hoverProps}/>;
    };

    const integralHoverPopover = (hoverProps) => {
        return <IntegralConversionRow {...hoverProps}/>;
    };

    return (
        <div id="integral-conversion-details">
            {
                integralHoverGrid &&
                <Section title={t('baseConverter.integralConversion')}>
                    <HoverGrid
                        {...integralHoverGrid}
                        title={t('baseConverter.integralConversion')}
                        groupBuilder={integralHoverPopover}
                    />
                </Section>
            }
            {
                fractionalHoverGrid &&
                <Section title={t('baseConverter.floatingConversion')}>
                    <HoverGrid
                        {...fractionalHoverGrid}
                        title={t('baseConverter.floatingConversion')}
                        groupBuilder={floatingHoverPopover}
                    />
                </Section>

            }
        </div>
    );
};
