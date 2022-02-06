import React, { FC, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    AlgorithmType,
    fromStringDirect,
    Operation,
    OperationAlgorithm,
    OperationType,
    PositionalNumber
} from '@calc/calc-arithmetic';
import { PaddedGrid } from '@calc/grid';
import { Alert, Snackbar, styled } from '@mui/material';
import { SaveAsImageButton, Section, ViewWrapper } from '@calc/common-ui';
import { DndOperand } from '../operand-list/operand-list';
import { CalculatorOptions } from '../calculator-options/calculator-options';
import { getGroupBuilder } from '../core/operation-group-builer';
import { OperationResultComponent } from '../operation-result/operation-result';
import { calculate, GridResult, OperationParams } from '../core/calculate';
import { SanityCheckFailed } from '../sanity-check/sanity-check-failed';
import { sanityCheck, serializeForSentry } from '../core/sanity-check';
import * as Sentry from '@sentry/react';
import { OperationSuccess } from '../operation-success/operation-success';
import { SpanStatus } from '@sentry/tracing';


const PREFIX = 'PositionalCalculatorView';

const classes = {
    root: `${PREFIX}-root`,
    docs: `${PREFIX}-docs`,
    options: `${PREFIX}-options`,
    actionRow: `${PREFIX}-actionRow`,
    panel: `${PREFIX}-panel`
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        [theme.breakpoints.up('lg')]: {
            maxWidth: 900
        },
        margin: 'auto'
    },
    [`& .${classes.docs}`]: {
        maxWidth: 700,
        margin: 'auto'
    },
    [`& .${classes.options}`]: {
        paddingTop: theme.spacing(2)
    },
    [`& .${classes.actionRow}`]: {
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    [`& .${classes.panel}`]: {
        paddingTop: theme.spacing(2)
    }
}));

export const PositionalCalculatorView: FC = () => {
    const [sanityCheckFailed, setSanityCheckFailed] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [expected, setExpected] = useState('');
    const [actual, setActual] = useState('');
    const [operation, setOperation] = useState<OperationType>(OperationType.Addition);
    const { t } = useTranslation();
    const [res, setRes] = useState<GridResult | undefined>();
    const [params, setParams] = useState<OperationParams>();
    const gridId = 'operation-grid';

    const onSubmit = function <T extends AlgorithmType>(
        base: number,
        representations: DndOperand[],
        operation: Operation,
        algorithm: OperationAlgorithm<T>,
        precision?: number
    ) {
        const transaction = Sentry.startTransaction({ name: "calculate-positional" });
        setErrorOpen(false);
        const operands: PositionalNumber[] = representations.map((num) => {
            return fromStringDirect(num.representation, base);
        });

        const params: OperationParams = {
            algorithm: algorithm.type,
            operation: operation.type,
            base,
            operands,
            precision
        };

        const calculateSpan = transaction.startChild({
            data: { params },
            op: 'task',
            description: 'calculate-result'
        })

        setParams(params);
        const res = calculate(params);
        calculateSpan.finish();

        const check = sanityCheck(params, res.result);
        const sanitySpan = transaction.startChild({
            data: serializeForSentry(check),
            op: 'task',
            description: 'sanity-check'
        })

        if (check.failed) {
            const msg = `Sanity check failed, expected ${check.expectedDecimal.toString()} got ${check.actual.decimalValue.toString()}`;
            const extra = serializeForSentry(check);
            Sentry.captureException(new Error(msg), { extra });
            setSanityCheckFailed(true);
            setErrorOpen(true);
            setExpected(check.expectedInBase);
            setActual(check.actual.toString());
            sanitySpan.setStatus('sanity_check_failed');
        } else {
            calculateSpan.setStatus(SpanStatus.Ok);
            setSuccessOpen(true);
        }
        sanitySpan.finish();
        transaction.finish();
        setRes(res);
    };

    const getTitle = () => {
        return {
            [OperationType.Addition]: 'positionalCalculator.additionDetails',
            [OperationType.Subtraction]: 'positionalCalculator.subtractionDetails',
            [OperationType.Multiplication]: 'positionalCalculator.multiplicationDetails',
            [OperationType.Division]: 'positionalCalculator.divisionDetails'
        }[params.operation] || '';
    };

    const groupBuilder = (positionResult: any) => {
        return getGroupBuilder(res.operationResult)({ positionResult });
    };
    const theoryPath = operation ? `/theory/positional/operations/${operation.toLowerCase()}` : '/theory/positional/operations';

    const handleErrorClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') return;
        setErrorOpen(false);
    };

    const handleSuccessClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') return;
        setSuccessOpen(false);
    };

    return (
        <Root>
            <ViewWrapper path={'/tools/positional/positional-calculator'} theoryPath={theoryPath}>
                <Section title={t('positionalCalculator.parameters')}>
                    <div className={classes.options}>
                        <CalculatorOptions onSubmit={onSubmit} onOperationChange={setOperation}/>
                    </div>
                </Section>
                {
                    params && res &&
                    <>
                        <Section resultPossiblyWrong={sanityCheckFailed} title={t('positionalCalculator.result')}>
                            <OperationResultComponent result={res.operationResult}/>
                        </Section>
                        <Section resultPossiblyWrong={sanityCheckFailed} title={t('positionalCalculator.details')}>
                            <PaddedGrid
                                {...res.grid}
                                desiredWidth={24}
                                id={gridId}
                                groupBuilder={groupBuilder}
                                title={t(getTitle())}
                            />
                            <div className={classes.actionRow}>
                                <SaveAsImageButton
                                    tooltipTitle={t('positionalCalculator.downloadDetails')}
                                    elementId={gridId}
                                />
                            </div>
                        </Section>
                    </>
                }
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={errorOpen}
                >
                    <Alert severity="error" onClose={handleErrorClose}>
                        <SanityCheckFailed expected={expected} actual={actual}/>
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    autoHideDuration={2000}
                    open={successOpen}
                    onClose={handleSuccessClose}
                >
                    <Alert severity="success">
                        <OperationSuccess params={params}/>
                    </Alert>
                </Snackbar>
            </ViewWrapper>
        </Root>
    );
};
