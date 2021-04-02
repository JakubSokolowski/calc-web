import React, { FC, useState, SyntheticEvent } from 'react';
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
import { createStyles, Theme, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up('lg')]: {
                maxWidth: 900
            },
            margin: 'auto'
        },
        docs: {
            maxWidth: 700,
            margin: 'auto'
        },
        options: {
            paddingTop: theme.spacing(2),
        },
        actionRow: {
            paddingTop: theme.spacing(1),
            display: 'flex',
            flexDirection: 'row-reverse'
        },
        panel: {
            paddingTop: theme.spacing(2)
        }
    })
);


export const PositionalCalculatorView: FC = () => {
    const classes = useStyles();
    const [sanityCheckFailed, setSanityCheckFailed] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [expected, setExpected] = useState('');
    const [actual, setActual] = useState('');
    const [operation, setOperation] = useState<OperationType>(OperationType.Addition);
    const { t } = useTranslation();
    const [res, setRes] = useState<GridResult | undefined>();
    const [params, setParams] = useState<OperationParams<AlgorithmType>>();
    const gridId = 'operation-grid';

    const onSubmit = function <T extends AlgorithmType>(
        base: number,
        representations: DndOperand[],
        operation: Operation,
        algorithm: OperationAlgorithm<T>
    ) {
        setErrorOpen(false);
        const operands: PositionalNumber[] = representations.map((num) => {
            return fromStringDirect(num.representation, base).result;
        });

        const params: OperationParams<T> = {
            algorithm,
            operation,
            base,
            operands
        };

        setParams(params);
        const res = calculate(params);
        const check = sanityCheck(params, res.result);

        if(check.failed) {
            const msg = `Sanity check failed, expected ${check.expectedDecimal.toString()} got ${check.actual.decimalValue.toString()}`;
            const extra = serializeForSentry(check);
            Sentry.captureException(new Error(msg), {extra});
            setSanityCheckFailed(true);
            setErrorOpen(true);
            setExpected(check.expectedInBase);
            setActual(check.actual.toString());
        } else {
            setSuccessOpen(true);
        }
        setRes(res);
    };

    const getTitle = () => {
        return {
            [OperationType.Addition]: 'positionalCalculator.additionDetails',
            [OperationType.Subtraction]: 'positionalCalculator.subtractionDetails',
            [OperationType.Multiplication]: 'positionalCalculator.multiplicationDetails'
        }[params.operation.type] || '';
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
               <SanityCheckFailed onClose={handleErrorClose} expected={expected} actual={actual}/>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={2000}
                open={successOpen}
                onClose={handleSuccessClose}
            >
                <OperationSuccess params={params} onClose={handleSuccessClose}/>
            </Snackbar>
        </ViewWrapper>
    );
};
