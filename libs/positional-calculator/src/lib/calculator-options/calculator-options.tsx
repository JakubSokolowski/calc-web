import React, { FC, useEffect, useState } from 'react';
import { ExtendedSelect, FormErrors } from '@calc/common-ui';
import {
    BaseDigits,
    DIVISION_MAX_PRECISION,
    DIVISION_MIN_PRECISION,
    isValidPrecision,
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
import { toUrlSearchParams, useUrlCalculatorOptions } from './url-calculator-options';
import { useHistory } from 'react-router-dom';
import { representationValidator, validateOperand } from '../validators/validators';
import { allOperations } from './operations';
import { algorithmMap, multiplicationAlgorithms } from './algorithms';
import { OperationParams } from '../core/calculate';

interface FormValues {
    base: number;
    precision: number;
}

interface P {
    onSubmit: (base: number, representations: DndOperand[], operation: Operation, algorithm: OperationAlgorithm, precision?: number) => void;
    onOperationChange: (operation: OperationType) => void;
    defaultOperands?: DndOperand[];
    defaultBase?: number;
    defaultAlgorithm?: OperationAlgorithm;
    defaultOperation?: Operation;
}

const PREFIX = 'CalculatorOptions';

const classes = {
    base: `${PREFIX}-base`,
    precision: `${PREFIX}-precision`,
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
    [`& .${classes.precision}`]: {
        maxWidth: 150
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

    const initialValues: FormValues = { base: defaultBase || 10, precision: 5 };

    const validateBase = (base: number): string | undefined => {
        if (!BaseDigits.isValidBase(base)) {
            return t(
                'baseConverter.wrongBase',
                { minBase: BaseDigits.MIN_BASE, maxBase: BaseDigits.MAX_BASE }
            );
        }
    };

    const validatePrecision = (precision?: number): string | undefined => {
        if(!precision) return undefined;
        if (!isValidPrecision(precision)) {
            return t(
                'positionalCalculator.wrongPrecision',
                { minPrecision: DIVISION_MIN_PRECISION, maxPrecision: DIVISION_MAX_PRECISION }
            );
        }
    };

    const validate = (values: FormValues) => {
        const errors: FormErrors<FormValues> = {
            base: validateBase(values.base),
            precision: validatePrecision(values.precision)
        };

        return clean(errors);
    };

    const handleSubmit = (form: FormValues) => {
        onSubmit(form.base, operands, operation, algorithm, form.precision);

        const params: OperationParams<string> = {
            base: form.base,
            precision: form.precision,
            operands: operands.map(op => op.representation),
            operation: operation.type,
            algorithm: algorithm.type
        };

        history.replace({
            search: toUrlSearchParams(params)
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
        const base = form.isValid ? form.values.base : 10;
        const defaultStr = BaseDigits.getRepresentation(0, base);
        setOperands((prev) => [...prev, { representation: defaultStr, valid: true, dndKey: `${Date.now()}` }]);
    };

    useEffect(() => {
        let newMessage = '';

        const precisionValid = !form.errors.precision;
        if(!precisionValid) {
            newMessage = t(
                'positionalCalculator.wrongPrecision',
                { minPrecision: DIVISION_MIN_PRECISION, maxPrecision: DIVISION_MAX_PRECISION }
            );
        }

        const everyOperandValid = operands.every((op) => op.valid);
        if (!everyOperandValid) newMessage = t('positionalCalculator.operandsNotValid');

        const { minOperands, maxOperands } = operation;
        const allowedNumOfOperands = inRangeInclusive(operands.length, minOperands, maxOperands);
        if (!allowedNumOfOperands) newMessage = t('positionalCalculator.wrongOperandsNum', {
            minOperands,
            maxOperands
        });

        const baseValid = !form.errors.base;
        if(!baseValid) {
            newMessage = t(
                'baseConverter.wrongBase',
                { minBase: BaseDigits.MIN_BASE, maxBase: BaseDigits.MAX_BASE }
            );
        }

        const canCalculate = baseValid
            && everyOperandValid
            && allowedNumOfOperands
            && precisionValid;

        setErrorMessage(newMessage);
        setCanCalculate(canCalculate);
    }, [operands, operation, t, form.errors]);

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

    return (
        <Root>
            <div className={classes.optionsRow}>
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
                <div className={classes.spacer}/>
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
                {
                    operation.type === OperationType.Division && <TextField
                        data-testid={'precision'}
                        className={classes.precision}
                        variant={'outlined'}
                        type={'number'}
                        size={'small'}
                        name={'precision'}
                        id={'precision'}
                        label={t('positionalCalculator.precision')}
                        error={!!form.errors.precision}
                        helperText={form.errors.precision}
                        onChange={form.handleChange}
                        value={form.values.precision}
                    />
                }
                <div className={classes.growSpacer}/>
                <Tooltip title={errorMessage} placement={'top'}>
                    <span>
                         <Button
                             data-testid="submit"
                             data-test="calculate"
                             onClick={() => handleSubmit(form.values)}
                             color={'info'}
                             variant={'contained'}
                             className={classes.addOperand}
                             disabled={!canCalculate}
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
