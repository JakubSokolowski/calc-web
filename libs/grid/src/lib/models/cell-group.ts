import { CellConfig } from './cell-config';
import { CellPosition } from '../..';
import { PopoverPlacement } from './cell-position';

export interface CellGroup<T = any> {
  cells: CellConfig[];
  contentProps?: T;
  contentBuilder?: any;
  anchorPosition?: CellPosition;
  popoverPlacement?: PopoverPlacement;
}
