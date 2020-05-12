import React, { FC } from 'react';
import './number-grid-row.scss';
import { CellClickEvent, NumberGridCell } from '../number-grid-cell/number-grid-cell';
import { CellConfig } from '../../../core/operation-grid';

export interface RowClickEvent {
    rowValue: CellConfig[],
    rowIndex: number
}

interface P {
    values: CellConfig[],
    horizontalLine?: boolean,
    verticalLineIndex?: number,
    rowIndex: number,
    onCellClick?: (event: CellClickEvent) => void;
}

export const NumberGridRow: FC<P> = (
    {
        values,
        horizontalLine,
        verticalLineIndex,
        rowIndex,
        onCellClick
    }) => {

    const handleCellClick = (event: CellClickEvent) => {
        if (onCellClick) onCellClick(event);
    };

    const cells = values.map((value, index) => {
        return (
            <NumberGridCell
                horizontalLine={horizontalLine}
                value={value}
                key={index}
                x={index}
                y={rowIndex}
                onClick={handleCellClick}
                verticalLine={index === verticalLineIndex}
            />
        );
    });

    return (
        <div className="number-grid-row">
            {cells}
        </div>
    );
};
