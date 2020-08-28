import React, { FC, useCallback, useState } from 'react';
import { Form } from 'antd';
import { BaseDigits, ComplementConverter, Conversion, fromString, isValidString } from '@calc/calc-arithmetic';
import './base-converter-component.scss';
import { useForm } from 'antd/es/form/util';
import { SwapOutlined } from '@ant-design/icons/lib';
import { InputWithCopy } from '@calc/ui';
import { useSelector } from 'react-redux';
import { selectShowComplement, selectShowDecimalValue } from '../../store/selectors/options.selectors';
import { ConversionOptions } from '../conversion-options/conversion-options';
import { useTranslation } from 'react-i18next';
import { Button, Card, IconButton, Input, Tooltip } from '@material-ui/core';

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
    const { t } = useTranslation();


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
            return Promise.reject(
                t(
                    'baseConverter.wrongBase',
                    { minBase: BaseDigits.MIN_BASE, maxBase: BaseDigits.MAX_BASE }
                )
            );
        }
        return Promise.resolve();
    };

    const checkValueStr = (_, valueStr: string) => {
        const { inputBase } = form.getFieldsValue();
        if (!isValidString(valueStr, inputBase)) {
            return Promise.reject(
                t(
                    'baseConverter.wrongRepresentationStr',
                    { base: inputBase }
                )
            );
        }
        return Promise.resolve();
    };

    const swap = () => {
        const { inputBase, outputBase } = form.getFieldsValue() as FormValues;
        form.setFieldsValue({ inputBase: outputBase, outputBase: inputBase });
        form.validateFields();
    };

    const label = (
        <div style={{ display: 'flex', 'flexDirection': 'row' }}>
            <span>{t('baseConverter.inputNumber')}</span>
            <ConversionOptions style={{ marginLeft: '100px' }}/>
        </div>
    );

    const getDecimal = useCallback(() => {
        try {
            if (inputBase === 10) return inputValue;
            return fromString(
                inputValue,
                inputBase,
                10
            ).result.decimalValue.toString();
        } catch (e) {
            console.log(e);
            return '0.0';
        }
    }, [inputBase, inputValue]);

    const getComplement = useCallback(() => {
        try {
            return ComplementConverter.getComplement(
                inputValue,
                inputBase
            ).toString();
        } catch (e) {
            console.log(e);
            return '0.0';
        }
    }, [inputBase, inputValue]);


    return (
        <Card style={{padding: '10px'}}>
            <Form layout={'vertical'} form={form} onFinish={onFinish} initialValues={initialValues}>
                <Form.Item
                    name={'inputStr'}
                    label={label}
                    rules={[{ validator: checkValueStr }]}
                >
                    <InputWithCopy
                        onChange={(value) => {
                            setInputValue(value);
                            form.validateFields();
                        }}
                    />
                </Form.Item>
                {
                    showDecimalValue &&
                    <Form.Item
                        label={t('baseConverter.inputDecimalValue')}
                    >
                        <InputWithCopy readOnly value={getDecimal()}/>
                    </Form.Item>
                }

                {
                    showComplement &&
                    <Form.Item
                        label={t('baseConverter.inputComplement')}
                    >
                        <InputWithCopy readOnly value={getComplement()}/>
                    </Form.Item>
                }
                <div className="action-row">
                    <Form.Item
                        name={'inputBase'}
                        label={t('baseConverter.inputBase')}
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
                        <Tooltip title={t('baseConverter.swapBases')}>
                            <IconButton
                                onClick={swap}
                                className="inline-form-button"
                                >
                                <SwapOutlined/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Form.Item
                        name={'outputBase'}
                        label={t('baseConverter.outputBase')}
                        style={{ width: '25%' }}
                        rules={[{ validator: checkBase }]}
                    >
                        <Input type="number"/>
                    </Form.Item>
                    <div style={{ width: '20px' }}/>
                    <Form.Item
                        name={'precision'}
                        label={t('baseConverter.precision')}
                        style={{ width: '25%' }}
                    >
                        <Input type="number"/>
                    </Form.Item>
                    <div className="button-wrapper convert-button-wrapper">
                        <Button variant={'contained'} className="inline-form-button" color="primary"  type="submit">
                            {t('baseConverter.convert')}
                        </Button>
                    </div>
                </div>
            </Form>
        </Card>
    );
};
