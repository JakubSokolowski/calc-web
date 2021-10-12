import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Section, ViewWrapper } from '@calc/common-ui';
import { ComplementConverterInput } from './complement-converter-input/complement-converter-input';
import { ComplementConversionResult, getComplementWithDetails } from '@calc/calc-arithmetic';
import { ComplementResult } from './complement-result/complement-result';
import {
    ComplementDetailsRenderer,
    ComplementDetailsRendererParams
} from './complement-details-renderer/complement-details-renderer';

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
                [theme.breakpoints.down('lg')]: {
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

    const handleChange = (rep: string, base: number) => {
        const result = getComplementWithDetails(rep, base);
        setParams({ representation: rep, base });
        setResult(result);
    };

    return (
        <div className={classes.root}>
            <ViewWrapper path={'tools/positional/complement-converter'}>
                <Section title={t('complementConverter.title')}>
                    <ComplementConverterInput onConversionChange={handleChange}/>
                </Section>
                {result &&
                <Section title={t('complementConverter.result')}>
                    <ComplementResult number={result.inputNumber}/>
                </Section>
                }
                {result && result.inputNumber.isNegative() &&
                <Section title={t('complementConverter.details')}>
                    <ComplementDetailsRenderer showDownload {...params}/>
                </Section>
                }
            </ViewWrapper>
        </div>
    );
};

