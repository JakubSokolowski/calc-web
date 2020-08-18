import React, { FC, useRef } from 'react';
import { Button, Input, InputNumber, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons/lib';
import { useTranslation } from 'react-i18next';

export enum InputType {
    Text = 'text',
    Number = 'number'
}

interface P {
    value?: string | number;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    inputType?: InputType;
    size?: 'small' | 'middle' | 'large';
}

export const InputWithCopy: FC<P> = ({ onChange, value, size, inputType, readOnly }) => {
    const textAreaRef = useRef(null);
    const { t } = useTranslation();

    const copyToClipboard = () => {
        textAreaRef.current.select();
        document.execCommand('copy');
        message.success(t('common.copy'), 1.5);
    };

    const handleChange = (event) => {
        if (onChange) {
            const value = event.target.value;
            onChange(value);
        }
    };

    const handleNumberChange = (value) => {
        if (onChange) {
            onChange(value);
        }
    };

    const props = {
        style: {
            flexGrow: 1
        },
        ref: textAreaRef,
        value: value as any,
        readOnly: readOnly,
        onChange: inputType === InputType.Number ? handleNumberChange : handleChange
    };

    return (
        <span style={{ display: 'flex', 'flexDirection': 'row' }}>
            {
                inputType === InputType.Number
                    ? <InputNumber {...props}/>
                    : <Input {...props}/>
            }
            {
                document.queryCommandSupported('copy') &&
                <div style={{ paddingLeft: '5px' }}>
                    <Button size={size || 'middle'} onClick={copyToClipboard}>
                        <CopyOutlined/>
                    </Button>
                </div>
            }
        </span>
    );
};
