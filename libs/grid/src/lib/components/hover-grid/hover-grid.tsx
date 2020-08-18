import React, { FC, useRef, useState } from 'react';
import './hover-grid.scss';
import HoverGridCell, { GridCellEvent, HoverCellProps } from '../hover-cell/hover-grid-cell';
import { Button, message, Popover, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons/lib';
import { buildCellGroupLookup, coordsEqual, getOutlierAtPosition, gridToAscii } from '../../core/grid-utils';
import { CellCoords } from '../../models/cell-coords';
import { CellGroup } from '../../models/cell-group';
import { GridCellConfig } from '../../models/grid-cell-config';
import { LineType } from '../../models/line-type';
import { GridLine } from '../../models/grid-line';
import { CellPosition } from '../../models/cell-position';
import { copyToClipboard } from '@calc/ui';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

interface P {
    values: GridCellConfig[][];
    groups: CellGroup[];
    lines: GridLine[];
    groupBuilder?: any;
    title?: string;
}

export const HoverGrid: FC<P> = ({ values, groups, lines, groupBuilder, title }) => {
    const lookup = buildCellGroupLookup(groups);
    const [hoverCell, setHoveredCell] = useState<CellCoords>();
    const [hoveredGroup, setHoveredGroup] = useState<CellGroup>();
    const gridRef = useRef(null);

    const handleClick = (event) => {
        console.log('Click Event', event);
    };

    const handleHover = (event: GridCellEvent) => {
        if (event.hovered) {
            const { x, y } = event;

            const cellAlreadyHovered =
                hoverCell
                && hoverCell.x === event.x
                && hoverCell.y === event.y;

            if (cellAlreadyHovered) return;

            // find which group of cells
            // need to hovered, and set first group
            setHoveredCell({ x, y });
            const hoverGroupKey = `${x}-${y}`;
            const group = lookup[hoverGroupKey];

            if (group && group.length) setHoveredGroup(group[0]);
        } else {
            setHoveredCell(undefined);
            setHoveredGroup(undefined);
        }
    };

    const cellBelongsToHoveredGroup = (x: number, y: number): boolean => {
        if (!hoveredGroup) return false;

        return !!hoveredGroup.cells.find((cell) => {
            return cell.x === x && cell.y === y;
        });
    };

    const getGroupPopoverAnchorCoords = (): CellCoords => {
        if (!hoveredGroup) return { x: -1, y: -1 };
        const position = hoveredGroup.popoverPlacement || CellPosition.Top;
        return getOutlierAtPosition(hoveredGroup, position);
    };

    const matchLine = (lineType: LineType, index: number): boolean => {
        return !!lines.find((line) => line.index === index && line.type === lineType);
    };

    const anchor = getGroupPopoverAnchorCoords();

    const rows = values.map((row, y) => {
        const cells = row.map((cellConfig, x) => {

            const horizontalLine = matchLine(LineType.Horizontal, y);
            const verticalLine = matchLine(LineType.Vertical, x);
            const shouldHover = cellBelongsToHoveredGroup(x, y);

            const cellProps: HoverCellProps = {
                onClick: handleClick,
                onHover: handleHover,
                hovered: shouldHover,
                key: `${x}-${y}`,
                x,
                y,
                horizontalLine,
                verticalLine,
                config: cellConfig
            };

            const isCellGroupAnchor = coordsEqual(anchor, { x, y }) && shouldHover;
            const hasBuilder = hoveredGroup && (hoveredGroup.contentBuilder || groupBuilder);
            const canBuildPopoverContent = hasBuilder && !!hoveredGroup.contentProps;

            if (isCellGroupAnchor && canBuildPopoverContent) {
                const content = groupBuilder
                    ? groupBuilder(hoveredGroup.contentProps)
                    : hoveredGroup.contentBuilder(hoveredGroup.contentProps);

                return (
                    <Popover content={content} visible={true} key={`${x}-${y}`}>
                        <div>
                            <HoverGridCell {...cellProps} />
                        </div>
                    </Popover>
                );
            }

            return <HoverGridCell {...cellProps} />;
        });

        return (
            <div className='hover-grid-row' key={y}>
                {cells}
            </div>
        );
    });

    const copyAscii = () => {
        const ascii = gridToAscii({ values, groups, lines });
        copyToClipboard(ascii);
        message.info('Copied ascii to clipboard');
    };

    const saveAsImage = async () => {
        if(gridRef) {
            await domtoimage
                .toBlob(gridRef.current)
                .then(function (blob) {
                    saveAs(blob, 'result.png');
                }).catch((error) => console.log(error));
        }
    };

    return (
        <div className="grid-wrapper">
            {
                title &&
                <div className='title'>
                    <Typography>{title}</Typography>
                    <Button className='copy-image-button' size={'small'} onClick={saveAsImage}>
                        <CopyOutlined/>
                    </Button>
                </div>
            }
            <div className='cell-box'>
                <div className='cell-content' ref={gridRef}>
                    {rows}
                </div>
            </div>
        </div>

    );
};
