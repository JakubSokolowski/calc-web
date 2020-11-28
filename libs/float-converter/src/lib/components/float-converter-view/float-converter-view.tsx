import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FloatConverterComponent } from '../float-converter/float-converter-component';
import { Section } from '@calc/ui';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
    return createStyles(
        {
            root: {
                [theme.breakpoints.up('lg')]: {
                    maxWidth: 900,
                },
                maxWidth: 900,
                margin: 'auto'
            }
        }
    )
});

export const FloatConverterView: FC = () => {
    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Section title={t('floatConverter.title')}>
                <FloatConverterComponent/>
            </Section>
        </div>
    );
};
