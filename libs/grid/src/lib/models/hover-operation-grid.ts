import { CellGroup, GridCellConfig, GridLine } from '@calc/grid';
import { AxisConfig } from './axis-config';
import { GridLabel } from './grid-label';

export interface HoverOperationGrid {
    values: GridCellConfig[][];
    groups: CellGroup[];
    lines: GridLine[];
    xAxis?: AxisConfig;
    label?: GridLabel;
}
