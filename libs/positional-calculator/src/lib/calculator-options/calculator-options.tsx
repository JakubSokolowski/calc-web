import React, { FC, useEffect, useState } from 'react';
import { ExtendedSelect, FormErrors } from '@calc/common-ui';
import {
    BaseDigits,
    OperandInputValue,
    Operation,
    OperationAlgorithm,
    OperationType
} from '@calc/calc-arithmetic';
import { useTranslation } from 'react-i18next';
import { clean, inRangeInclusive, useMountEffect } from '@calc/utils';
import { useFormik } from 'formik';
import { Button, styled, TextField, Tooltip } from '@mui/material';
import { DndOperand, OperandList } from '../operand-list/operand-list';
import { useUrlCalculatorOptions } from './url-calculator-options';
import { useHistory } from 'react-router-dom';
import { representationValidator, validateOperand } from '../validators/validators';
import { allOperations } from './operations';
import { algorithmMap, multiplicationAlgorithms } from './algorithms';

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

const PREFIX = 'CalculatorOptions';

const classes = {
    base: `${PREFIX}-base`,
    operand: `${PREFIX}-operand`,
    spacer: `${PREFIX}-spacer`,
    growSpacer: `${PREFIX}-growSpacer`,
    operandsBox: `${PREFIX}-operandsBox`,
    addOperand: `${PREFIX}-addOperand`,
    options: `${PREFIX}-options`,
    optionsRow: `${PREFIX}-optionsRow`,
};


const Root = styled('div')(({ theme }) => ({
    [`& .${classes.base}`]: {
        maxWidth: 100
    },
    [`& .${classes.operand}`]: {
        width: '100%'
    },
    [`& .${classes.spacer}`]: {
        width: theme.spacing(1),
    },
    [`& .${classes.growSpacer}`]: {
        flexGrow: 1
    },
    [`& .${classes.operandsBox}`]: {},
    [`& .${classes.addOperand}`]: {
        maxHeight: 40
    },
    [`& .${classes.options}`]: {
        padding: theme.spacing(2)
    },
    [`& .${classes.optionsRow}`]: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
}));



