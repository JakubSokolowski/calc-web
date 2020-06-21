import { CellCoords } from './cell-coords';
import { CellPosition } from '../..';

export interface CellGroup {
  cells: CellCoords[];
  contentProps?: any;
  contentBuilder?: any;
  popoverPlacement?: CellPosition;
}
