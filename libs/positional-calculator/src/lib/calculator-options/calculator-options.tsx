import React, { FC, useEffect, useState } from 'react';
import { ExtendedSelect, FormErrors } from '@calc/common-ui';
import {
    algorithmMap,
    allOperations,
    BaseDigits, multiplicationAlgorithms,
    Operation,
    OperationAlgorithm,
    OperationType
} from '@calc/calc-arithmetic';
import { useTranslation } from 'react-i18next';
import { clean, inRangeInclusive } from '@calc/utils';
import { useFormik } from 'formik';
import { Button, createStyles, TextField, Theme, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { OperandList, DndOperand } from '../operand-list/operand-list';

interface FormValues {
    base: number;
}

interface P {
    onSubmit: (base: number, representations: DndOperand[], operation: Operation, algorithm: OperationAlgorithm) => void;
    onOperationChange: (operation: OperationType) => void;
    defaultOperands?: DndOperand[];
    defaultBase?: number;
    defaultAlgorithm?: OperationAlgorithm;
    defaultOperation?: Operation;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

export const CalculatorOptions: FC<P> = ({ onSubmit, onOperationChange, defaultOperands, defaultBase, defaultAlgorithm, defaultOperation }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [operation, setOperation] = useState<Operation>(defaultOperation || allOperations[2]);
    const [algorithm, setAlgorithm] = useState<OperationAlgorithm>(defaultAlgorithm || multiplicationAlgorithms[1]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [operands, setOperands] = useState<DndOperand[]>(
        defaultOperands ||
        [{valid: true, representation: '(9)22', dndKey: '1'}, {valid: true, representation: '(9)12', dndKey: '2'}]
    );
    const [canAddOperand, setCanAddOperand] = useState(true);
    const [canCalculate, setCanCalculate] = useState(false);

    const initialValues: FormValues = { base: defaultBase || 10, };

    const validateBase = (base: number): string | undefined => {
        if (!BaseDigits.isValidBase(base)) {
            return t(
                'baseConverter.wrongBase',
                { minBase: BaseDigits.MIN_BASE, maxBase: BaseDigits.MAX_BASE }
            );
        }
    };

    const validate = (values: FormValues) => {
        const errors: FormErrors<FormValues> = {
            base: validateBase(values.base),
        };

        return clean(errors);
    };

    const handleSubmit = (form: FormValues) => {
        onSubmit(form.base, operands, operation, algorithm)
    };

    const form = useFormik({ initialValues, validate, onSubmit: handleSubmit});

    const getPossibleAlgorithms = (op: Operation) => {
        return algorithmMap[op.type] || [];
    };

    const handleOperandChange = (newOperands: DndOperand[]) => {
        setOperands(newOperands)
    };

    const handleAdd = () => {
        const defaultStr = BaseDigits.getRepresentation(0, form.values.base);
        setOperands((prev) => [...prev, {representation: defaultStr, valid: true, dndKey: `${Date.now()}`}]);
    };

    useEffect(() => {
        const everyOperandValid = operands.every((op) => op.valid);
        let newMessage = '';
        if(!everyOperandValid) newMessage = t('positionalCalculator.operandsNotValid');

        const {minOperands, maxOperands} = operation;

        const allowedNumOfOperands = inRangeInclusive(operands.length, minOperands, maxOperands);
        if(!allowedNumOfOperands) newMessage = t('positionalCalculator.wrongOperandsNum', {minOperands, maxOperands});

        const canCalculate = everyOperandValid && allowedNumOfOperands;
        setErrorMessage(newMessage);
        setCanCalculate(canCalculate);
    }, [operands, operation, t, form.values.base]);

    useEffect(() => {
        onOperationChange(operation.type);
    }, [operation]);

    useEffect(() => {
        const canAdd = operation.maxOperands > operands.length;
        setCanAddOperand(canAdd);
    }, [operands, operation]);

    useEffect(() => {
        const disabled = !form.isValid || operands.length < 1 || !canCalculate;
        setSubmitDisabled(disabled);
    }, [form.isValid, operands, canCalculate]);

    return (
        <div>
            <div className={classes.optionsRow}>
                <TextField
                    data-testid={'base'}
                    className={classes.base}
                    variant={'outlined'}
                    size={'small'}
                    name={'base'}
                    id={'base'}
                    label={t('baseConverter.base')}
                    error={!!form.errors.base}
                    helperText={form.errors.base}
                    onChange={form.handleChange}
                    value={form.values.base}
                />
                <div className={classes.spacer}/>
                <ExtendedSelect
                    value={operation}
                    label={t('positionalCalculator.operation')}
                    onChange={(value) => setOperation(value)}
                    options={allOperations}
                />
                <div className={classes.spacer}/>
                <ExtendedSelect
                    value={algorithm}
                    label={t('positionalCalculator.algorithm')}
                    onChange={(value) => setAlgorithm(value)}
                    options={getPossibleAlgorithms(operation)}
                />
                <div className={classes.growSpacer}/>
                <Tooltip title={errorMessage}>
                    <span>
                         <Button
                             data-testid="submit"
                             onClick={() => handleSubmit(form.values)}
                             color={'secondary'}
                             variant={'contained'}
                             className={classes.addOperand}
                             disabled={submitDisabled}
                         >
                            {t('positionalCalculator.calculate')}
                        </Button>
                    </span>
                </Tooltip>

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
