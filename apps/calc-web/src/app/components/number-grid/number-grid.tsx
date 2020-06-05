import React, { FC, ReactNode } from 'react';
import { NumberGridRow, RowClickEvent } from './number-grid-row/number-grid-row';
import { gridToAscii, OperationGrid } from '../../core/operation-grid';
import './number-grid.scss';
import { CellClickEvent } from './number-grid-cell/number-grid-cell';
import { Button, message, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons/lib';
import { copyToClipboard } from '../float-converter/input-with-copy/input-with-copy';

export interface ColumnClickEvent {
    columnValue: any[];
    columnIndex: number;
}

interface P {
    grid: OperationGrid<any>;
    title?: string;
    hooverComponents?: any[];
    onCellClick?: (event: CellClickEvent) => void;
    onRowClick?: (event: RowClickEvent) => void;
    onColumnClick?: (event: ColumnClickEvent) => void;
    cellHooverBuilder?: (value: any) => ReactNode;
    rowHooverBuilder?: (rowValues: any[], hooverProps: any) => ReactNode;
}

export const NumberGrid: FC<P> = (
    {
        grid,
        onRowClick,
        onCellClick,
        onColumnClick,
        hooverComponents,
        rowHooverBuilder,
        title
    }) => {

    const handleCellClick = (event: CellClickEvent) => {
        if (onCellClick) {
            onCellClick(event);
        }

        if(onRowClick) {
            const rowClickEvent: RowClickEvent = {
                rowIndex: event.y,
                rowValue: grid.cellDisplayValues[event.y]
            };

            onRowClick(rowClickEvent)
        }

        if(onColumnClick) {
            const columnClickEvent: ColumnClickEvent = {
                columnIndex: event.x,
                columnValue: grid.cellDisplayValues.map((row) => row[event.x])
            };

            onColumnClick(columnClickEvent)
        }
    };

    const handleCopy = () => {
        const ascii = gridToAscii(grid);
        copyToClipboard(ascii);
        message.info('Copied ascii to clipboard');
    };


    const rows = grid.cellDisplayValues.map((row, index) => {
        return (
            <NumberGridRow
                values={row}
                key={index}
                horizontalLine={grid.horizontalLine && grid.horizontalLine === index}
                verticalLineIndex={grid.verticalLine}
                rowHooverProps={grid.rowHooverContentProps && grid.rowHooverContentProps[index]}
                rowIndex={index}
                onCellClick={handleCellClick}
                rowHooverBuilder={rowHooverBuilder}
            />
        );
    });

    return (
        <div style={{ paddingTop: '12px', width: '100%', flexGrow: 1 }}>
            {
                title &&
                <div style={{paddingBottom: '12px', display: 'flex', flexDirection: 'row'}}>
                    <Typography>{title}</Typography>
                    <div style={{ flexGrow: 1 }}/>
                    <Button style={{marginRight: '2px'}} size={'small'} onClick={handleCopy}>
                        <CopyOutlined/>
                    </Button>
                </div>
            }
            {rows}
        </div>
    );
};
