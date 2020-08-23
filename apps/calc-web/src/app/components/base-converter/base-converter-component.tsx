import React, { FC, useCallback, useState } from 'react';
import { Button, Form, Input, Tooltip } from 'antd';
import { BaseDigits, ComplementConverter, Conversion, fromString, isValidString } from '@calc/calc-arithmetic';
import './base-converter-component.scss';
import { useForm } from 'antd/es/form/util';
import { SwapOutlined } from '@ant-design/icons/lib';
import { InputWithCopy } from '@calc/ui';
import {  useSelector } from 'react-redux';
import { selectShowComplement, selectShowDecimalValue } from '../../store/selectors/options.selectors';
import { ConversionOptions } from '../conversion-options/conversion-options';

interface P {
    onConversionChange?: (conversion: Conversion, precision: number) => void;
}

interface FormValues {
    inputStr: string;
    inputBase: number;
    outputBase: number;
    precision: number;
}

export const BaseConverterComponent: FC<P> = ({ onConversionChange }) => {
    const [form] = useForm();
    const showComplement = useSelector(selectShowComplement);
    const showDecimalValue = useSelector(selectShowDecimalValue);

    const initialValues: FormValues = {
        inputStr: '123.45',
        inputBase: 10,
        outputBase: 2,
        precision: 10
    };

    const [inputValue, setInputValue] = useState(initialValues.inputStr);
    const [inputBase, setInputBase] = useState(initialValues.inputBase);

    const onFinish = (values: FormValues) => {
        const { inputStr, inputBase, outputBase, precision } = values;
        const conversion = fromString(inputStr, inputBase, outputBase);
        onConversionChange(conversion, precision);
    };

    const checkBase = (_, base: number) => {
        if (!BaseDigits.isValidRadix(base)) {
            return Promise.reject(`Base must be between ${BaseDigits.MIN_BASE} and ${BaseDigits.MAX_BASE}`);
        }
        return Promise.resolve();
    };

    const checkValueStr = (_, valueStr: string) => {
        const { inputBase } = form.getFieldsValue();
        if (!isValidString(valueStr, inputBase)) {
            return Promise.reject(`Representation strings contains invalid digits for base ${inputBase}`);
        }
        return Promise.resolve();
    };

    const swap = () => {
        const { inputBase, outputBase } = form.getFieldsValue() as FormValues;
        form.setFieldsValue({ inputBase: outputBase, outputBase: inputBase });
        form.validateFields();
    };

    const label = (
        <div style={{display: 'flex', 'flexDirection': 'row'}}>
            <span>{'Input number'}</span>
            <ConversionOptions style={{marginLeft: '100px'}}/>
        </div>
    );

    const getDecimal = useCallback(() => {
        try {
            if(inputBase === 10) return inputValue;
            return fromString(
                inputValue,
                inputBase,
                10
            ).result.decimalValue.toString()
        } catch(e) {
            console.log(e);
            return '0.0'
        }
    }, [inputBase, inputValue]);

    const getComplement = useCallback(() => {
        try {
            return ComplementConverter.getComplement(
                inputValue,
                inputBase,
            ).toString()
        } catch(e) {
            console.log(e);
            return '0.0'
        }
    }, [inputBase, inputValue]);


    return (
        <div>
            <Form layout={'vertical'} form={form} onFinish={onFinish} initialValues={initialValues}>
                <Form.Item
                    name={'inputStr'}
                    label={label}
                    rules={[{ validator: checkValueStr }]}
                >
                    <InputWithCopy
                        onChange={(value) => {
                            setInputValue(value);
                            form.validateFields()
                        }}
                    />
                </Form.Item>
                {
                    showDecimalValue &&
                    <Form.Item
                        label={'Input decimal value'}
                    >
                        <InputWithCopy readOnly value={getDecimal()}/>
                    </Form.Item>
                }

                {
                    showComplement &&
                    <Form.Item
                        label={'Input complement'}
                    >
                        <InputWithCopy readOnly value={getComplement()}/>
                    </Form.Item>
                }
                <Form.Item className="action-row">
                    <Input.Group style={{ display: 'flex', flexDirection: 'row' }}>
                        <Form.Item
                            name={'inputBase'}
                            label={'Input Base'}
                            style={{ width: '25%' }}
                            rules={[{ validator: checkBase }]}
                        >
                            <Input
                                type="number"
                                onChange={(e) => {
                                    form.validateFields();
                                    setInputBase(Number.parseInt(e.target.value));
                                }}
                            />
                        </Form.Item>
                        <div className="button-wrapper">
                            <Tooltip title="Swap bases">
                                <Button
                                    onClick={swap}
                                    className="inline-form-button"
                                    type="default"
                                    icon={<SwapOutlined/>}
                                />
                            </Tooltip>
                        </div>
                        <Form.Item
                            name={'outputBase'}
                            label={'Output Base'}
                            style={{ width: '25%' }}
                            rules={[{ validator: checkBase }]}
                        >
                            <Input type="number"/>
                        </Form.Item>
                        <div style={{ width: '20px' }}/>
                        <Form.Item
                            name={'precision'}
                            label={'Precision'}
                            style={{ width: '25%' }}
                        >
                            <Input type="number"/>
                        </Form.Item>
                        <div className="button-wrapper convert-button-wrapper">
                            <Button className="inline-form-button" type="primary" htmlType="submit"> Convert </Button>
                        </div>
                    </Input.Group>
                </Form.Item>
            </Form>
        </div>
    );
};
