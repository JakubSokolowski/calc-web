import { LineType } from './line-type';

export interface GridLine {
  type: LineType;
  index: number;
  span?: LineDefinition;
}

export interface LineDefinition {
    from?: number;
    to?: number;
}
