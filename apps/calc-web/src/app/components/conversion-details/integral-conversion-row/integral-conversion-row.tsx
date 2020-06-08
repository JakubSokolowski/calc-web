import React, { FC } from 'react';
import { RowConversionOperation } from '@calc/ui';

export const IntegralConversionRow: FC<RowConversionOperation> = ({result, base, dividend, remainder}) => {
    return (
      <div className="integral-conversion-popover-content">
          {`${dividend} / ${base} = ${result} r `}
          <span style={{fontWeight: 'bold'}}>
              {remainder}
          </span>
      </div>
    );
};
