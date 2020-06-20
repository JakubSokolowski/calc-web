import React, { FC } from 'react';
import { NumberSubscript } from '../positional-number/number-subscript';
import { PositionResult } from '@calc/calc-arithmetic';

interface P {
    positionResult: PositionResult;
}
export const AddAtPositionHoverContent: FC<P> = ({positionResult}) => {

    const operands = positionResult.operands.map((operand, index) => {
        return (
            <span key={index}>
                <NumberSubscript value={operand.valueInBase} subscript={''} noBraces={true}/>
                {index !== positionResult.operands.length -1 && '+'}
            </span>
        );
    });

    const carries = positionResult.carry.map((carry, index) => {
        return (
            <span key={index}>
                <NumberSubscript value={carry.valueInBase} subscript={`C${carry.position}`}/>
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
                   value={positionResult.valueAtPosition.valueInBase}
                   subscript={positionResult.valueAtPosition.base}
               />
               {carries.length > 0 && '+'}
               {carries.length > 0 && carries}
           </div>
       </div>
    )
};
