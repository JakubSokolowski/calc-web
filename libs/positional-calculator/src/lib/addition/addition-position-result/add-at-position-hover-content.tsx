import React, { FC } from 'react';
import { AdditionOperand, AdditionPositionResult, fromNumber } from '@calc/calc-arithmetic';
import { InlineMath } from 'react-katex';

interface P {
    positionResult: AdditionPositionResult;
}

function operandsToLatexStr(operands: AdditionOperand[]): string {
    return operands.reduce((joinedStr,operand, index) => {
        const isNotLastOperand = index !== operands.length - 1;

        const operandStr = operand.isCarry
            ? `${operand.representationInBase}_{C${operand.carrySourcePosition}}`
            : operand.representationInBase;

        const optionalPlus = `${isNotLastOperand ? '+' : ''}`;

        return joinedStr.concat(operandStr).concat(optionalPlus);
    }, '');
}

function carriesToLatexStr(carries: AdditionOperand[]): string {
    return  carries.reduce((joinedStr, carry, index) => {
        const isNotLastOperand = index !== carries.length - 1;
        const carryStr = `C_{${carry.position}}=${carry.representationInBase}${isNotLastOperand ? ',' : ''}`;
        return joinedStr.concat(carryStr);
    }, '');
}

export const AddAtPositionHoverContent: FC<P> = ({ positionResult }) => {
    if (!positionResult || !positionResult.operands) return null;

    const posSum = fromNumber(positionResult.decimalSum, positionResult.operands[0].base).result.toString();

    const nonZeroOperands = positionResult.operands.filter((op) => op.valueInDecimal !== 0);
    const operandsStr = operandsToLatexStr(nonZeroOperands);

    const carryStr = carriesToLatexStr(positionResult.carry);
    const posResultStr = `S_{${positionResult.valueAtPosition.position}}=`;

    const carryStrWithSign = positionResult.carry.length > 0 ? `${carryStr},\\;` : '';

    return (
        <div>
            {
                nonZeroOperands.length > 1 &&
                <div className="opSumRow">
                    <InlineMath math={posResultStr + operandsStr + `=${posSum}`}/>
                </div>
            }
            <div className="carryPosResultRow">
                <InlineMath math={carryStrWithSign + posResultStr + positionResult.valueAtPosition.representationInBase}/>
            </div>
        </div>
    );
};
