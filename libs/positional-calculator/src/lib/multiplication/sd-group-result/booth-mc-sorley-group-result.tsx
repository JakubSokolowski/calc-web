import React, { FC } from 'react';
import { SDConversionGroupResult } from '@calc/calc-arithmetic';
import { InlineMath } from '@calc/common-ui';
import { SdAddRow } from './sd-add-row';

interface P {
    result: SDConversionGroupResult;
    outputIndex: number;
}

export const BoothMcSorleyGroupResult: FC<P> = ({ result, outputIndex }) => {
    const [x2, x1, x0] = result.input;
    const [curr, prev] = result.output;

    const positionEquation = `SD_{${x2.position},${x1.position}}
          = (-2 * x_{${x2.position}})
          + x_{${x1.position}}
          + x_{${x0.position}}`;

    const equationResult = `SD_{${x2.position},${x1.position}}
          = (-2 * ${x2.valueInDecimal})
          + ${x1.valueInDecimal}
          + ${x0.valueInDecimal}
          = ${result.value}`;


    const digitSplitResult = `${result.value} \\mapsto
      SD_${curr?.position} = ${curr?.valueInDecimal},
      SD_${prev?.position} = ${prev?.valueInDecimal}`;

    return (
        <div data-test="booth-mc-sorley-group">
            <div>
                <InlineMath math={positionEquation} />
            </div>
            <div>
                <InlineMath math={equationResult} />
            </div>
            <div>
                <InlineMath math={digitSplitResult} />
            </div>
            <div>
                <SdAddRow digitValue={result.output[outputIndex].valueInDecimal} />
            </div>
        </div>
    );
};
