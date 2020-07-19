import React, { FC } from 'react';

import './hover-grid-cell.scss';
import { GridCellConfig } from '../../models/grid-cell-config';

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
}

const HoverGridCell: FC<HoverCellProps> = (
    {
        x,
        y,
        config,
        hovered,
        horizontalLine,
        verticalLine,
        onHover,
        onClick
    }) => {

    const { content, preset } = config;

    const handleClick = () => {
        if (onClick) {
            const cellEvent: GridCellEvent = { x, y };
            onClick(cellEvent);
        }
    };

    const handlehover = (hovered: boolean) => {
        if (onHover) {
            const cellEvent: GridCellEvent = { x, y, hovered: hovered };
            onHover(cellEvent);
        }
    };

    const getCellClassName = (): string => {
        if (hovered) return gethoveredCellClassName();
        if(preset && preset.default) return preset.default;
        return 'default-cell';
    };

    const gethoveredCellClassName = (): string => {
        if(preset && !!preset.hover) return preset.hover;
        return 'hover-cell';
    };

    const getLineClassName = (): string[] => {
        const classNames = [];
        if(horizontalLine) classNames.push('horizontal-line');
        if(verticalLine) classNames.push('vertical-line');

        return classNames;
    };

    const getClassNames = (): string => {
        const classNames = [getCellClassName(), ...getLineClassName()];
        return classNames.join(' ')
    };

    return (
        <div
            className={getClassNames()}
            onClick={handleClick}
            key={`${x}-${y}`}
            onMouseEnter={() => handlehover(true)}
            onMouseLeave={() => handlehover(false)}
        >
            {content}
        </div>
    );
};

export default HoverGridCell;
