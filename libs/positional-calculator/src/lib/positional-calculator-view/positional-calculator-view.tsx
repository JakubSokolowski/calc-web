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
import { Box, createStyles, Tab, Tabs, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { a11yProps, SaveAsImageButton, Section, TabPanel } from '@calc/common-ui';
import { DocPage, RendererMapping } from '@calc/docs';
import { ValidatedOperand } from '../operand-list/operand-list';
import { CalculatorOptions } from '../calculator-options/calculator-options';
import { getGroupBuilder } from '../core/operation-group-builer';
import { OperationResultComponent } from '../operation-result/operation-result';
import { calculate, GridResult, OperationParams } from '../core/calculate';
import { OperationRenderer } from '../operation-renderer/operation-renderer';

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
            paddingTop: theme.spacing(2)
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


const mapping: RendererMapping = {
    'operation': OperationRenderer
};

export const PositionalCalculatorView: FC = () => {
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState(0);
    const [operation, setOperation] = useState<OperationType>(OperationType.Addition);
    const { t } = useTranslation();
    const [res, setRes] = useState<GridResult | undefined>();
    const [params, setParams] = useState<OperationParams<AlgorithmType>>();
    const gridId = 'calculator-grid';

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
    };

    const onSubmit = function <T extends AlgorithmType>(
        base: number,
        representations: ValidatedOperand[],
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

    return (
        <div className={classes.root}>
            <Tabs value={currentTab} onChange={handleChange}>
                <Tab label="Converter" {...a11yProps(0)} />
                <Tab label="Theory" {...a11yProps(1)} />
            </Tabs>
            <TabPanel className={classes.panel} value={currentTab} index={0}>
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
            </TabPanel>
            <TabPanel className={classes.panel} value={currentTab} index={1}>
                <Box className={classes.docs}>
                    <DocPage path={`positional/operations/${operation.toString().toLowerCase()}`}
                             rendererMapping={mapping}/>
                </Box>
            </TabPanel>
        </div>
    );
};
