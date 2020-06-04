import React, { FC } from 'react';
import { Button } from 'antd';

interface P {
    onChange?: (value: string, index: number) => void;
    value?: string;
    index?: number;
}

export const BinaryButton: FC<P> = ({ onChange, value, index }) => {
    const colorStyle = value === '0'
        ? { color: 'rgba(0, 0, 0, 0.65)', backgroundColor: '#fff' }
        : { color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.65)' };

    const style = {
        padding: '1px 6px',
        height: '20px',
        fontSize: '12px',
        ...colorStyle
    };

    const handleClick = () => {
        const newValue = value === '1' ? '0' : '1';
        if (onChange) onChange(newValue, index);
    };

    return (
        <div>
            <Button onClick={handleClick} style={style}>
                {value}
            </Button>
        </div>
    );
};
