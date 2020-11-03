import React, { FC, useEffect, useState } from 'react';
import { ExtendedSelect, FormErrors } from '@calc/ui';
import {
    algorithmMap,
    allOperations,
    BaseDigits,
    isValidString,
    Operation,
    OperationAlgorithm,
    OperationType, subtractionAlgorithms
} from '@calc/calc-arithmetic';
import { useTranslation } from 'react-i18next';
import { clean } from '@calc/utils';
import { useFormik } from 'formik';
import { Button, createStyles, TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { OperandList, ValidatedOperand } from '../operand-list/operand-list';

interface FormValues {
    base: number;
    representation: string;
    operands: string[];
}

interface P {
    onSubmit: (base: number, representations: ValidatedOperand[], operation: Operation, algorithm: OperationAlgorithm) => void;
    onOperationChange: (operation: OperationType) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
          maxWidth: 700
        },
        base: {
            maxWidth: 100
        },
        operand: {
          width: '100%'
        },
        spacer: {
            width: theme.spacing(1),
        },
        growSpacer: {
            flexGrow: 1
        },
        operandsBox: {
        },
        addOperand: {
            maxHeight: 40
        },
        options: {
            padding: theme.spacing(2)
        },
        optionsRow: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
        }
    })
);

export const CalculatorOptions: FC<P> = ({ onSubmit, onOperationChange }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [operation, setOperation] = useState<Operation>(allOperations[1]);
    const [algorithm, setAlgorithm] = useState<OperationAlgorithm>(subtractionAlgorithms[0]);
    const [operands, setOperands] = useState<ValidatedOperand[]>(
        [{valid: true, representation: '25 15'}, {valid: true, representation: '19'}]
    );
    const [canAddOperand] = useState(true);
    const [canCalculate, setCanCalculate] = useState(false);

    const initialValues: FormValues = {
        base: 64,
        representation: '0.0',
        operands: []
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

    const handleAdd = () => {
        const defaultStr = BaseDigits.getDigit(0, form.values.base);
        setOperands((prev) => [...prev, {representation: defaultStr, valid: true}]);
    };

    const handleSubmit = (values: FormValues) => {
        setOperands((prev) => [...prev, {representation: values.representation, valid: true}])
    };

    const validate = (values: FormValues) => {
        const errors: FormErrors<FormValues> = {
            base: validateBase(values.base),
            representation: validateValueStr(values.representation, values.base)
        };

        return clean(errors);
    };

    const form = useFormik({ initialValues, validate, onSubmit: handleSubmit });

    const getPossibleAlgorithms = (op: Operation) => {
        return algorithmMap[op.type] || [];
    };

    const handleOperandChange = (newOperands: ValidatedOperand[]) => {
        setOperands(newOperands)
    };

    const handleOperandSubmit = () => {
        onSubmit(form.values.base, operands, operation, algorithm)
    };

    useEffect(() => {
        const can = operands.every((op) => op.valid);
        setCanCalculate(can);
    }, [operands]);

    useEffect(() => {
        onOperationChange(operation.type);
    }, [operation]);

    return (
        <div className={classes.root}>
            <div className={classes.optionsRow}>
                <TextField
                    className={classes.base}
                    variant={'outlined'}
                    size={'small'}
                    name={'base'}
                    id={'base'}
                    label={t('baseConverter.inputBase')}
                    error={!!form.errors.base}
                    helperText={form.errors.base}
                    onChange={form.handleChange}
                    value={form.values.base}
                />
                <div className={classes.spacer}/>
                <ExtendedSelect
                    value={operation}
                    label={'Operation'}
                    onChange={(value) => setOperation(value)}
                    operations={allOperations}
                />
                <div className={classes.spacer}/>
                <ExtendedSelect
                    value={algorithm}
                    label={'Algorithm'}
                    onChange={(value) => setAlgorithm(value)}
                    operations={getPossibleAlgorithms(operation)}
                />
                <div className={classes.growSpacer}/>
                <Button
                    onClick={() => handleOperandSubmit()}
                    type={'submit'}
                    color={'secondary'}
                    variant={'contained'}
                    className={classes.addOperand}
                    disabled={!form.isValid || operands.length < 1 || !canCalculate}
                >
                    {t('positionalCalculator.calculate')}
                </Button>
            </div>
            <div className={classes.operandsBox}>
                <OperandList
                    operands={operands}
                    onChange={handleOperandChange}
                    inputBase={form.values.base}
                    onAdd={handleAdd}
                    canAdd={canAddOperand}
                />
            </div>
        </div>
    );
};
