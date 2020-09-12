import React, { FC, useCallback, useState } from 'react';
import { BaseDigits, ComplementConverter, Conversion, fromString, isValidString } from '@calc/calc-arithmetic';
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
import { useConverterStyles } from '../../core/styles/converter-styles';

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
    const classes = useConverterStyles();

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

    const form = useFormik({
        initialValues,
        onSubmit,
        validate,
    });

    const [inputValue] = useState(initialValues.inputStr);
    const [inputBase] = useState(initialValues.inputBase);

    const swap = async () => {
        const { inputBase, outputBase } = form.values;
        form.setFieldValue('inputBase', outputBase);
        form.setFieldValue('outputBase', inputBase);
        await form.validateForm();
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
        <Card className={classes.card}>
            <ConversionOptions/>
            <form onSubmit={form.handleSubmit}>
                <InputWithCopy
                    className={classes.input}
                    name={'inputStr'}
                    id={'inputStr'}
                    label={t('baseConverter.inputNumber')}
                    error={!!form.errors.inputStr}
                    helperText={form.errors.inputStr}
                    onChange={form.handleChange}
                    value={form.values.inputStr}
                />

                {
                    showDecimalValue &&
                    <InputWithCopy
                        className={classes.input}
                        label={t('baseConverter.inputDecimalValue')}
                        readOnly
                        value={getDecimal()}
                    />
                }

                {
                    showComplement &&
                    <InputWithCopy
                        className={classes.input}
                        label={t('baseConverter.inputComplement')}
                        readOnly
                        value={getComplement()}
                    />
                }

                <div className={classes.row}>
                    <TextField
                        className={classes.inputBase}
                        variant={'outlined'}
                        name={'inputBase'}
                        id={'inputBase'}
                        label={t('baseConverter.inputBase')}
                        error={!!form.errors.inputBase}
                        helperText={form.errors.inputBase}
                        onChange={form.handleChange}
                        value={form.values.inputBase}
                    />
                    <Tooltip title={t('baseConverter.swapBases')}>
                        <IconButton  onClick={swap}>
                            <SwapOutlined/>
                        </IconButton>
                    </Tooltip>
                    <TextField
                        className={classes.outputBase}
                        variant={'outlined'}
                        name={'outputBase'}
                        id={'outputBase'}
                        label={t('baseConverter.outputBase')}
                        error={!!form.errors.outputBase}
                        helperText={form.errors.outputBase}
                        onChange={form.handleChange}
                        value={form.values.outputBase}
                    />
                    <div className={classes.horizontalSpacer}/>
                    <TextField
                        className={classes.precision}
                        variant={'outlined'}
                        name={'precision'}
                        id={'precision'}
                        label={t('baseConverter.precision')}
                        error={!!form.errors.precision}
                        helperText={form.errors.precision}
                        onChange={form.handleChange}
                        value={form.values.precision}
                    />
                    <div className={classes.horizontalSpacer}/>
                    <Button color={'secondary'} variant={'contained'} type={'submit'}>
                        {t('baseConverter.convert')}
                    </Button>
                </div>
            </form>
        </Card>
    );
};
