import React, { FC, useCallback } from 'react';
import { BaseDigits, Conversion, fromString, getComplement, isValidRepresentationStr } from '@calc/calc-arithmetic';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { FormErrors, InputWithCopy } from '@calc/common-ui';
import { useSelector } from 'react-redux';
import { ConversionOptions } from '../conversion-options/conversion-options';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, styled, TextField, Tooltip } from '@mui/material';
import { clean, useMountEffect } from '@calc/utils';
import { useFormik } from 'formik';
import { selectShowComplement, selectShowDecimalValue } from '@calc/core';
import { BaseConverterParams } from './bconv-params';
import { toBconvUrlSearchParams, useUrlBaseConverterParams } from './bconv-url-params';
import { useHistory } from 'react-router-dom';

interface P {
    onConversionChange?: (conversion: Conversion, precision: number) => void;
}

const PREFIX = 'BaseConverter';

const classes = {
    row: `${PREFIX}-row`,
    inputBase: `${PREFIX}-inputBase`,
    swapButton: `${PREFIX}-swapButton`,
    outputBase: `${PREFIX}-outputBase`,
    horizontalSpacer: `${PREFIX}-horizontalSpacer`,
    precision: `${PREFIX}-precision`,
    growHorizontalSpacer: `${PREFIX}-growHorizontalSpacer`,
    convertButton: `${PREFIX}-convertButton`,
    verticalSpacer: `${PREFIX}-verticalSpacer`,
    input: `${PREFIX}-input`,
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
    [`& .${classes.precision}`]: {
        width: '22%'
    },
    [`& .${classes.swapButton}`]: {
        padding: theme.spacing(1),
        alignSelf: 'flex-start',
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1)
    },
    [`& .${classes.horizontalSpacer}`]: {
        [theme.breakpoints.down('lg')]: {
            width: theme.spacing(3)
        },
        [theme.breakpoints.up('lg')]: {
            width: theme.spacing(5)
        }
    },
    [`& .${classes.growHorizontalSpacer}`]: {
        flexGrow: 1
    },
    [`& .${classes.verticalSpacer}`]: {
        [theme.breakpoints.down('lg')]: {
            height: theme.spacing(2)
        },
        [theme.breakpoints.up('lg')]: {
            height: theme.spacing(2)
        }
    },
    [`& .${classes.convertButton}`]: {
        maxHeight: '40px',
    },
}));


