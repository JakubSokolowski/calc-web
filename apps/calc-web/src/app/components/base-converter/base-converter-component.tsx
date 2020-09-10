import React, { FC, useCallback, useState } from 'react';
import {
    BaseDigits,
    ComplementConverter,
    Conversion,
    fromString,
    isValidString
} from '@calc/calc-arithmetic';
import './base-converter-component.scss';
import { SwapOutlined } from '@ant-design/icons/lib';
import { InputWithCopy } from '@calc/ui';
import { useSelector } from 'react-redux';
import { selectShowComplement, selectShowDecimalValue } from '../../store/selectors/options.selectors';
import { ConversionOptions } from '../conversion-options/conversion-options';
import { useTranslation } from 'react-i18next';
import { Button, Card, IconButton, TextField, Tooltip } from '@material-ui/core';
import { clean } from '@calc/utils';
import { useFormik } from 'formik';
import { FormErrors } from '../../core/models/form-errors';

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
    const showComplement = useSelector(selectShowComplement);
    const showDecimalValue = useSelector(selectShowDecimalValue);
    const { t } = useTranslation();

    const initialValues: FormValues = {
        inputStr: '123.45',
        inputBase: 10,
        outputBase: 2,
        precision: 10
    };

    const onSubmit = (values: FormValues) => {
        const { inputStr, inputBase, outputBase, precision } = values;
        const conversion = fromString(inputStr, inputBase, outputBase);
        onConversionChange(conversion, precision);
    };

    const validateBase = (base: number): string | undefined => {
        if (!BaseDigits.isValidRadix(base)) {
            return t(
                'baseConverter.wrongBase',
                { minBase: BaseDigits.MIN_BASE, maxBase: BaseDigits.MAX_BASE }
            );
        }
    };

    const validateValueStr = (valueStr: string, inputBase: number): string | undefined => {
        if (!isValidString(valueStr, inputBase)) {
            return t(
                'baseConverter.wrongRepresentationStr',
                { base: inputBase }
            );
        }
    };

    const validate = (values: FormValues) => {
        const errors: FormErrors<FormValues> = {
            inputBase: validateBase(values.inputBase),
            outputBase: validateBase(values.outputBase),
            inputStr: validateValueStr(values.inputStr, values.inputBase)
        };

        return clean(errors);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });

    const [inputValue] = useState(initialValues.inputStr);
    const [inputBase] = useState(initialValues.inputBase);

    const swap = async () => {
        const { inputBase, outputBase } = formik.values;
        formik.setFieldValue('inputBase', outputBase);
        formik.setFieldValue('outputBase', inputBase);
        await formik.validateForm();
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
            <form onSubmit={formik.handleSubmit}>
                <InputWithCopy
                    style={{ 'paddingBottom': '20px' }}
                    name={'inputStr'}
                    id={'inputStr'}
                    label={t('baseConverter.inputNumber')}
                    error={!!formik.errors.inputStr}
                    helperText={formik.errors.inputStr}
                    onChange={formik.handleChange}
                    value={formik.values.inputStr}
                />

                {
                    showDecimalValue &&
                    <InputWithCopy
                        style={{ 'paddingBottom': '20px' }}
                        label={t('baseConverter.inputDecimalValue')}
                        readOnly
                        value={getDecimal()}
                    />
                }

                {
                    showComplement &&
                    <InputWithCopy
                        style={{ 'paddingBottom': '20px' }}
                        label={t('baseConverter.inputComplement')}
                        readOnly
                        value={getComplement()}
                    />
                }

                <div className="action-row">
                    <TextField
                        variant={'outlined'}
                        name={'inputBase'}
                        id={'inputBase'}
                        label={t('baseConverter.inputBase')}
                        error={!!formik.errors.inputBase}
                        helperText={formik.errors.inputBase}
                        onChange={formik.handleChange}
                        value={formik.values.inputBase}
                        style={{ width: '20%' }}
                    />
                    <Tooltip title={t('baseConverter.swapBases')}>
                        <IconButton
                            onClick={swap}
                            className="inline-form-button"
                        >
                            <SwapOutlined/>
                        </IconButton>
                    </Tooltip>
                    <TextField
                        variant={'outlined'}
                        name={'outputBase'}
                        id={'outputBase'}
                        label={t('baseConverter.outputBase')}
                        error={!!formik.errors.outputBase}
                        helperText={formik.errors.outputBase}
                        onChange={formik.handleChange}
                        value={formik.values.outputBase}
                        style={{ width: '20%' }}
                    />
                    <div style={{ 'width': '20px' }}/>
                    <TextField
                        variant={'outlined'}
                        name={'precision'}
                        id={'precision'}
                        label={t('baseConverter.precision')}
                        error={!!formik.errors.precision}
                        helperText={formik.errors.precision}
                        onChange={formik.handleChange}
                        value={formik.values.precision}
                        style={{ width: '10%' }}
                    />
                    <div style={{ 'width': '20px' }}/>
                    <Button color={'secondary'} variant={'contained'} type={'submit'}>
                        {t('baseConverter.convert')}
                    </Button>
                </div>
            </form>
        </Card>
    );
};
