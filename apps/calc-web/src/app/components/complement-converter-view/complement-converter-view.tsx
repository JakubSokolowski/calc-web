import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Section } from '@calc/ui';

export const useStyles = makeStyles((theme: Theme) => {
    return createStyles(
        {
            root: {
                [theme.breakpoints.up('lg')]: {
                    maxWidth: 900,
                },
                margin: 'auto'
            }
        }
    )
});

export const ComplementConverterView: FC = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Section title={t('complementConverter.title')}/>
        </div>
    );
};
