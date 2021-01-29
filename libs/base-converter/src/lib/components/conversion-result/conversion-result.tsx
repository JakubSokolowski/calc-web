import React, { FC } from 'react';
import { Conversion, ConversionToDecimal, ConversionType } from '@calc/calc-arithmetic';
import { ResultEquation } from '../conversion-details/result-equation/result-equation';
import { ConversionToDecimalDetails } from '../conversion-to-decimal/conversion-to-decimal';
import { useConverterStyles } from '../../core/styles/converter-styles';

interface P {
    conversion: Conversion;
}

export const ConversionResult: FC<P> = ({conversion}) => {
    const classes = useConverterStyles();

    return (
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
    )
};
