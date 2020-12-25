import React, { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, createStyles, Tab, Tabs, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { a11yProps, Section, TabPanel } from '@calc/common-ui';
import { ComplementConverterInput } from './complement-converter-input/complement-converter-input';
import { ComplementConversionResult, getComplementWithDetails } from '@calc/calc-arithmetic';
import { ComplementResult } from './complement-result/complement-result';
import {
    ComplementDetailsRenderer,
    ComplementDetailsRendererParams
} from './complement-details-renderer/complement-details-renderer';
import { DocPage } from '@calc/docs';

export const useStyles = makeStyles((theme: Theme) => {
    return createStyles(
        {
            root: {
                [theme.breakpoints.up('lg')]: {
                    maxWidth: 900
                },
                margin: 'auto'
            },
            verticalSpacer: {
                [theme.breakpoints.down('md')]: {
                    height: theme.spacing(2)
                },
                [theme.breakpoints.up('lg')]: {
                    height: theme.spacing(2)
                }
            }
        }
    );
});


export const ComplementConverterView: FC = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [result, setResult] = useState<ComplementConversionResult>();
    const [params, setParams] = useState<ComplementDetailsRendererParams>();
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (rep: string, base: number) => {
        const result = getComplementWithDetails(rep, base);
        setParams({representation: rep, base});
        setResult(result);
    };

    const handleIndexChange = (event: ChangeEvent<{}>, newIndex: number) => {
        setTabIndex(newIndex);
    };

    return (
        <div className={classes.root}>
            <Tabs value={tabIndex} onChange={handleIndexChange}>
                <Tab label="Converter" {...a11yProps(0)} />
                <Tab label="Theory" {...a11yProps(1)} />
            </Tabs>
            <TabPanel index={tabIndex} value={0}>
                <div className={classes.verticalSpacer}/>
                <Section title={t('complementConverter.title')}>
                    <ComplementConverterInput onConversionChange={handleChange}/>
                </Section>
                {result &&
                    <Section title={t('complementConverter.result')}>
                        <ComplementResult result={result}/>
                    </Section>
                }
                {result && result.inputNumber.isNegative &&
                    <Section title={t('complementConverter.details')}>
                        <ComplementDetailsRenderer showDownload {...params}/>
                    </Section>
                }
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <div className={classes.verticalSpacer}/>
                <Box display={'flex'} alignItems={'center'} maxWidth={700} margin={'auto'}>
                    <DocPage path={'positional/complement-conversion'} operationRenderer={ComplementDetailsRenderer}/>
                </Box>
            </TabPanel>
        </div>
    );
};

