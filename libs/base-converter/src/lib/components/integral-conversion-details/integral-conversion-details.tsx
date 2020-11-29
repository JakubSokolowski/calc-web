import React, { FC } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { buildIntegralConversionGrid, PaddedGrid } from '@calc/grid';
import { IntegralConversionRow } from '../conversion-details/integral-conversion-row/integral-conversion-row';
import { SaveAsImageButton } from '@calc/ui';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface P {
    conversion: Conversion;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actionRow: {
            paddingTop: theme.spacing(1),
            display: 'flex',
            flexDirection: 'row-reverse'
        }

    })
);


export const IntegralConversionDetails: FC<P> = ({ conversion }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const integralHoverGrid = buildIntegralConversionGrid(conversion);
    const gridId = 'integral-conversion-grid';


    const integralHoverPopover = (hoverProps) => {
        return <IntegralConversionRow {...hoverProps}/>;
    };

    return (
        <div>
            <PaddedGrid
                desiredWidth={24}
                groupBuilder={integralHoverPopover}
                id={gridId}
                {...integralHoverGrid}
            />
            <div className={classes.actionRow}>
                <SaveAsImageButton
                    tooltipTitle={t('positionalCalculator.downloadDetails')}
                    elementId={gridId}
                />
            </div>
        </div>
    );
};
