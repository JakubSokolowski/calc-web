import React, { FC } from 'react';
import { RowConversionOperation } from '../../../core/operation-grid';

export const IntegralConversionRow: FC<RowConversionOperation> = ({result, base, dividend, remainder}) => {
    return (
      <div className="integral-conversion-popover-content">
          {`${dividend} / ${base} = ${result} r ${remainder}`}
      </div>
    );
};
