import React, { FC } from 'react';

import './hover-grid-cell.scss';
import { GridCellConfig } from '../../models/grid-cell-config';

export interface GridCellEvent {
    x: number;
    y: number;
    hoovered?: boolean;
}

interface P {
    x: number;
    y: number;
    config: GridCellConfig;
    hoovered?: boolean;
    horizontalLine?: boolean;
    verticalLine?: boolean;
    onClick?: (event: GridCellEvent) => void;
    onHoover?: (event: GridCellEvent) => void;
}

const HoverGridCell: FC<P> = (
    {
        x,
        y,
        config,
        hoovered,
        horizontalLine,
        verticalLine,
        onHoover,
        onClick
    }) => {

    const { content, preset } = config;

    const handleClick = () => {
        if (onClick) {
            const cellEvent: GridCellEvent = { x, y };
            onClick(cellEvent);
        }
    };

    const handleHoover = (hoovered: boolean) => {
        if (onHoover) {
            const cellEvent: GridCellEvent = { x, y, hoovered };
            onHoover(cellEvent);
        }
    };

    const getCellClassName = () => {
        if (hoovered) return getHooveredCellClassName();
        if(preset && preset.default) return preset.default;
        return 'default-cell';
    };


    const getHooveredCellClassName = () => {
        if(preset && !!preset.hoover) return preset.hoover;
        return 'hoover-cell';
    };

    const getLineClassName = () => {
        let classNames = '';
        if(verticalLine) classNames += ' horizontal-line';
        if(horizontalLine) classNames += ' vertical-line';

        return classNames;
    };

    const getClassNames = () => {
        return `${getCellClassName()} ${getLineClassName()}`
    };

    return (
        <div
            className={getClassNames()}
            onClick={handleClick}
            onMouseEnter={() => handleHoover(true)}
            onMouseLeave={() => handleHoover(false)}
        >
            {content}
        </div>
    );
};

export default HoverGridCell;
