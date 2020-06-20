import React, { FC } from 'react';

interface P {
    value: string;
    subscript?: number | string;
    noBraces?: boolean;
}

export const NumberSubscript: FC<P> = ({ value, subscript, noBraces }) => {
    if(noBraces) {
       return (
           <span>
                {value}<sub>{subscript}</sub>
           </span>
       )
   }

    return (
        <span>
            {value}<sub>({subscript})</sub>
        </span>
    );
};
