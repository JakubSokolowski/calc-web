import React, { FC, useCallback, useState } from 'react';
import {
    BaseDigits,
    Conversion,
    convertUsingAssociatedBases, fromNumber,
    fromString,
    getComplement,
    isValidRepresentationStr
} from '@calc/calc-arithmetic';
import { FormErrors, InputWithCopy } from '@calc/common-ui';
import { useSelector } from 'react-redux';
import { ConversionOptions } from '../conversion-options/conversion-options';
import { useTranslation } from 'react-i18next';
import { Button, MenuItem, styled, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { clean, useMountEffect } from '@calc/utils';
import { selectShowComplement, selectShowDecimalValue } from '@calc/core';
import { AsocBaseConverterParams } from './asoc-bconv-params';
import { useStoredAbconvParams } from './abconv-storage';
import * as Sentry from '@sentry/react';

interface P {
    onConversionChange: (conversion: Conversion) => void;
}

const PREFIX = 'AssociatedBaseConverter';

const classes = {
    input: `${PREFIX}-input`,
    row: `${PREFIX}-row`,
    inputBase: `${PREFIX}-inputBase`,
    outputBase: `${PREFIX}-outputBase`,
    horizontalSpacer: `${PREFIX}-horizontalSpacer`
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.input}`]: {
        paddingBottom: theme.spacing(2)
    },
    [`& .${classes.row}`]: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: '100%'
        }
    },
    [`& .${classes.inputBase}`]: {
        width: '22%'
    },
    [`& .${classes.outputBase}`]: {
        width: '22%'
    },
    [`& .${classes.horizontalSpacer}`]: {
        [theme.breakpoints.down('lg')]: {
            width: theme.spacing(3)
        },
        [theme.breakpoints.up('lg')]: {
            width: theme.spacing(5)
        }
    }
}));

function getPlaceholder(base: number) {
    const decimalValue = -123;
    if(!BaseDigits.isValidBase(base)) return fromNumber(decimalValue, 10);
    return fromNumber(decimalValue, base)
}

export const AssociatedBaseConverter: FC<P> = ({ onConversionChange }) => {
    const { t } = useTranslation();
    const showComplement = useSelector(selectShowComplement);
    const showDecimalValue = useSelector(selectShowDecimalValue);
    const [storedParams, storeParams] = useStoredAbconvParams();

    const initialValues: AsocBaseConverterParams = {
        inputStr: '0',
        inputBase: 16,
        outputBase: 2
    };

    const onSubmit = (values: AsocBaseConverterParams) => {
        const transaction = Sentry.startTransaction({ name: "asoc-base-conversion" });
        const { inputStr, inputBase, outputBase } = values;
        const conversion = convertUsingAssociatedBases(inputStr, inputBase, outputBase);
        const span = transaction.startChild({
            data: { values, conversion },
            op: 'task',
            description: 'convert-base'
        });
        onConversionChange(conversion);
        storeParams(values);
        span.finish();
        transaction.finish();
    };

    const validateBase = (base: number): string | undefined => {
        if (!BaseDigits.isValidBase(base)) {
            return t(
                'baseConverter.wrongBase',
                { minBase: BaseDigits.MIN_BASE, maxBase: BaseDigits.MAX_BASE }
            );
        }
    };

    const validateOutputBase = (): string | undefined => {
        if (!possibleOutputBases) {
            return t('associatedBaseConverter.noOutputBase');
        }
    };

    const validateValueStr = (valueStr: string, inputBase: number): string | undefined => {
        if (!BaseDigits.isValidBase(inputBase)) return;
        if (!isValidRepresentationStr(valueStr, inputBase)) {
            return t(
                'baseConverter.wrongRepresentationStr',
                { base: inputBase }
            );
        }
    };

    const validate = (values: AsocBaseConverterParams) => {
        const errors: FormErrors<AsocBaseConverterParams> = {
            inputBase: validateBase(values.inputBase),
            outputBase: validateOutputBase(),
            inputStr: validateValueStr(values.inputStr, values.inputBase)
        };

        return clean(errors);
    };

    const form = useFormik(
        {
            initialValues,
            onSubmit,
            validate
        }
    );

    const [possibleOutputBases, setPossibleOutputBases] = useState<number[]>(() => {
        return BaseDigits.getAllPossibleBasesForAssociateConversion(initialValues.inputBase);
    });

    const getDecimal = useCallback(() => {
        try {
            const { inputStr, inputBase } = form.values;
            if (inputBase === 10) return inputStr;
            return fromString(
                inputStr,
                inputBase,
                10
            ).decimalValue.toString();
        } catch (e) {
            return '0.0';
        }
    }, [form.values]);

    const complement = useCallback(() => {
        try {
            const { inputStr, inputBase } = form.values;
            return getComplement(
                inputStr,
                inputBase
            ).toString();
        } catch (e) {
            return '0.0';
        }
    }, [form.values]);

    const options = possibleOutputBases.map((base) => {
        return (
            <MenuItem data-test={`output-base-${base}`} value={base} key={base}>{base}</MenuItem>
        );
    });

    const handleInputBaseChange = async e => {
        const inputBase = Number.parseInt(e.target.value);
        const { inputStr } = form.values;
        const newPossibleBases = BaseDigits.getAllPossibleBasesForAssociateConversion(inputBase);
        if (!newPossibleBases) return;
        setPossibleOutputBases(newPossibleBases);
        await form.setValues({ inputBase, outputBase: newPossibleBases[0], inputStr });
        await form.validateForm();
    };

    const handleInputStrChange = e => {
        form.handleChange(e);
    };

    const loadOptionsFromUrl = () => {
        if (storedParams) {
            onSubmit(storedParams);
            setTimeout(async () => {
                await form.setValues(storedParams);
            });
        }
    };

    useMountEffect(loadOptionsFromUrl);

    return (
        <Root>
            <ConversionOptions/>
            <form onSubmit={form.handleSubmit}>
                <InputWithCopy
                    placeholder={
                        t(
                            'common.inputPlaceholder',
                            {
                                'representation': getPlaceholder(form.values.inputBase).toString(),
                                'complement': getPlaceholder(form.values.inputBase).complement.toString()
                            }
                        )
                    }
                    dataTest="abconv-input-str"
                    className={classes.input}
                    name={'inputStr'}
                    size={'small'}
                    id={'inputStr'}
                    label={t('baseConverter.inputNumber')}
                    error={!!form.errors.inputStr}
                    helperText={form.errors.inputStr}
                    onChange={handleInputStrChange}
                    value={form.values.inputStr}
                />

                {
                    showDecimalValue &&
                    <InputWithCopy
                        className={classes.input}
                        label={t('baseConverter.inputDecimalValue')}
                        readOnly
                        size={'small'}
                        value={getDecimal()}
                    />
                }

                {
                    showComplement &&
                    <InputWithCopy
                        style={{ 'paddingBottom': '20px' }}
                        label={t('baseConverter.inputComplement')}
                        readOnly
                        size={'small'}
                        value={complement()}
                    />
                }

                <div className={classes.row}>
                    <TextField
                        data-test={'abconv-input-base'}
                        className={classes.inputBase}
                        variant={'outlined'}
                        type={'number'}
                        name={'inputBase'}
                        id={'inputBase'}
                        size={'small'}
                        label={t('baseConverter.inputBase')}
                        error={!!form.errors.inputBase}
                        helperText={form.errors.inputBase}
                        onChange={handleInputBaseChange}
                        value={form.values.inputBase}
                        InputProps={{
                            inputProps: {
                                min: BaseDigits.MIN_BASE,
                                max: BaseDigits.MAX_BASE
                            }
                        }}
                    />
                    <div className={classes.horizontalSpacer}/>
                    <TextField
                        select
                        data-test={'abconv-output-base'}
                        className={classes.outputBase}
                        name={'outputBase'}
                        id={'outputBase'}
                        size={'small'}
                        type={'number'}
                        label={t('baseConverter.outputBase')}
                        placeholder={t('associatedBaseConverter.noOutputBase')}
                        disabled={!options.length}
                        value={form.values.outputBase}
                        onChange={form.handleChange}
                        error={!!form.errors.outputBase}
                        helperText={form.errors.outputBase}
                        variant={'outlined'}
                    >
                        {options}
                    </TextField>
                    <div className={classes.horizontalSpacer}/>
                    <Button
                        data-test={'abconv-convert'}
                        color={'info'}
                        variant={'contained'}
                        type={'submit'}
                        size={'small'}
                        disabled={!form.isValid}
                    >
                        {t('baseConverter.convert')}
                    </Button>
                </div>
            </form>
        </Root>
    );
};
