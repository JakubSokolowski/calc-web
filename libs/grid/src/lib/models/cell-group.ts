import { CellConfig } from './cell-config';
import { PopoverPlacement } from './cell-position';
import type { AnchorPosition } from './anchor-position';

export interface CellGroup<T = any> {
  cells: CellConfig[];
  contentProps?: T;
  contentBuilder?: any;
  anchorPosition?: AnchorPosition;
  popoverPlacement?: PopoverPlacement;
}