export const CalculatorOptions: FC<P> = ({ onSubmit, onOperationChange, defaultOperands, defaultBase, defaultAlgorithm, defaultOperation }) => {
    const { t } = useTranslation();
    const [operation, setOperation] = useState<Operation>(defaultOperation || allOperations[2]);
    const [algorithm, setAlgorithm] = useState<OperationAlgorithm>(defaultAlgorithm || multiplicationAlgorithms[1]);
    const [operationAlgorithms, setOperationAlgorithms] = useState<OperationAlgorithm[]>(multiplicationAlgorithms);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const optionsFromUrl = useUrlCalculatorOptions();
    const history = useHistory();

    const loadOptionsFromUrl = () => {
        if (optionsFromUrl) {
            const {
                algorithm: urlAlgorithm,
                operation: urlOperation,
                base: urlBase,
                operands: urlOperands
            } = optionsFromUrl;

            form.values.base = urlBase;
            setOperands(urlOperands);
            setTimeout(() => setAlgorithm(urlAlgorithm));
            setOperation(urlOperation);

            onSubmit(urlBase, urlOperands, urlOperation, urlAlgorithm);
        }
    };

    useMountEffect(loadOptionsFromUrl);


    const [operands, setOperands] = useState<DndOperand[]>(
        defaultOperands || []
    );
    const [canAddOperand, setCanAddOperand] = useState(true);
    const [canCalculate, setCanCalculate] = useState(false);

    const initialValues: FormValues = { base: defaultBase || 10 };

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
            base: validateBase(values.base)
        };

        return clean(errors);
    };

    const handleSubmit = (form: FormValues) => {
        onSubmit(form.base, operands, operation, algorithm);
        const operandsStr = operands.map(op => `op=${op.representation}`).join('&');
        history.replace({
            search: `?operation=${operation.type.toLowerCase()}`
                + `&algorithm=${algorithm.type.toLowerCase()}`
                + `&base=${form.base}`
                + `&${operandsStr}`
        });
    };

    const form = useFormik({ initialValues, validate, onSubmit: handleSubmit });

    const handleOperandChange = (newOperands: DndOperand[]) => {
        const ops: DndOperand[] = newOperands.map((op: DndOperand, index) => {
            const input: OperandInputValue = {
                base: form.values.base,
                representation: op.representation,
                index: index,
                totalNumOperands: newOperands.length
            };
            const validators = [representationValidator, ...(algorithm.operandValidators || [])];
            const err = validateOperand(validators, input);
            return {
                ...op,
                valid: !err
            };
        });
        setOperands(ops);
    };

    const handleAdd = () => {
        const defaultStr = BaseDigits.getRepresentation(0, form.values.base);
        setOperands((prev) => [...prev, { representation: defaultStr, valid: true, dndKey: `${Date.now()}` }]);
    };

    const computeCanCalculate = () => {
        const everyOperandValid = operands.every((op) => op.valid);
        const { minOperands, maxOperands } = operation;
        const allowedNumOfOperands = inRangeInclusive(operands.length, minOperands, maxOperands);
        return everyOperandValid && allowedNumOfOperands;
    };

    useEffect(() => {
        const everyOperandValid = operands.every((op) => op.valid);
        let newMessage = '';
        if (!everyOperandValid) newMessage = t('positionalCalculator.operandsNotValid');

        const { minOperands, maxOperands } = operation;

        const allowedNumOfOperands = inRangeInclusive(operands.length, minOperands, maxOperands);
        if (!allowedNumOfOperands) newMessage = t('positionalCalculator.wrongOperandsNum', {
            minOperands,
            maxOperands
        });

        const canCalculate = computeCanCalculate();
        setErrorMessage(newMessage);
        setCanCalculate(canCalculate);
    }, [operands, operation, t, form.values.base]);

    useEffect(() => {
        onOperationChange(operation.type);
    }, [operation]);

    useEffect(() => {
        const getPossibleAlgorithms = (op: Operation) => {
            return algorithmMap[op.type] || [];
        };
        const algorithms = getPossibleAlgorithms(operation).map((alg) => {
            if (alg.allowedBases) {
                const canUseAlg = alg.allowedBases.includes(form.values.base);
                return {
                    ...alg,
                    disallowedReason: t(
                        'positionalCalculator.algorithmAllowedForBases',
                        { base: alg.allowedBases[0] }
                    ),
                    disallowed: !canUseAlg
                };
            }
            return alg;
        });
        setOperationAlgorithms(algorithms);
        if (algorithms.length) setAlgorithm(algorithms[0]);
    }, [operation, form.values.base, t]);

    useEffect(() => {
        const canAdd = operation.maxOperands > operands.length;
        setCanAddOperand(canAdd);
    }, [operands, operation]);

    useEffect(() => {
        const disabled = operands.length < 1 || !canCalculate;
        setSubmitDisabled(disabled);
    }, [form.isValid, operands, canCalculate]);

    return (
        <Root>
            <div className={classes.optionsRow}>
                <TextField
                    data-testid={'base'}
                    className={classes.base}
                    variant={'outlined'}
                    type={'number'}
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
                    data-test='operation-select'
                    value={operation}
                    label={t('positionalCalculator.operation')}
                    onChange={(value) => setOperation(value)}
                    options={allOperations}
                />
                <div className={classes.spacer}/>
                <ExtendedSelect
                    value={algorithm}
                    data-test='algorithm-select'
                    label={t('positionalCalculator.algorithm')}
                    onChange={(value) => setAlgorithm(value)}
                    options={operationAlgorithms}
                />
                <div className={classes.growSpacer}/>
                <Tooltip title={errorMessage}>
                    <span>
                         <Button
                             data-testid="submit"
                             data-test="calculate"
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
                    validators={algorithm.operandValidators}
                    operands={operands}
                    onChange={handleOperandChange}
                    inputBase={form.values.base}
                    onAdd={handleAdd}
                    canAdd={canAddOperand}
                />
            </div>
        </Root>
    );
};
