import { CellGroup, GridCellConfig, GridLine } from '@calc/grid';
import { AxisConfig } from './axis-config';

export interface HoverOperationGrid {
    values: GridCellConfig[][];
    groups: CellGroup[];
    lines: GridLine[];
    xAxis?: AxisConfig;
}
