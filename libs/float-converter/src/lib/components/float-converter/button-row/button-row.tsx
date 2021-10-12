import React, { FC } from 'react';
import { BinaryButton } from '../binary-button/binary-button';

interface P {
    onChange?: (value: string[]) => void;
    values: string[];
}

export const ButtonRowComponent: FC<P> = ({ onChange, values }) => {
    const handleButtonChange = (value: string, index: number) => {
        const newValues = [...values];
        newValues[index] = value;
        if(onChange) onChange(newValues);
    };

    const buttons = values.map((value, index) => {
        return <BinaryButton index={index} key={index} value={value} onChange={handleButtonChange}/>;
    });


    const style = {
        display: 'flex' as const,
        flexDirection: 'row' as const
    };

    return (
        <div style={style}>
            {buttons}
        </div>
    );
};
