import React, { FC, useCallback, useState } from 'react';
import {
    BaseDigits,
    ComplementConverter,
    Conversion,
    convertUsingAssociatedBases,
    fromString,
    isValidString
} from '@calc/calc-arithmetic';
import { InputWithCopy } from '@calc/ui';
import { useSelector } from 'react-redux';
import { ConversionOptions } from '../conversion-options/conversion-options';
import { useTranslation } from 'react-i18next';
import { Button, MenuItem, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { clean } from '@calc/utils';
import { FormErrors } from '@calc/ui';
import { selectShowComplement, selectShowDecimalValue } from '@calc/core';
import { useConverterStyles } from '../../core/styles/converter-styles';

interface P {
    onConversionChange?: (conversion: Conversion) => void;
}

interface FormValues {
    inputStr: string;
    inputBase: number;
    outputBase: number;
}

export const AssociatedBaseConverter: FC<P> = ({ onConversionChange }) => {
    const { t } = useTranslation();

    const showComplement = useSelector(selectShowComplement);
    const showDecimalValue = useSelector(selectShowDecimalValue);
    const classes = useConverterStyles();

    const initialValues: FormValues = {
        inputStr: 'FFAFAFFAF',
        inputBase: 16,
        outputBase: 2
    };

    const onSubmit = (values: FormValues) => {
        const { inputStr, inputBase, outputBase } = values;
        const conversion = convertUsingAssociatedBases(inputStr, inputBase, outputBase);
        onConversionChange(conversion);
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

    const form = useFormik(
        {
            initialValues,
            onSubmit,
            validate
        }
    );

    const [inputValue, setInputValue] = useState(initialValues.inputStr);
    const [inputBase, setInputBase] = useState(initialValues.inputBase);

    const [possibleOutputBases, setPossibleOutputBases] = useState<number[]>(() => {
        return BaseDigits.getAllPossibleBasesForAssociateConversion(initialValues.inputBase);
    });

    const getDecimal = useCallback(() => {
        try {
            if (inputBase === 10) return inputValue;
            return fromString(
                inputValue,
                inputBase,
                10
            ).result.decimalValue.toString();
        } catch (e) {
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
            return '0.0';
        }
    }, [inputBase, inputValue]);

    const options = possibleOutputBases.map((base, index) => {
        return (
            <MenuItem value={base} key={index}>{base}</MenuItem>
        );
    });

    const handleInputBaseChange = e => {
        const newInputBase = Number.parseInt(e.target.value);
        setInputBase(newInputBase);
        setPossibleOutputBases(BaseDigits.getAllPossibleBasesForAssociateConversion(newInputBase));
        form.handleChange(e);
    };

    const handleInputStrChange = e => {
        setInputValue(e.target.value);
        form.handleChange(e);
    };

    return (
        <div>
            <ConversionOptions/>
            <form onSubmit={form.handleSubmit}>
                <InputWithCopy
                    className={classes.input}
                    name={'inputStr'}
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

                <div className={classes.row}>
                    <TextField
                        className={classes.inputBase}
                        variant={'outlined'}
                        name={'inputBase'}
                        id={'inputBase'}
                        label={t('baseConverter.inputBase')}
                        error={!!form.errors.inputBase}
                        helperText={form.errors.inputBase}
                        onChange={handleInputBaseChange}
                        value={form.values.inputBase}
                    />
                    <div className={classes.horizontalSpacer}/>
                    <TextField
                        select
                        className={classes.outputBase}
                        name={'outputBase'}
                        id={'outputBase'}
                        label={t('baseConverter.outputBase')}
                        placeholder={t('associatedBaseConverter.noOutputBase')}
                        disabled={!options.length}
                        value={form.values.outputBase}
                        onChange={form.handleChange}
                        variant={'outlined'}
                    >
                        {options}
                    </TextField>
                    <div className={classes.horizontalSpacer}/>
                    <Button color={'secondary'} variant={'contained'} type={'submit'}>
                        {t('baseConverter.convert')}
                    </Button>
                </div>
            </form>
        </div>
    );
};
