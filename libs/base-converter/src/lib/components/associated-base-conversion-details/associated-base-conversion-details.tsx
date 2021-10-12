import React, { FC } from 'react';
import { AssociatedBaseConversion } from '@calc/calc-arithmetic';
import { MergeMapping } from '../digit-mapping/merge-mapping/merge-mapping';
import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { SplitMapping } from '../digit-mapping/split-mapping/split-mapping';

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

    const isSplitMapping = conversion.details.positionMappings.some((mapping) => {
        return mapping.input.length < mapping.output.length;
    });

    const mappings = conversion.details.positionMappings.map((mapping, index) => {
        return (
            isSplitMapping
                ?   <SplitMapping key={index} mapping={mapping}/>
                :   <MergeMapping key={index} mapping={mapping}/>
        );
    });

    return (
        <div className={classes.mappings}>
            {mappings}
        </div>
    );
};
