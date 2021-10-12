import React, { FC } from 'react';
import { BaseDigits, isValidComplementOrRepresentationStr } from '@calc/calc-arithmetic';
import { FormErrors } from '@calc/common-ui';
import { useTranslation } from 'react-i18next';
import { Button, TextField, Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import { clean } from '@calc/utils';
import { useFormik } from 'formik';
import makeStyles from '@mui/styles/makeStyles';

interface P {
    onConversionChange?: (representationStr: string, base: number) => void;
}

interface FormValues {
    inputStr: string;
    inputBase: number;
}

export const useStyles = makeStyles((theme: Theme) => {
    return createStyles(
        {
            root: {
                paddingTop: theme.spacing(2)
            },
            input: {
                width: '60x%'
            },
            row: {
                display: 'flex',
                flexDirection: 'row',
                [theme.breakpoints.down('md')]: {
                    width: '100%'
                },
                [theme.breakpoints.up('md')]: {
                    width: '100%'
                }
            },
            inputBase: {},
            convert: {
                maxHeight: 40
            },
            horizontalSpacer: {
                [theme.breakpoints.down('lg')]: {
                    width: theme.spacing(3)
                },
                [theme.breakpoints.up('lg')]: {
                    width: theme.spacing(5)
                }
            },
            growHorizontalSpacer: {
                flexGrow: 1
            }
        }
    );
});

export const ComplementConverterInput: FC<P> = ({ onConversionChange }) => {
    const { t } = useTranslation();
    const classes = useStyles();

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
                        color={'secondary'}
                        variant={'contained'}
                        type={'submit'}
                    >
                        {t('baseConverter.convert')}
                    </Button>
                </div>
            </form>
        </div>
    );
};
