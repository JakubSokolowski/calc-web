import { GridCellDisplayPreset } from './grid-cell-display-preset';
import { ReactElement, ReactText } from 'react';

export interface GridCellConfig {
  content: ReactText | ReactElement;
  preset?: GridCellDisplayPreset;
}
