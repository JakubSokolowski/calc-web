import React, { FC } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { buildFractionalConversionGrid, PaddedGrid } from '@calc/grid';
import { FractionalConversionRow } from '../conversion-details/fractional-conversion-row/fractional-conversion-row';
import { useTranslation } from 'react-i18next';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import { SaveAsImageButton } from '@calc/common-ui';

interface P {
    conversion: Conversion;
    precision: number;
    showDownload?: boolean;
    widthInCells?: number;
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

export const FloatingConversionDetails: FC<P> = ({ conversion, precision, showDownload = true, widthInCells = 24 }) => {
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
        </div>
    );
};
