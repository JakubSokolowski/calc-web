import React, { FC } from 'react';
import { FloatingPartConversionInfo } from '@calc/grid';

export const FractionalConversionRow: FC<FloatingPartConversionInfo> = ({ result, multiplier, base }) => {
    const [digit, rest] = result.split('.');
    return (
        <div>
            <div>
                {`${multiplier} * ${base} = `}
                <span style={{ fontWeight: 'bold' }}>
                    {digit}.
                </span>
                {rest}
            </div>
            <div>
                {`${result} % 1 = 0.${rest}`}
            </div>
        </div>
    );
};
