import React, { FC, useRef, useState } from 'react';
import HoverGridCell, { GridCellEvent, HoverCellProps } from '../hover-cell/hover-grid-cell';
import { buildCellGroupLookup, coordsEqual, getOutlierAtPosition } from '../../core/grid-utils';
import { CellCoords } from '../../models/cell-coords';
import { CellGroup } from '../../models/cell-group';
import { GridCellConfig } from '../../models/grid-cell-config';
import { GridLine } from '../../models/grid-line';
import { CellPosition } from '../../models/cell-position';
import { NumberSubscript } from '@calc/ui';
import { anyHorizontalLineIntersects, anyVerticalLineIntersects } from '../../core/grid-line-utils';
import { AxisConfig } from '../../models/axis-config';
import { createStyles, IconButton, Theme, Tooltip, Typography, withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { useTranslation } from 'react-i18next';

interface P {
    values: GridCellConfig[][];
    groups: CellGroup[];
    lines: GridLine[];
    groupBuilder?: any;
    xAxis?: AxisConfig;
    title?: string;
}

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9'
    }
}))(Tooltip);

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        gridRow: {
            display: 'flex',
            flexDirection: 'row'
        },
        gridWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        },
        cellBox: {
            width: '100%',
            maxHeight: '500px',
            display: 'inline-block'
        },
        cellContent: {
            width: 'auto',
            height: 'auto'
        },
        indicesBox: {
            display: 'flex',
            flexDirection: 'row'
        },
        columnIndex: {
            minWidth: '36px',
            height: '36px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: theme.spacing(2)
        },
        spacer: {
            width: theme.spacing(2)
        }
    });
});


export const HoverGrid: FC<P> = ({ values, groups, lines, groupBuilder, title, xAxis }) => {
    const lookup = buildCellGroupLookup(groups);
    const [hoverCell, setHoveredCell] = useState<CellCoords>();
    const [hoveredGroup, setHoveredGroup] = useState<CellGroup>();
    const gridRef = useRef(null);
    const classes = useStyles();
    const { t } = useTranslation();

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
                    <HtmlTooltip title={content} open={true} key={`${x}-${y}`} arrow placement={'top'}>
                        <div>
                            <HoverGridCell {...cellProps} />
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

    const xAxisIndices = xAxis ? xAxis.indices.map((value) => {
        return (
            <div key={value} className={classes.columnIndex}>
                <NumberSubscript value={xAxis.prefix} subscript={value} noBraces/>
            </div>
        );
    }) : [];


    const saveAsImage = async () => {
        if (gridRef) {
            await domtoimage
                .toBlob(gridRef.current)
                .then(function(blob) {
                    saveAs(blob, 'result.png');
                }).catch((error) => console.log(error));
        }
    };

    return (
        <div className={classes.gridWrapper}>
            {
                title &&
                <div className={classes.title}>
                    <Typography variant={'body1'}>{title}</Typography>
                    <div className={classes.spacer}/>
                    <Tooltip title={t('common.downloadResult')}>
                        <IconButton
                            color={'default'}
                            size={'small'}
                            onClick={saveAsImage}>
                            <SaveAltIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            }
            {
                xAxis &&
                <div className={classes.indicesBox}>
                    {xAxisIndices}
                </div>
            }

            <div className={classes.cellBox}>
                <div className={classes.cellContent} ref={gridRef}>
                    {rows}
                </div>
            </div>
        </div>
    );
};
