import React, { FC, useState } from 'react';
import { CellClickEvent, NumberGridCell } from '../number-grid-cell/number-grid-cell';
import { CellConfig } from '../../../core/operation-grid';
import { Popover } from 'antd';

export interface RowClickEvent {
    rowValue: CellConfig[],
    rowIndex: number
}

interface P {
    values: CellConfig[];
    horizontalLine?: boolean;
    verticalLineIndex?: number;
    rowIndex: number;
    onCellClick?: (event: CellClickEvent) => void;
    highlightRow?: boolean;
    rowHooverContent?: any;
}

export const NumberGridRow: FC<P> = (
    {
        values,
        horizontalLine,
        verticalLineIndex,
        rowIndex,
        highlightRow,
        onCellClick,
        rowHooverContent
    }) => {

    const [hoover, setHoover] = useState(false);

    const handleCellClick = (event: CellClickEvent) => {
        if (onCellClick) onCellClick(event);
    };

    const cells = values.map((value, index, arr) => {
        const cell = (
            <NumberGridCell
                highlightRow={highlightRow || hoover}
                horizontalLine={horizontalLine}
                value={value}
                key={index}
                x={index}
                y={rowIndex}
                onClick={handleCellClick}
                verticalLine={index === verticalLineIndex}
            />
        );

        return index === arr.length - 1
            ?  (
                <Popover key={index} placement={'right'} content={rowHooverContent} visible={hoover}>
                    <div>
                        {cell}
                    </div>
                </Popover>
            )
            : cell;

    });

    return (
        <div
            className="number-grid-row"
            onMouseEnter={() => setHoover(true)}
            onMouseLeave={() => setHoover(false)}
        >
            {cells}
        </div>
    );
};
