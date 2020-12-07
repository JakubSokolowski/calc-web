import React, { FC } from 'react';
import { AdditionPositionResult } from '@calc/calc-arithmetic';
import { NumberSubscript } from '@calc/common-ui';

interface P {
    positionResult: AdditionPositionResult;
}

export const AddAtPositionHoverContent: FC<P> = ({positionResult}) => {
    if(!positionResult || !positionResult.operands) return null;
    const nonZeroOperands = positionResult.operands.filter((op) => op.valueInDecimal !== 0);
    const operands = nonZeroOperands.map((operand, index) => {
        return (
            <span key={index} style={{fontWeight: operand.isCarry ? 'bold' : 'initial'}}>
                <NumberSubscript value={operand.representationInBase} subscript={''} noBraces={true}/>
                {index !== nonZeroOperands.length -1 && '+'}
            </span>
        );
    });

    const carries = positionResult.carry.map((carry, index) => {
        return (
            <span key={index}>
                <NumberSubscript value={carry.representationInBase} subscript={`C${carry.position}`}/>
                {index !== positionResult.carry.length -1 && '+'}
            </span>
        );
    });

    return (
       <div>
           {
               operands.length > 1 && <div>
                   <NumberSubscript
                       value={'S'}
                       subscript={positionResult.valueAtPosition.position}
                       noBraces={true}
                   />
                   =
                   {operands}
               </div>
           }
           <div>
               <NumberSubscript
                   value={'S'}
                   subscript={positionResult.valueAtPosition.position}
                   noBraces={true}
               />
               =
               <NumberSubscript
                   value={positionResult.valueAtPosition.representationInBase}
                   subscript={positionResult.valueAtPosition.base}
               />
               {carries.length > 0 && '+'}
               {carries.length > 0 && carries}
           </div>
       </div>
    )
};
