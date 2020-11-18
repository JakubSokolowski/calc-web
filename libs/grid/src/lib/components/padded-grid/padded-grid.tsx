import React, { FC } from 'react';
import { buildAxis } from '../../core/axis-utils';
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

export const PaddedGrid: FC<P> = ({desiredWidth, values, ...rest}) => {
    const classes = useStyles();
    const width = values[0] ? values[0].length : 0;
    const offset = desiredWidth - width;

    if(offset > 0) {
        const height = values.length;
        const paddingGrid = buildEmptyGrid(offset, height);
        const ax = buildAxis(desiredWidth -1, offset);

        return (
            <div className={classes.wrapper}>
                <HoverGrid values={paddingGrid} groups={[]} lines={[]} xAxis={ax}/>
                <HoverGrid values={values} {...rest}/>
            </div>
        )
    }

    return (
        <div className={classes.wrapper}>
            <HoverGrid values={values} {...rest}/>
        </div>
    )
};
