import React, { FC } from 'react';
import { buildAxisContinuation } from '../../core/axis-utils';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { HoverGrid, HoverGridProps } from '../hover-grid/hover-grid';
import { buildEmptyGrid } from '../../core/grid-utils';

interface P extends HoverGridProps{
    desiredWidth: number;
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        wrapper: {
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            justifyContent: 'center'
        }
    })
});

export const PaddedGrid: FC<P> = ({desiredWidth, values, xAxis,label,...rest}) => {
    const classes = useStyles();
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
            <div className={classes.wrapper}>
                <div>
                    <HoverGrid values={values} xAxis={xAxis} label={label} {...rest}/>
                </div>
                <HoverGrid values={paddingGrid} groups={[]} lines={[]} xAxis={ax}/>
            </div>
        )
    }

    return (
        <div className={classes.wrapper}>
            <HoverGrid values={values} label={label} {...rest}/>
        </div>
    )
};
