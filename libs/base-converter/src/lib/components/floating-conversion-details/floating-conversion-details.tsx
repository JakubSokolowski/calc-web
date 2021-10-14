import React, { FC } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { buildFractionalConversionGrid, PaddedGrid } from '@calc/grid';
import { FractionalConversionRow } from '../conversion-details/fractional-conversion-row/fractional-conversion-row';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';
import { SaveAsImageButton } from '@calc/common-ui';

interface P {
    conversion: Conversion;
    precision: number;
    showDownload?: boolean;
    widthInCells?: number;
}

const PREFIX = "FloatingConversionDetails";


const classes = {
    actionRow: `${PREFIX}-actionRow`,
};


const Root = styled('div')(({ theme }) => ({
    [`& .${classes.actionRow}`]: {
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row-reverse'
    },
}));


export const FloatingConversionDetails: FC<P> = ({ conversion, precision, showDownload = true, widthInCells = 24 }) => {
    const { t } = useTranslation();
    const fractionalHoverGrid =buildFractionalConversionGrid(conversion, precision);

    const gridId = 'fractional-conversion-grid';

    const floatingHoverPopover = (hoverProps) => {
        return <FractionalConversionRow {...hoverProps}/>;
    };

    return (
        <Root>
            <PaddedGrid
                desiredWidth={widthInCells}
                groupBuilder={floatingHoverPopover}
                id={gridId}
                {...fractionalHoverGrid}

            />
            {
                showDownload &&
                <div className={classes.actionRow}>
                    <SaveAsImageButton
                        tooltipTitle={t('positionalCalculator.downloadDetails')}
                        elementId={gridId}
                    />
                </div>
            }
        </Root>
    );
};
