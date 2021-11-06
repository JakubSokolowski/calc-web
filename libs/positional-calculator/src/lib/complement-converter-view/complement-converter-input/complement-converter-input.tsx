import React, { FC } from 'react';
import { BaseDigits, isValidComplementOrRepresentationStr } from '@calc/calc-arithmetic';
import { FormErrors } from '@calc/common-ui';
import { useTranslation } from 'react-i18next';
import { Button, styled, TextField } from '@mui/material';
import { clean } from '@calc/utils';
import { useFormik } from 'formik';

interface P {
    onConversionChange?: (representationStr: string, base: number) => void;
}

interface FormValues {
    inputStr: string;
    inputBase: number;
}

const PREFIX = 'ComplementConverterInput';

const classes = {
    root: `${PREFIX}-root`,
    input: `${PREFIX}-input`,
    row: `${PREFIX}-row`,
    inputBase: `${PREFIX}-inputBase`,
    convert: `${PREFIX}-convert`,
    horizontalSpacer: `${PREFIX}-horizontalSpacer`,
    growHorizontalSpacer: `${PREFIX}-growHorizontalSpacer`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        paddingTop: theme.spacing(2)
    },
    [`& .${classes.input}`]: {
        width: '60x%'
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
    [`& .${classes.inputBase}`]: {},
    [`& .${classes.convert}`]: {
        maxHeight: 40
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
}));


export const ComplementConverterInput: FC<P> = ({ onConversionChange }) => {
    const { t } = useTranslation();
    const initialValues: FormValues = {
        inputStr: '-123.45',
        inputBase: 10
    };

    const onSubmit = (values: FormValues) => {
        const { inputStr, inputBase } = values;
        if (onConversionChange) onConversionChange(inputStr, inputBase);
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
        if (!isValidComplementOrRepresentationStr(valueStr, inputBase)) {
            return t(
                'baseConverter.wrongRepresentationStr',
                { base: inputBase }
            );
        }
    };

    const validate = (values: FormValues) => {
        const errors: FormErrors<FormValues> = {
            inputBase: validateBase(values.inputBase),
            inputStr: validateValueStr(values.inputStr, values.inputBase)
        };

        return clean(errors);
    };

    const form = useFormik({ initialValues, onSubmit, validate });

    const handleInputStrChange = e => form.handleChange(e);

    return (
        <Root>
            <div className={classes.root}>
                <form onSubmit={form.handleSubmit}>
                    <div className={classes.row}>
                        <TextField
                            className={classes.inputBase}
                            variant={'outlined'}
                            size={'small'}
                            name={'inputBase'}
                            id={'inputBase'}
                            label={t('baseConverter.inputBase')}
                            error={!!form.errors.inputBase}
                            helperText={form.errors.inputBase}
                            onChange={form.handleChange}
                            value={form.values.inputBase}
                        />
                        <div className={classes.horizontalSpacer}/>
                        <TextField
                            className={classes.input}
                            name={'inputStr'}
                            id={'inputStr'}
                            variant={'outlined'}
                            size={'small'}
                            label={t('baseConverter.inputNumber')}
                            error={!!form.errors.inputStr}
                            helperText={form.errors.inputStr}
                            onChange={handleInputStrChange}
                            value={form.values.inputStr}
                        />
                        <div className={classes.growHorizontalSpacer}/>
                        <Button
                            disabled={!form.isValid}
                            className={classes.convert}
                            size={'small'}
                            color={'info'}
                            variant={'contained'}
                            type={'submit'}
                        >
                            {t('baseConverter.convert')}
                        </Button>
                    </div>
                </form>
            </div>
        </Root>
    );
};
