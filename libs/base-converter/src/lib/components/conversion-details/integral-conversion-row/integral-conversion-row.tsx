import React, { FC } from 'react';
import { RowConversionOperation } from '@calc/grid';

export const IntegralConversionRow: FC<RowConversionOperation> = ({result, base, dividend, remainder}) => {
    return (
      <div>
          {`${dividend} / ${base} = ${result} r `}
          <span style={{fontWeight: 'bold'}}>
              {remainder}
          </span>
      </div>
    );
};
