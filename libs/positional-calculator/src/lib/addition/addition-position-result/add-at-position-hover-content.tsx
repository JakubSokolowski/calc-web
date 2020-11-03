import React, { FC } from 'react';
import { AdditionPositionResult } from '@calc/calc-arithmetic';
import { NumberSubscript } from '@calc/ui';

interface P {
    positionResult: AdditionPositionResult;
}

export const AddAtPositionHoverContent: FC<P> = ({positionResult}) => {

    const operands = positionResult.operands.map((operand, index) => {
        return (
            <span key={index} style={{fontWeight: operand.isCarry ? 'bold' : 'initial'}}>
                <NumberSubscript value={operand.representationInBase} subscript={''} noBraces={true}/>
                {index !== positionResult.operands.length -1 && '+'}
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
