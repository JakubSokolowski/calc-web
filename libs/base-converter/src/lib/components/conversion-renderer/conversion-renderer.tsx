import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IntegralConversionDetails } from '../integral-conversion-details/integral-conversion-details';
import { AssociatedBaseConversion, convertUsingAssociatedBases, fromString } from '@calc/calc-arithmetic';
import { FloatingConversionDetails } from '../floating-conversion-details/floating-conversion-details';
import { AssociatedBaseConversionDetails } from '../associated-base-conversion-details/associated-base-conversion-details';

export enum ConversionAlgorithm {
    Default = 'Default',
    Associated = 'Associated'
}

export enum ConversionPart {
    Integral = 'Integral',
    Fractional = 'Fractional'
}

export interface ConversionTemplate {
    part?: ConversionPart;
    algorithm: ConversionAlgorithm;
    inputBase: number;
    outputBase: number;
    representation: string;
    precision?: number;
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        wrapper: {
            paddingBottom: theme.spacing(2),
        }
    });
});


export const IntegralConversionRenderer = (params: ConversionTemplate) => {
    const classes = useStyles();
    const {inputBase, outputBase, representation} = params;
    const conversion = fromString(representation, inputBase, outputBase);

    return (
        <div className={classes.wrapper}>
            <IntegralConversionDetails conversion={conversion} showDownload={false} widthInCells={19}/>
        </div>
    );
};

export const FractionalConversionRenderer = (params: ConversionTemplate) => {
    const classes = useStyles();
    const {inputBase, outputBase, representation, precision} = params;
    const conversion = fromString(representation, inputBase, outputBase, precision);

    return (
        <div className={classes.wrapper}>
            <FloatingConversionDetails showDownload={false} conversion={conversion} precision={precision} widthInCells={19}/>
        </div>
    );
};

export const AssociatedBaseConversionRenderer = (params: ConversionTemplate) => {
    const classes = useStyles();
    const {inputBase, outputBase, representation} = params;
    const conversion = convertUsingAssociatedBases(representation, inputBase, outputBase);

    return (
        <div className={classes.wrapper}>
            <AssociatedBaseConversionDetails conversion={conversion.stages[0] as AssociatedBaseConversion}/>
        </div>
    );
};

export const ConversionRenderer = (params: ConversionTemplate) => {
    if(params.algorithm === ConversionAlgorithm.Associated) {
        return <AssociatedBaseConversionRenderer {...params}/>
    }

    if(params.part === ConversionPart.Fractional) {
        return <FractionalConversionRenderer {...params}/>
    }

    if(params.part === ConversionPart.Integral) {
        return <IntegralConversionRenderer {...params}/>
    }

    return null;
};
