import React, { FC } from 'react';
import { Conversion, ConversionToDecimal, ConversionType } from '@calc/calc-arithmetic';
import { ResultEquation } from '../conversion-details/result-equation/result-equation';
import { ConversionToDecimalDetails } from '../conversion-to-decimal/conversion-to-decimal';
import { styled } from '@mui/material';

interface P {
    conversion: Conversion;
}

const PREFIX = "ConversionResult";

const classes = {
    equation: `${PREFIX}-equation`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.equation}`]: {
        paddingBottom: theme.spacing(2)
    },
}));

export const ConversionResult: FC<P> = ({conversion}) => {
    return (
        <Root>
            <div data-test="bconv-result">
                {
                    conversion.type === ConversionType.DIRECT ?
                        <div className={classes.equation}>
                            <ResultEquation conversion={conversion} firstStage={0} lastStage={0}/>
                        </div> :
                        <div>
                            <div className={classes.equation}>
                                <ConversionToDecimalDetails
                                    conversionStage={conversion.getFirstStage() as ConversionToDecimal}/>
                            </div>
                            <div>
                                <ResultEquation conversion={conversion} firstStage={1} lastStage={1}/>
                            </div>
                        </div>
                }
            </div>
        </Root>
    )
};
