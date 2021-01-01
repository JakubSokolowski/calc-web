import React, { FC } from 'react';
import { createStyles, Link, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { environment } from '@calc/env';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        sha: {
            color: theme.palette.text.disabled
        },
        box: {
            padding: theme.spacing(2)
        }
    });
});

export const Version: FC = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const sha = environment.sha;

    if (!sha) return null;

    const shortSha = sha.substr(0, 7);
    const ghLink = `https://github.com/JakubSokolowski/calc-web/commit/${sha}`;

    return (
        <div className={classes.box}>
           <span>
               {t('home.appName')} v.
               <Link color={'inherit'} href={ghLink}>
                   {shortSha}
               </Link>
            </span>
        </div>
    );
};
