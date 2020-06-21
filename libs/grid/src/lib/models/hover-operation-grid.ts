import { CellGroup, GridCellConfig, GridLine } from '@calc/grid';

export interface HoverOperationGrid {
    values: GridCellConfig[][];
    groups: CellGroup[];
    lines: GridLine[];
}
