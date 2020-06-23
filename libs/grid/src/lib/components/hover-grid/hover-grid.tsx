import React, { FC, useState } from 'react';

import './hover-grid.scss';
import HoverGridCell, { GridCellEvent } from '../hover-cell/hover-grid-cell';
import { Button, message, Popover, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons/lib';
import {
    buildCellGroupLookup,
    coordsEqual,
    getOutlierAtPosition,
    gridToAscii
} from '../../core/grid-utils';
import { CellCoords } from '../../models/cell-coords';
import { CellGroup } from '../../models/cell-group';
import { GridCellConfig } from '../../models/grid-cell-config';
import { LineType } from '../../models/line-type';
import { GridLine } from '../../models/grid-line';
import { CellPosition } from '../../models/cell-position';
import { copyToClipboard } from '@calc/ui';

interface P {
    values: GridCellConfig[][];
    groups: CellGroup[];
    lines: GridLine[];
    groupBuilder?: any;
    title?: string;
}

export const HoverGrid: FC<P> = ({ values, groups, lines, groupBuilder, title }) => {
    const lookup = buildCellGroupLookup(groups);
    const [hooveredCell, setHooveredCell] = useState<CellCoords>();
    const [hooveredGroup, setHooveredGroup] = useState<CellGroup>();

    const handleClick = (event) => {
        console.log('Click Event', event);
    };


    const handleHoover = (event: GridCellEvent) => {
        if (event.hoovered) {
            const { x, y } = event;
            const sameCell = hooveredCell && hooveredCell.x === event.x
                && hooveredCell.y === event.y;
            if (sameCell) return;
            setHooveredCell({ x, y });
            const groupKey = `${x}-${y}`;
            const group = lookup[groupKey];
            if (group && group.length) setHooveredGroup(group[0]);
        } else {
            setHooveredCell(undefined);
            setHooveredGroup(undefined);
        }
    };

    const shouldHoover = (x: number, y: number): boolean => {
        if (!hooveredGroup) return false;

        return !!hooveredGroup.cells.find((cell) => {
            return cell.x === x && cell.y === y;
        });
    };

    const popoverAnchor = () => {
        if (!hooveredGroup) return { x: -1, y: -1 };
        const position = hooveredGroup.popoverPlacement || CellPosition.Top;
        return getOutlierAtPosition(hooveredGroup, position);
    };

    const anchor = popoverAnchor();
    const rows = values.map((row, y) => {
        const cells = row.map((cellConfig, x) => {
            const horizontalLine = !!lines.find((line) => line.type === LineType.Vertical && line.index === x);
            const verticalLine = !!lines.find((line) => line.type === LineType.Horizontal && line.index === y);

            const props = {
                onClick: handleClick,
                onHoover: handleHoover,
                hoovered: shouldHoover(x, y),
                key: `${x}-${y}`,
                x,
                y,
                horizontalLine,
                verticalLine,
                config: cellConfig
            };


            if (coordsEqual(anchor, { x, y }) && shouldHoover(x, y) && (hooveredGroup.contentBuilder || groupBuilder) && !!hooveredGroup.contentProps) {
                const content = groupBuilder
                    ? groupBuilder(hooveredGroup.contentProps)
                    : hooveredGroup.contentBuilder(hooveredGroup.contentProps);

                return (
                    <Popover content={content} visible={true} key={`${x}-${y}`}>
                        <HoverGridCell {...props} />
                    </Popover>
                );
            }

            return <HoverGridCell {...props} />;
        });

        return (
            <div className='hoover-grid-row' key={y}>
                {cells}
            </div>
        );
    });

    const handleCopy = () => {
        const ascii = gridToAscii({values, groups, lines});
        copyToClipboard(ascii);
        message.info('Copied ascii to clipboard');
    };

    return (
        <div className="grid-wrapper">
            {
                title &&
                <div className='title'>
                    <Typography>{title}</Typography>
                    <Button className='copy-ascii-button' size={'small'} onClick={handleCopy}>
                        <CopyOutlined/>
                    </Button>
                </div>
            }
            <div className='cell-box'>
                {rows}
            </div>
        </div>

    );
};
