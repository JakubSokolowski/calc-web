import React, { FC } from 'react';
import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { NavigationBreadcrumbs } from '../navigation-breadcrumbs/navigation-breadcrumbs';

interface P {
    path: string;
    theoryPath?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up('lg')]: {
                maxWidth: 900
            },
            margin: 'auto'
        },
        link: {
            display: 'flex'
        },
        linkIcon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20
        },
        verticalSpacer: {
            height: theme.spacing(1)
        },
        nav: {
            display: 'flex',
            flexDirection: 'row'
        }
    })
);

export const ViewWrapper: FC<P> = ({ path, theoryPath, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavigationBreadcrumbs path={path} theoryPath={theoryPath}/>
            <div className={classes.verticalSpacer}/>
            {children}
        </div>
    );
};