export const BaseConverterComponent: FC<P> = ({ onConversionChange }) => {
    const showComplement = useSelector(selectShowComplement);
    const showDecimalValue = useSelector(selectShowDecimalValue);
    const bconvUrlParams = useUrlBaseConverterParams();
    const history = useHistory();
    const { t } = useTranslation();

    const initialValues: BaseConverterParams = {
        inputStr: '',
        inputBase: 10,
        outputBase: 2,
        precision: 10
    };

    const onSubmit = (values: BaseConverterParams) => {
        const { inputStr, inputBase, outputBase, precision } = values;
        const conversion = fromString(inputStr, inputBase, outputBase, precision);
        onConversionChange(conversion, precision);

        history.replace({
            search: toBconvUrlSearchParams(values)
        });
    };

    const validateBase = (base: number): string | undefined => {
        if (!BaseDigits.isValidBase(base)) {
            return t(
                'baseConverter.wrongBase',
                { minBase: BaseDigits.MIN_BASE, maxBase: BaseDigits.MAX_BASE }
            );
        }
    };

    const validateValueStr = (valueStr: string, inputBase: number): string | undefined => {
        if (!isValidRepresentationStr(valueStr, inputBase)) {
            return t(
                'baseConverter.wrongRepresentationStr',
                { base: inputBase }
            );
        }
    };

    const validate = (values: BaseConverterParams) => {
        const inputBase = validateBase(values.inputBase);
        const outputBase = validateBase(values.outputBase);

        const inputStr = (inputBase || outputBase)
            ? undefined
            : validateValueStr(values.inputStr, values.inputBase);

        const errors: FormErrors<BaseConverterParams> = {
            inputBase,
            outputBase,
            inputStr
        };

        return clean(errors);
    };

    const form = useFormik({
        initialValues,
        onSubmit,
        validate
    });


    const swap = async () => {
        const { inputBase, outputBase, ...rest } = form.values;
        const swappedValues = {inputBase: outputBase, outputBase: inputBase, ...rest};
        await form.setValues(swappedValues);
        await form.validateForm();
    };

    const loadOptionsFromUrl = () => {
        if(bconvUrlParams) {
            onSubmit(bconvUrlParams);
            setTimeout(async () => {
                await form.setValues(bconvUrlParams);
            });
        }
    };

    useMountEffect(loadOptionsFromUrl);

    const getDecimal = useCallback(() => {
        const {inputStr, inputBase} = form.values;
        if(!inputStr) return '0.0';
        if(!BaseDigits.isValidBase(inputBase)) return '0.0';

        if(isValidRepresentationStr(inputStr, inputBase)) {
            if (inputBase === 10) return inputStr;
            return fromString(
                inputStr,
                inputBase,
                10
            ).result.decimalValue.toString();
        } else {
            return '0.0';
        }
    }, [form.values]);

    const complement = useCallback(() => {
        const {inputStr, inputBase} = form.values;
        if(!inputStr) return '0.0';
        if(!BaseDigits.isValidBase(inputBase)) return '0.0';

        if(isValidRepresentationStr(inputStr, inputBase)) {
            return getComplement(inputStr, inputBase).toString();
        } else {
            return '0.0';
        }
    }, [form.values]);

    const handleInputStrChange = e => {
        form.handleChange(e);
    };

    const handleInputBaseChange = e => {
        form.handleChange(e)
    };


    return (
        <Root>
            <ConversionOptions/>
            <form onSubmit={form.handleSubmit}>
                <div className={classes.row}>
                    <TextField
                        data-test="bconv-input-base"
                        className={classes.inputBase}
                        type={'number'}
                        variant={'outlined'}
                        size={'small'}
                        InputProps={{
                            inputProps: {
                                min: BaseDigits.MIN_BASE,
                                max: BaseDigits.MAX_BASE
                            }
                        }}
                        name={'inputBase'}
                        id={'inputBase'}
                        label={t('baseConverter.inputBase')}
                        error={!!form.errors.inputBase}
                        helperText={form.errors.inputBase}
                        onChange={handleInputBaseChange}
                        value={form.values.inputBase}
                    />
                    <Tooltip title={t('baseConverter.swapBases')}>
                        <IconButton
                            data-test="bconv-swap-bases"
                            className={classes.swapButton}
                            size={'small'}
                            onClick={swap}
                        >
                            <SwapHorizIcon/>
                        </IconButton>
                    </Tooltip>
                    <TextField
                        data-test="bconv-output-base"
                        className={classes.outputBase}
                        size={'small'}
                        variant={'outlined'}
                        type={'number'}
                        name={'outputBase'}
                        id={'outputBase'}
                        InputProps={{
                            inputProps: {
                                min: BaseDigits.MIN_BASE,
                                max: BaseDigits.MAX_BASE
                            }
                        }}
                        label={t('baseConverter.outputBase')}
                        error={!!form.errors.outputBase}
                        helperText={form.errors.outputBase}
                        onChange={form.handleChange}
                        value={form.values.outputBase}
                    />
                    <div className={classes.horizontalSpacer}/>
                    <TextField
                        data-test="bconv-precision"
                        className={classes.precision}
                        size={'small'}
                        variant={'outlined'}
                        name={'precision'}
                        id={'precision'}
                        label={t('baseConverter.precision')}
                        error={!!form.errors.precision}
                        helperText={form.errors.precision}
                        onChange={form.handleChange}
                        value={form.values.precision}
                    />
                    <div className={classes.growHorizontalSpacer}/>
                    <Button
                        data-test="bconv-convert"
                        size={'small'}
                        color={'info'}
                        variant={'contained'}
                        type={'submit'}
                        className={classes.convertButton}
                        disabled={!form.isValid}
                    >
                        {t('baseConverter.convert')}
                    </Button>
                </div>
                <div className={classes.verticalSpacer}/>
                <InputWithCopy
                    data-test="bconv-input-str"
                    className={classes.input}
                    name={'inputStr'}
                    id={'inputStr'}
                    size={'small'}
                    label={t('baseConverter.inputNumber')}
                    error={!!form.errors.inputStr}
                    helperText={form.errors.inputStr}
                    onChange={handleInputStrChange}
                    value={form.values.inputStr}
                />
                {
                    showDecimalValue &&
                    <InputWithCopy
                        dataTest="bconv-decimal-value"
                        className={classes.input}
                        label={t('baseConverter.inputDecimalValue')}
                        size={'small'}
                        readOnly
                        value={getDecimal()}
                    />
                }

                {
                    showComplement &&
                    <InputWithCopy
                        dataTest="bconv-complement"
                        className={classes.input}
                        label={t('baseConverter.inputComplement')}
                        size={'small'}
                        readOnly
                        value={complement()}
                    />
                }
            </form>
        </Root>
    );
};
