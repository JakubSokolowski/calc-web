import React, { FC } from 'react';
import { SubtractionPositionResult } from '@calc/calc-arithmetic';
import { NumberSubscript } from '@calc/ui';

interface P {
    positionResult: SubtractionPositionResult;
}

export const SubtractAtPositionResult: FC<P> = ({positionResult}) => {
    console.log(positionResult);
    const operands = positionResult.operands.map((operand, index) => {
        const rep = operand.borrowChain
            ? operand.borrowChain[operand.borrowChain.length -1]
            : operand;

        return (
            <span key={index}>
                <NumberSubscript value={rep.representationInBase} subscript={''} noBraces={true}/>
                {index !== positionResult.operands.length -1 && '-'}
            </span>
        );
    });

    return (
        <div>
            {
                operands.length > 1 && <div>
                    <NumberSubscript
                        value={'D'}
                        subscript={positionResult.valueAtPosition.position}
                        noBraces={true}
                    />
                    =
                    {operands}
                </div>
            }
            <div>
                <NumberSubscript
                    value={'D'}
                    subscript={positionResult.valueAtPosition.position}
                    noBraces={true}
                />
                =
                <NumberSubscript
                    value={positionResult.valueAtPosition.representationInBase}
                    subscript={positionResult.valueAtPosition.base}
                />
            </div>
        </div>
    )
};
