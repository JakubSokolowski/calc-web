import { styled } from '@mui/material';
import React, { FC } from 'react';
import { NavigationBreadcrumbs } from '../navigation-breadcrumbs/navigation-breadcrumbs';

interface P {
    path: string;
    theoryPath?: string;
}

const PREFIX = "ViewWrapper";


const classes = {
    root: `${PREFIX}-root`,
    link: `${PREFIX}-link`,
    linkIcon: `${PREFIX}-linkIcon`,
    verticalSpacer: `${PREFIX}-verticalSpacer`,
    nav: `${PREFIX}-nav`,
};


const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        [theme.breakpoints.up('lg')]: {
            maxWidth: 900
        },
        margin: 'auto'
    },
    [`& .${classes.link}`]: {
        display: 'flex'
    },

    [`& .${classes.linkIcon}`]: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20
    },

    [`& .${classes.verticalSpacer}`]: {
        height: theme.spacing(1)
    },

    [`& .${classes.nav}`]: {
        display: 'flex',
        flexDirection: 'row'
    },
}));



export const ViewWrapper: FC<P> = ({ path, theoryPath, children }) => {
    return (
        <Root>
            <div className={classes.root}>
                <NavigationBreadcrumbs path={path} theoryPath={theoryPath}/>
                <div className={classes.verticalSpacer}/>
                {children}
            </div>
        </Root>
    );
};

