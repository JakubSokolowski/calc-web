import React, { FC, useRef, useState } from 'react';
import HoverGridCell, { GridCellEvent, HoverCellProps } from '../hover-cell/hover-grid-cell';
import {
    buildCellGroupLookup,
    coordsEqual,
    findGroupTriggeredByCell,
    getOutlierAtPosition
} from '../../core/grid-utils';
import { CellConfig } from '../../models/cell-config';
import { CellGroup } from '../../models/cell-group';
import { GridCellConfig } from '../../models/grid-cell-config';
import { GridLine } from '../../models/grid-line';
import { CellPosition } from '../../models/cell-position';
import { NumberSubscript } from '@calc/common-ui';
import { anyHorizontalLineIntersects, anyVerticalLineIntersects } from '../../core/grid-line-utils';
import { AxisConfig } from '../../models/axis-config';
import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { GridLabel } from '../../..';
import { OperandLabel } from '../operand-label/operand-label';


function isCellConfig(value: any): value is CellConfig {
    if (!value) return false;
    return !!value.x && !!value.y;
}


export interface HoverGridProps {
    values: GridCellConfig[][];
    groups: CellGroup[];
    lines: GridLine[];
    groupBuilder?: any;
    xAxis?: AxisConfig;
    title?: string;
    id: string;
    label?: GridLabel;
}


const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }}/>
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 300,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9'
    }
}));


const PREFIX = 'HoverGrid';

const classes = {
    gridRow: `${PREFIX}-gridRow`,
    gridWrapper: `${PREFIX}-gridWrapper`,
    cellBox: `${PREFIX}-cellBox`,
    cellContent: `${PREFIX}-cellContent`,
    indicesBox: `${PREFIX}-indicesBox`,
    columnIndex: `${PREFIX}-columnIndex`,
    title: `${PREFIX}-title`,
    spacer: `${PREFIX}-spacer`
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.gridRow}`]: {
        display: 'flex',
        flexDirection: 'row'
    },
    [`& .${classes.gridWrapper}`]: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    [`& .${classes.cellBox}`]: {
        width: '100%',
        maxHeight: '620px',
        display: 'flex',
        flexDirection: 'row'
    },
    [`& .${classes.cellContent}`]: {
        width: 'auto',
        height: 'auto'
    },
    [`& .${classes.indicesBox}`]: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto'
    },
    [`& .${classes.columnIndex}`]: {
        minWidth: '36px',
        height: '36px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    [`& .${classes.title}`]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: theme.spacing(2)
    },
    [`& .${classes.spacer}`]: {
        width: theme.spacing(2)
    }
}));

export const HoverGrid: FC<HoverGridProps> = (
    {
        values,
        groups,
        lines,
        groupBuilder,
        title,
        label,
        xAxis,
        id
    }) => {
    const lookup = buildCellGroupLookup(groups);
    const [hoverCell, setHoveredCell] = useState<CellConfig>();
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
            setHoveredCell({ x, y });

            const hoverGroupKey = `${x}-${y}`;
            const matchingGroups = lookup[hoverGroupKey];

            if (matchingGroups && matchingGroups.length) {
                const group = findGroupTriggeredByCell(event, groups);
                if (group) setHoveredGroup(group);
            }
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

    const getGroupPopoverAnchorCoords = (): CellConfig => {
        if (!hoveredGroup) return { x: -1, y: -1 };
        if (isCellConfig(hoveredGroup.anchorPosition)) return hoveredGroup.anchorPosition;
        const position = hoveredGroup.anchorPosition || CellPosition.Top;
        return getOutlierAtPosition(hoveredGroup, position);
    };

    const anchor = getGroupPopoverAnchorCoords();

    const rows = values.map((row, y) => {
        const cells = row.map((cellConfig, x) => {
            const horizontalLine = anyHorizontalLineIntersects(x, y, lines);
            const verticalLine = anyVerticalLineIntersects(x, y, lines);
            const shouldHover = cellBelongsToHoveredGroup(x, y);

            const cellProps: HoverCellProps = {
                onClick: handleClick,
                onHover: handleHover,
                hovered: shouldHover,
                gridId: id,
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
                const content = hoveredGroup.contentBuilder && hoveredGroup.contentProps
                    ? hoveredGroup.contentBuilder(hoveredGroup.contentProps)
                    : groupBuilder(hoveredGroup.contentProps);
                return (
                    <HtmlTooltip data-test={`${id}-tooltip`} title={content} open={true} key={`${x}-${y}`} arrow
                                 placement={hoveredGroup.popoverPlacement || 'top'}>
                        <div>
                            <HoverGridCell {...cellProps}  />
                        </div>
                    </HtmlTooltip>
                );
            }

            return <HoverGridCell {...cellProps} />;
        });

        return (
            <div className={classes.gridRow} key={y}>
                {cells}
            </div>
        );
    });

    const xAxisIndices = xAxis ? xAxis.indices.map((value, index) => {
        return (
            <div key={`${value}-${index}`} className={classes.columnIndex}>
                <NumberSubscript value={xAxis.prefix} subscript={value} noBraces/>
            </div>
        );
    }) : [];

    return (
        <Root>
            <div className={classes.gridWrapper}>
                {
                    xAxis &&
                    <div className={classes.indicesBox}>
                        {xAxisIndices}
                    </div>
                }
                <div>
                    <div className={classes.cellBox}>
                        <div className={classes.cellContent} ref={gridRef} id={id}>
                            {rows}
                        </div>
                        {
                            label &&
                            <OperandLabel labelConfig={label}/>
                        }
                    </div>
                </div>
            </div>
        </Root>
    );
};
