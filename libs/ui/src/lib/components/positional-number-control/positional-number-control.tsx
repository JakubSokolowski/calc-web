import React, { FC, useState } from 'react';
import { Form, Input } from 'antd';

interface PositionalNumberValue {
    valueStr?: string;
    base?: number;
}

interface P {
    value?: PositionalNumberValue;
    onChange?: (value: PositionalNumberValue) => void;
}

export const PositionalNumberControl: FC<P> = ({onChange, value = {}}) => {
    const [valueStr, setValueStr] = useState('');
    const [base, setBase] = useState(10);

    const triggerChange = (changedValue: Partial<PositionalNumberValue>) => {
        console.log(changedValue);
        if (onChange) {
            onChange({ valueStr, base, ...value, ...changedValue });
        }
    };

    const onValueStrChange = e => {
        const newValueStr = e.target.value;
        console.log('valueStr', value);
        if(!('valueStr' in value)) {
            setValueStr(newValueStr)
        }
        triggerChange({valueStr: newValueStr})
    };

    const onBaseChange = e => {
        const newBase = parseInt(e.target.value || 0, 10);
        if (Number.isNaN(newBase )) {
            return;
        }

        if (!('base' in value)) {
            setBase(newBase);
        }

        triggerChange({ base: newBase });
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{ width: '20%' }}>
                <span> Input Base</span>
                <Input
                    type="number"
                    value={value.base || base}
                    onChange={onBaseChange}
                />
            </div>
            <div style={{ width: '20px' }}/>
            <div style={{ width: '80%' }}>
                <span> Input number</span>
                <Input
                    type="text"
                    value={value.valueStr || valueStr}
                    onChange={onValueStrChange}
                />
            </div>
        </div>
    )
};
