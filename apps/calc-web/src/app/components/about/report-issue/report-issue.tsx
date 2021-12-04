import React, { FC } from 'react';
import { Link, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { environment } from '@calc/env';
const PREFIX = 'ReportIssue';

const classes = {
    content: `${PREFIX}-content`
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.content}`]: {
        padding: theme.spacing(2)
    }
}));

export const ReportIssue: FC = () => {
    const { t } = useTranslation();

    return (
        <Root>
            <div data-test="bug-report" className={classes.content}>
                <Link color={'inherit'} href={environment.createIssueUrl}>
                    {t('about.submitNewIssue')}
                </Link>
            </div>
        </Root>
    );
};
