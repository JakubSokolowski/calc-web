import React, { FC } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { buildFractionalConversionGrid, PaddedGrid } from '@calc/grid';
import { FractionalConversionRow } from '../conversion-details/fractional-conversion-row/fractional-conversion-row';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';
import { SaveAsImageButton } from '@calc/common-ui';

interface P {
    conversion: Conversion;
    precision: number;
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

export const FloatingConversionDetails: FC<P> = ({ conversion, precision }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const fractionalHoverGrid =buildFractionalConversionGrid(conversion, precision);

    const gridId = 'fractional-conversion-grid';

    const floatingHoverPopover = (hoverProps) => {
        return <FractionalConversionRow {...hoverProps}/>;
    };

    return (
        <div>
            <PaddedGrid
                desiredWidth={24}
                groupBuilder={floatingHoverPopover}
                id={gridId}
                {...fractionalHoverGrid}

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
