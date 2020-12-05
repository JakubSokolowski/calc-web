import { CellConfig } from './cell-config';
import { CellPosition } from '../..';

export interface CellGroup {
  cells: CellConfig[];
  contentProps?: any;
  contentBuilder?: any;
  popoverPlacement?: CellPosition;
}
