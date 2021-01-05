import React, { FC } from 'react';
import { Breadcrumbs, createStyles, Link, Theme, Typography } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { makeStyles } from '@material-ui/core/styles';
import { replaceAll } from '@calc/utils';
import { useTranslation } from 'react-i18next';
import { environment } from '@calc/env';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        link: {
            display: 'flex'
        },
        linkIcon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20
        },
        verticalSpacer: {
            height: theme.spacing(2)
        },
        nav: {
            display: 'flex',
            flexDirection: 'row'
        }
    })
);

interface P {
    path: string;
    theoryPath?: string;
}

export const NavigationBreadcrumbs: FC<P> = ({ path, theoryPath }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const pathFragments = path.split('/').filter(r => !!r);
    const deployPrefix = environment.deployUrl ? `/${environment.deployUrl}` : '';

    const subRoutesCombinations = pathFragments.map((_, index) => {
        const all = pathFragments.slice(0, index + 1);
        return all.join('/');
    });

    const links = subRoutesCombinations.map((s, idx) => {
        const isLeaf = idx === subRoutesCombinations.length - 1;
        const prefix = 'routes.';
        const suffix = isLeaf ? '' : '.title';
        const dotRoute = `${prefix}${replaceAll(s, '/', '.')}${suffix}`;
        const translation = t(dotRoute, { returnObjects: true }) as any;



        if (isLeaf) {
            return (
                <Typography key={idx} color="textPrimary">
                    {translation.title || translation}
                </Typography>
            );
        } else {
            return (
                <Link key={idx} color="inherit" href={`${deployPrefix}/#/${s}`}>
                    {translation.title || translation}
                </Link>
            );
        }
    });


    return (
        <div className={classes.nav}>
            <Breadcrumbs aria-label="breadcrumb">
                {links}
            </Breadcrumbs>
            <div style={{ flexGrow: 1 }}/>
            {
                theoryPath &&
                <Breadcrumbs>
                    <Link className={classes.link} color="inherit" href={`${deployPrefix}/#${theoryPath}`}>
                        <MenuBookIcon className={classes.linkIcon}/>
                        {t('common.theory')}
                    </Link>
                </Breadcrumbs>
            }
        </div>
    );
};
