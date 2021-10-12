import React, { FC } from 'react';
import TeX from '@matejmazur/react-katex';

interface P {
    math: string;
}

export const InlineMath: FC<P> = ({math}) => {
    return (
      <TeX math={math || ' '}/>
    );
};
