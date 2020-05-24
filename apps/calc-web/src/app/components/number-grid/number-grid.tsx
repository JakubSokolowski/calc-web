import React, { FC } from 'react';
import { NumberGridRow, RowClickEvent } from './number-grid-row/number-grid-row';
import { OperationGrid } from '../../core/operation-grid';
import './number-grid.scss';
import { CellClickEvent } from './number-grid-cell/number-grid-cell';

export interface ColumnClickEvent {
    columnValue: any[],
    columnIndex: number
}

interface P {
    grid: OperationGrid;
    hooverComponents?: any[];
    onCellClick?: (event: CellClickEvent) => void;
    onRowClick?: (event: RowClickEvent) => void;
    onColumnClick?: (event: ColumnClickEvent) => void;
}

export const NumberGrid: FC<P> = (
    {
        grid,
        onRowClick,
        onCellClick,
        onColumnClick,
        hooverComponents
    }) => {

    const handleCellClick = (event: CellClickEvent) => {
        if (onCellClick) {
            onCellClick(event);
        }

        if(onRowClick) {
            const rowClickEvent: RowClickEvent = {
                rowIndex: event.y,
                rowValue: grid.values[event.y]
            };

            onRowClick(rowClickEvent)
        }

        if(onColumnClick) {
            const columnClickEvent: ColumnClickEvent = {
                columnIndex: event.x,
                columnValue: grid.values.map((row) => row[event.x])
            };

            onColumnClick(columnClickEvent)
        }
    };


    const rows = grid.values.map((row, index) => {
        return (
            <NumberGridRow
                values={row}
                key={index}
                horizontalLine={grid.horizontalLine && grid.horizontalLine === index}
                verticalLineIndex={grid.verticalLine}
                rowIndex={index}
                onCellClick={handleCellClick}
                rowHooverContent={hooverComponents[index]}
            />
        );
    });

    return (
        <div style={{ paddingTop: '12px', overflowY: 'auto', width: '100%' }}>
            {rows}
        </div>
    );
};
