import { CellGroup, GridCellConfig, GridLine } from '@calc/ui';

export interface HoverOperationGrid {
    values: GridCellConfig[][];
    groups: CellGroup[];
    lines: GridLine[];
}
