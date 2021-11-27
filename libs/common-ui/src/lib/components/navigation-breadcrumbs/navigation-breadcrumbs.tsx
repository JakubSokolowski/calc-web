import React, { FC } from 'react';
import { Breadcrumbs, Link, styled, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { replaceAll } from '@calc/utils';
import { useTranslation } from 'react-i18next';
import { environment } from '@calc/env';

const PREFIX = 'Breadcrumbs';

const classes = {
    nav: `${PREFIX}-nav`,
    link: `${PREFIX}-link`,
    linkIcon: `${PREFIX}-linkIcon`,
    verticalSpacer: `${PREFIX}-verticalSpacer`,
};


const Root = styled('div')(({ theme }) => ({
    [`& .${classes.link}`]: {
        display: 'flex'
    },

    [`& .${classes.linkIcon}`]: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20
    },

    [`& .${classes.verticalSpacer}`]: {
        height: theme.spacing(2)
    },

    [`& .${classes.nav}`]: {
        display: 'flex',
        flexDirection: 'row'
    },
}));

interface P {
    path: string;
    theoryPath?: string;
}

export const NavigationBreadcrumbs: FC<P> = ({ path, theoryPath }) => {
    const { t } = useTranslation();
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
                <Link key={idx} color="inherit" href={`/${deployPrefix}/#/${s}`}>
                    {translation.title || translation}
                </Link>
            );
        }
    });


    return (
        <Root>
            <div className={classes.nav}>
                <Breadcrumbs aria-label="breadcrumb">
                    {links}
                </Breadcrumbs>
                <div style={{ flexGrow: 1 }}/>
                {
                    theoryPath &&
                    <Breadcrumbs>
                        <Link className={classes.link} color="inherit" href={`/${deployPrefix}/#${theoryPath}`}>
                            <MenuBookIcon className={classes.linkIcon}/>
                            {t('common.theory')}
                        </Link>
                    </Breadcrumbs>
                }
            </div>
        </Root>
    );
};
