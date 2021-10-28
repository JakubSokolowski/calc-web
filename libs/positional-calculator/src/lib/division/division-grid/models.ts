import { CellConfig, GridCellConfig } from '@calc/grid';

export interface SubtractionRowCells {
    cells: GridCellConfig[][];
    maxCellWithContentIndex: number;
    cellsBox: CellConfig[];
}

export interface SubtractionRows {
    rowResults: SubtractionRowCells[],
    allCells: GridCellConfig[][]
}
