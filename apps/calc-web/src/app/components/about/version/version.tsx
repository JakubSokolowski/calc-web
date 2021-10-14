import React, { FC } from 'react';
import { Link, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { environment } from '@calc/env';

const PREFIX = 'Version';

const classes = {
    sha: `${PREFIX}-sha`,
    box: `${PREFIX}-box`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.sha}`]: {
        color: theme.palette.text.disabled
    },
    [`& .${classes.box}`]: {
        padding: theme.spacing(2)
    },
}));

export const Version: FC = () => {
    const { t } = useTranslation();
    const sha = environment.sha;

    if (!sha) return null;

    const shortSha = sha.substr(0, 7);
    const ghLink = `https://github.com/JakubSokolowski/calc-web/commit/${sha}`;

    return (
        <Root>
            <div className={classes.box}>
           <span>
               {t('home.appName')} v.
               <Link color={'inherit'} href={ghLink}>
                   {shortSha}
               </Link>
            </span>
            </div>
        </Root>
    );
};
