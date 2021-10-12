import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AssociatedBaseConverterView, BaseConverterView, ComplementConverterView } from '@calc/base-converter';
import { PositionalCalculatorView } from '@calc/positional-calculator';
import { Typography } from '@mui/material';
import { ViewWrapper } from '@calc/common-ui';

export const PositionalTools: FC = () => {
    const { path } = useRouteMatch();

    return <div>
        <Switch>
            <Route path={`${path}`} exact render={
                () => (
                    <ViewWrapper path={`${path}`}>
                        <Typography>Positional tools</Typography>
                    </ViewWrapper>
                )
            }/>
            <Route path={`${path}/base-converter`} component={BaseConverterView}/>
            <Route path={`${path}/associated-base-converter`} component={AssociatedBaseConverterView}/>
            <Route path={`${path}/complement-converter`} component={ComplementConverterView}/>
            <Route path={`${path}/complement-converter`} component={ComplementConverterView}/>
            <Route path={`${path}/positional-calculator`} component={PositionalCalculatorView}/>
        </Switch>
    </div>;
};
