import React, { FC } from 'react';
import { RowConversionOperation } from '../../../core/operation-grid';

export const RowHooverContent: FC<RowConversionOperation> = ({result, base, dividend, remainder}) => {
    return (
        <div>
            {`${dividend} / ${base} = ${result} r ${remainder}`}
        </div>
    );
};
