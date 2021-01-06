import React, { FC, useState } from 'react';
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
import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SaveAsImageButton, Section, ViewWrapper } from '@calc/common-ui';
import { DndOperand } from '../operand-list/operand-list';
import { CalculatorOptions } from '../calculator-options/calculator-options';
import { getGroupBuilder } from '../core/operation-group-builer';
import { OperationResultComponent } from '../operation-result/operation-result';
import { calculate, GridResult, OperationParams } from '../core/calculate';

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
        options: {},
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
    const [operation, setOperation] = useState<OperationType>(OperationType.Addition);
    const { t } = useTranslation();
    const [res, setRes] = useState<GridResult | undefined>();
    const [params, setParams] = useState<OperationParams<AlgorithmType>>();
    const gridId = 'calculator-grid';

    const onSubmit = function <T extends AlgorithmType>(
        base: number,
        representations: DndOperand[],
        operation: Operation,
        algorithm: OperationAlgorithm<T>
    ) {
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
                    <Section title={t('positionalCalculator.result')}>
                        <OperationResultComponent result={res.operationResult}/>
                    </Section>
                    <Section title={t('positionalCalculator.details')}>
                        <PaddedGrid
                            desiredWidth={24}
                            id={gridId}
                            {...res.grid}
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
        </ViewWrapper>
    );
};
