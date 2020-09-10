import React, { FC, useCallback, useState } from 'react';
import {
    BaseDigits,
    ComplementConverter,
    Conversion,
    convertUsingAssociatedBases,
    fromString,
    isValidString
} from '@calc/calc-arithmetic';
import './associated-base-converter.scss';
import { InputWithCopy } from '@calc/ui';
import { useSelector } from 'react-redux';
import { selectShowComplement, selectShowDecimalValue } from '../../store/selectors/options.selectors';
import { ConversionOptions } from '../conversion-options/conversion-options';
import { useTranslation } from 'react-i18next';
import { Button, Card, MenuItem, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { clean } from '@calc/utils';
import { FormErrors } from '../../core/models/form-errors';

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

    const initialValues: FormValues = {
        inputStr: 'FFAFAFFAF',
        inputBase: 16,
        outputBase: 2
    };

    const onSubmit = (values: FormValues) => {
        console.log('OnSubmit', values);
        const { inputStr, inputBase, outputBase } = values;
        const conversion = convertUsingAssociatedBases(inputStr, inputBase, outputBase);
        onConversionChange(conversion);
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
        formik.handleChange(e);
    };

    const handleInputStrChange = e => {
        setInputValue(e.target.value);
        formik.handleChange(e);
    };

    return (
        <div>
            <Card style={{ 'padding': '20px' }}>
                <ConversionOptions style={{ paddingBottom: '20px' }}/>
                <form onSubmit={formik.handleSubmit}>
                    <InputWithCopy
                        style={{ 'paddingBottom': '20px' }}
                        name={'inputStr'}
                        id={'inputStr'}
                        label={t('baseConverter.inputNumber')}
                        error={!!formik.errors.inputStr}
                        helperText={formik.errors.inputStr}
                        onChange={handleInputStrChange}
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
                            onChange={handleInputBaseChange}
                            value={formik.values.inputBase}
                            style={{ width: '20%' }}
                        />
                        <div style={{ 'width': '20px' }}/>
                        <TextField
                            select
                            name={'outputBase'}
                            id={'outputBase'}
                            label={t('baseConverter.outputBase')}
                            placeholder={t('associatedBaseConverter.noOutputBase')}
                            disabled={!options.length}
                            value={formik.values.outputBase}
                            onChange={formik.handleChange}
                            variant={'outlined'}
                            style={{ width: '20%' }}
                        >
                            {options}
                        </TextField>
                        <div style={{ 'width': '20px' }}/>
                        <Button color={'secondary'} variant={'contained'} type={'submit'}>
                            {t('baseConverter.convert')}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
