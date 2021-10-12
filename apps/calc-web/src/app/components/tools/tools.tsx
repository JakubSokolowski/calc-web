import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { PositionalTools } from './positional-tools/positional-tools';
import { FloatingTools } from './floating-tools/floating-tools';
import { ViewWrapper } from '@calc/common-ui';

export const Tools: FC = () => {
    const { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ViewWrapper path={`${path}`}>
                        <Typography>Floating tools</Typography>
                    </ViewWrapper>
                </Route>
                <Route path={`${path}/positional`} component={PositionalTools}/>
                <Route path={`${path}/floating`} component={FloatingTools}/>
            </Switch>
        </div>
    );
};
