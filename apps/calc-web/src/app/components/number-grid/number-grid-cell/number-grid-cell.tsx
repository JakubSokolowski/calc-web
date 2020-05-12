import React, { FC } from 'react';
import './number-grid-cell.scss';
import { CellConfig } from '../../../core/operation-grid';

export interface CellClickEvent {
    value: CellConfig;
    x: number;
    y: number;
}

interface P {
    value: CellConfig;
    horizontalLine?: boolean;
    verticalLine?: boolean;
    x: number;
    y: number;
    onClick?: (event: CellClickEvent) => void;
}

export const NumberGridCell: FC<P> = (
    {
        x,
        y,
        value,
        horizontalLine,
        verticalLine,
        onClick
    }) => {

    const defaultBorder = '1px #e3e3e3 dashed';

    const handleClick = () => {
        if (onClick) {
            const cellEvent: CellClickEvent = {
                value,
                x,
                y
            };
            onClick(cellEvent);
        }
    };

    return (
        <div className="number-grid-cell" onClick={handleClick} style={
            {
                border: defaultBorder,
                borderBottom: horizontalLine ? '1px #333333 solid' : defaultBorder,
                borderRight: verticalLine ? '1px #333333 solid' : defaultBorder,
                background: value.highlight ? '#e3e3e3' : ''
            }
        }>
            {value?.value}
        </div>
    );
};
