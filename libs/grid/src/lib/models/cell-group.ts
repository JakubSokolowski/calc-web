import { CellConfig } from './cell-config';
import { CellPosition } from '../..';
import { PopoverPlacement } from './cell-position';

export type AnchorPosition = CellPosition | CellConfig | undefined;

export interface CellGroup<T = any> {
  cells: CellConfig[];
  contentProps?: T;
  contentBuilder?: any;
  anchorPosition?: AnchorPosition;
  popoverPlacement?: PopoverPlacement;
}
