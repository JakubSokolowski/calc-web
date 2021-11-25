import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { FloatConverterView } from '@calc/float-converter';
import { NotFound } from '@calc/common-ui';

export const FloatingTools: FC = () => {
    const { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <Typography variant={'h2'}>
                        Floating Tools
                    </Typography>
                </Route>
                <Route path={`${path}/float-converter`} component={FloatConverterView}/>
                <Route path='*' exact={true} component={NotFound}/>
            </Switch>
        </div>
    );
};
