import React, { FC } from 'react';
import { buildAxisContinuation } from '../../core/axis-utils';
import { styled } from '@mui/material/styles';
import { HoverGrid, HoverGridProps } from '../hover-grid/hover-grid';
import { buildEmptyGrid } from '../../core/grid-utils';

interface P extends HoverGridProps{
    desiredWidth: number;
}

const PREFIX = "PaddedGrid";

const classes = {
    wrapper: `${PREFIX}-select`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.wrapper}`]: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        justifyContent: 'left',
        [theme.breakpoints.down('lg')]: {
            maxWidth: '600px',
        },
    },
}));


export const PaddedGrid: FC<P> = ({desiredWidth, values, xAxis,label, id, ...rest}) => {
    const spaceForLabel = label ? 1 : 0;
    const width = values[0]
        ? values[0].length + spaceForLabel
        : 0;
    const offset = desiredWidth - width;

    if(offset > 0) {
        const height = values.length;
        const paddingGrid = buildEmptyGrid(offset, height);
        const ax = xAxis ? buildAxisContinuation(xAxis, offset) : undefined;

        return (
            <Root>
                <div className={classes.wrapper}>
                    <div>
                        <HoverGrid values={values} xAxis={xAxis} label={label} id={id} {...rest}/>
                    </div>
                    <HoverGrid values={paddingGrid} groups={[]} lines={[]} xAxis={ax} id={`${id}-padding`}/>
                </div>
            </Root>
        )
    }

    return (
      <Root>
          <div className={classes.wrapper}>
              <HoverGrid values={values} label={label} id={id} {...rest}/>
          </div>
      </Root>
    )
};
