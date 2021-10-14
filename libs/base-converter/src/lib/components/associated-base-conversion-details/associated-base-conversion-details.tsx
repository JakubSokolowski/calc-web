import React, { FC } from 'react';
import { AssociatedBaseConversion } from '@calc/calc-arithmetic';
import { MergeMapping } from '../digit-mapping/merge-mapping/merge-mapping';
import { SplitMapping } from '../digit-mapping/split-mapping/split-mapping';
import { styled } from '@mui/material';

const PREFIX = 'AsocBconvDetails';

const classes = {
    card: `${PREFIX}-card`,
    equation: `${PREFIX}-equation`,
    mappings: `${PREFIX}-mappings`,
};


const Root = styled('div')(({ theme }) => ({
    [`& .${classes.card}`]: {
        padding: theme.spacing(3)
    },
    [`& .${classes.equation}`]: {
        paddingBottom: theme.spacing(2)
    },
    [`& .${classes.mappings}`]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
}));


interface P {
    conversion: AssociatedBaseConversion;
}

export const AssociatedBaseConversionDetails: FC<P> = ({ conversion }) => {
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
        <Root>
            <div className={classes.mappings}>
                {mappings}
            </div>
        </Root>
    );
};
