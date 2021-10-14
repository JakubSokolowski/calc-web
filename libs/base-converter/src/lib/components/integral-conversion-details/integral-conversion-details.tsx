import React, { FC } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { buildIntegralConversionGrid, PaddedGrid } from '@calc/grid';
import { IntegralConversionRow } from '../conversion-details/integral-conversion-row/integral-conversion-row';
import { SaveAsImageButton } from '@calc/common-ui';
import { styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface P {
    conversion: Conversion;
    showDownload?: boolean;
    widthInCells?: number;
}

const PREFIX = 'IntegralConversionDetails';

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


export const IntegralConversionDetails: FC<P> = ({ conversion, showDownload = true, widthInCells = 24 }) => {
    const { t } = useTranslation();
    const integralHoverGrid = buildIntegralConversionGrid(conversion);
    const gridId = 'integral-conversion-grid';


    const integralHoverPopover = (hoverProps) => {
        return <IntegralConversionRow {...hoverProps}/>;
    };

    return (
        <Root>
            <PaddedGrid
                desiredWidth={widthInCells}
                groupBuilder={integralHoverPopover}
                id={gridId}
                {...integralHoverGrid}
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
