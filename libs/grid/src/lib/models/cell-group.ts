import { CellConfig } from './cell-config';
import { CellPosition } from '../..';
import { PopoverPlacement } from './cell-position';

export interface CellGroup {
  cells: CellConfig[];
  contentProps?: any;
  contentBuilder?: any;
  anchorPosition?: CellPosition;
  popoverPlacement?: PopoverPlacement;
}
