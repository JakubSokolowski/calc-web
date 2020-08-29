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
import { Button, Card, IconButton, TextField, Tooltip } from '@material-ui/core';

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
        <Card style={{padding: '20px'}}>
            <ConversionOptions style={{'paddingBottom': '20px'}}/>
            <Form layout={'vertical'} form={form} onFinish={onFinish} initialValues={initialValues}>
                <Form.Item
                    name={'inputStr'}
                    rules={[{ validator: checkValueStr }]}
                >
                    <InputWithCopy
                        label={t('baseConverter.inputNumber')}
                        onChange={(value) => {
                            setInputValue(value);
                            form.validateFields();
                        }}
                    />
                </Form.Item>
                {
                    showDecimalValue &&
                        <InputWithCopy
                            readOnly
                            label={t('baseConverter.inputDecimalValue')}
                            value={getDecimal()}
                        />
                }
                <div style={{ height: '20px' }}/>
                {
                    showComplement &&
                    <InputWithCopy label={t('baseConverter.inputComplement')} readOnly value={getComplement()}/>
                }
                <div className="action-row">
                    <Form.Item
                        name={'inputBase'}
                        style={{ width: '25%' }}
                        rules={[{ validator: checkBase }]}
                    >
                        <TextField
                            variant={'outlined'}
                            type="number"
                            label={t('baseConverter.inputBase')}
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
                        style={{ width: '25%' }}
                        rules={[{ validator: checkBase }]}
                    >
                        <TextField variant={'outlined'} label={t('baseConverter.outputBase')} type="number"/>
                    </Form.Item>
                    <div style={{ width: '20px' }}/>
                    <Form.Item
                        name={'precision'}
                        style={{ width: '25%' }}
                    >
                        <TextField variant={'outlined'} label={t('baseConverter.precision')} type="number"/>
                    </Form.Item>
                    <Form.Item>
                        <Button variant={'contained'} className="inline-form-button" color="primary"  type="submit">
                            {t('baseConverter.convert')}
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Card>
    );
};
