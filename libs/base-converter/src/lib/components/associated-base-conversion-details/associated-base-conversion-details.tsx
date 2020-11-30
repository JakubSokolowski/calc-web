import React, { FC } from 'react';
import { AssociatedBaseConversion } from '@calc/calc-arithmetic';
import { DigitMappingBox } from '../digit-mapping/digit-mapping-box';
import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        card: {
            padding: theme.spacing(3)
        },
        equation: {
            paddingBottom: theme.spacing(2)
        },
        mappings: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
    });
});

interface P {
    conversion: AssociatedBaseConversion;
}

export const AssociatedBaseConversionDetails: FC<P> = ({ conversion }) => {
    const classes = useStyles();

    const mappings = conversion.details.positionMappings.map((mapping, index) => {
        return (
            <DigitMappingBox key={index} mapping={mapping}/>
        );
    });

    return (
        <div className={classes.mappings}>
            {mappings}
        </div>
    );
};
