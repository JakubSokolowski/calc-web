import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';
import { Section, ViewWrapper } from '@calc/common-ui';
import { ComplementConverterInput } from './complement-converter-input/complement-converter-input';
import { ComplementConversionResult, getComplementWithDetails } from '@calc/calc-arithmetic';
import { ComplementResult } from './complement-result/complement-result';
import {
    ComplementDetailsRenderer,
    ComplementDetailsRendererParams
} from './complement-details-renderer/complement-details-renderer';
import { ComplementConverterParams } from './complement-converter-input/complement-converter-params';

const PREFIX = 'ComplementConverterView';

const classes = {
    root: `${PREFIX}-root`,
    verticalSpacer: `${PREFIX}-verticalSpacer`,
};


const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        [theme.breakpoints.up('lg')]: {
            maxWidth: 900
        },
        margin: 'auto'
    },
    [`& .${classes.verticalSpacer}`]: {
        [theme.breakpoints.down('lg')]: {
            height: theme.spacing(2)
        },
        [theme.breakpoints.up('lg')]: {
            height: theme.spacing(2)
        }
    },
}));

export const ComplementConverterView: FC = () => {
    const { t } = useTranslation();
    const [result, setResult] = useState<ComplementConversionResult>();
    const [params, setParams] = useState<ComplementDetailsRendererParams>();

    const handleChange = (p: ComplementConverterParams) => {
        const {inputBase, inputStr} = p;
        const result = getComplementWithDetails(inputStr, inputBase);
        setParams({ representation: inputStr, base: inputBase });
        setResult(result);
    };

    return (
        <Root>
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
        </Root>
    );
};

