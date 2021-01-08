import React, { FC } from 'react';
import { SubtractionOperand, SubtractionPositionResult } from '@calc/calc-arithmetic';
import { InlineMath } from 'react-katex';

interface P {
    positionResult: SubtractionPositionResult;
}

function operandsToLatexStr(operands: SubtractionOperand[]): string {
    return operands.reduce((joinedStr,operand, index) => {
        const isNotLastOperand = index !== operands.length - 1;

        const usedOperand = operand.borrowChain
            ? operand.borrowChain[operand.borrowChain.length -1]
            : operand;

        const operandStr = `${usedOperand.representationInBase}`;

        const optionalMinus = `${isNotLastOperand ? '-' : ''}`;

        return joinedStr.concat(operandStr).concat(optionalMinus);
    }, '');
}


export const SubtractAtPositionResult: FC<P> = ({positionResult}) => {
    const operandStr = operandsToLatexStr(positionResult.operands);
    const positionDifferenceSymbol = `D_{${positionResult.valueAtPosition.position}}=`;
    const positionDifferenceResult = `${positionResult.valueAtPosition.representationInBase}`;

    return (
        <div>
            {
                positionResult.operands.length > 1 &&
                <div className="opDiffRow">
                    <InlineMath math={positionDifferenceSymbol + operandStr}/>
                </div>
            }
            <div className="posResultRow">
                <InlineMath math={positionDifferenceSymbol + positionDifferenceResult}/>
            </div>
        </div>
    )
};
