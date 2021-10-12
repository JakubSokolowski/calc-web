import React, { FC } from 'react';
import { GridCellConfig } from '../../models/grid-cell-config';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material';

import createStyles from '@mui/styles/createStyles';

export interface GridCellEvent {
    x: number;
    y: number;
    hovered?: boolean;
}

export interface HoverCellProps {
    x: number;
    y: number;
    config: GridCellConfig;
    hovered?: boolean;
    horizontalLine?: boolean;
    verticalLine?: boolean;
    onClick?: (event: GridCellEvent) => void;
    onHover?: (event: GridCellEvent) => void;
    key? : string;
    gridId?: string;
}

export const useGridCellStyles = makeStyles((theme: Theme) => {
    const baseCell = {
        minWidth: '36px',
        height: '36px',
        minHeight: '36px',
        maxWidth: '36px',
        lineHeight: '25px',
        padding: '4px',
        textAlign: 'center' as any,
        background: theme.palette.background.default,
        border: `1px ${theme.palette.action.selected} dashed`,
        color: theme.palette.text.disabled
    };

    const crossedCell = {
        position: 'relative' as any,
        textDecoration: 'strikethrough',
        '&:before': {
            position: 'absolute' as any,
            content: '""',
            left: 0,
            top: '50%',
            right: 0,
            borderTop: '1px solid',
            borderColor: theme.palette.primary,
            transform: 'rotate(-45deg)'
        }
    };

    return createStyles({
        defaultCell: {
            ...baseCell
        },
        crossedOutCell: {
            ...baseCell,
            ...crossedCell
        },
        crossedOutHoverCell: {
            ...baseCell,
            ...crossedCell,
            background: theme.palette.action.focus,
            border: 'none'
        },
        hoverCell: {
            ...baseCell,
            background: theme.palette.action.focus,
            border: 'none'
        },
        highlightedCell: {
            ...baseCell,
            background: theme.palette.primary.light,
            color: theme.palette.getContrastText(theme.palette.primary.light)
        },
        highlightedCellHover: {
            ...baseCell,
            background: theme.palette.primary.light,
            color: theme.palette.getContrastText(theme.palette.primary.light),
            border: 'none'
        },
        horizontalLine: {
            borderBottom: `1px solid ${theme.palette.action.active}`
        },
        verticalLine: {
            borderRight: `1px solid ${theme.palette.action.active}`
        },
        defaultCellWithVerticalLine: {
            ...baseCell,
            borderRight: `1px solid ${theme.palette.action.active}`
        },
        defaultCellWithVerticalAndHorizontalLine: {
            ...baseCell,
            borderRight: `1px solid ${theme.palette.action.active}`,
            borderBottom: `1px solid ${theme.palette.action.active}`
        },
    });
});


const HoverGridCell: FC<HoverCellProps> = (
    {
        x,
        y,
        config,
        hovered,
        horizontalLine,
        verticalLine,
        onHover,
        onClick,
        gridId
    }) => {

    const { content, preset } = config;
    const classes = useGridCellStyles();

    const handleClick = () => {
        if (onClick) {
            const cellEvent: GridCellEvent = { x, y };
            onClick(cellEvent);
        }
    };

    const handleHover = (hovered: boolean) => {
        if (onHover) {
            const cellEvent: GridCellEvent = { x, y, hovered: hovered };
            onHover(cellEvent);
        }
    };

    const getCellClassName = (): string => {
        if (hovered) return getHoveredCellClassName();
        if(preset && preset.default) return classes[preset.default] || preset.default;
        return classes.defaultCell;
    };

    const getHoveredCellClassName = (): string => {
        if(preset && !!preset.hover) return classes[preset.hover] || preset.hover;
        return classes.hoverCell;
    };

    const getLineClassName = (): string[] => {
        const classNames = [];
        if(horizontalLine) classNames.push(classes.horizontalLine);
        if(verticalLine) classNames.push(classes.verticalLine);

        return classNames;
    };

    const getClassNames = (): string => {
        const classNames = [getCellClassName(), ...getLineClassName()];
        return classNames.join(' ')
    };

    return (
        <div
            data-test={`${gridId}-${x}-${y}`}
            className={getClassNames()}
            onClick={handleClick}
            key={`${content}-${y}`}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
        >
            {content}
        </div>
    );
};

export default HoverGridCell;
