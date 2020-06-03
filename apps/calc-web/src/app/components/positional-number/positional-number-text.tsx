import React, { FC } from 'react';

interface P {
    value: string,
    base: number
}

export const PositionalNumberText: FC<P> = ({ value, base }) => {
    return (
        <span>
            {value}<sub>({base})</sub>
        </span>
    );
};
