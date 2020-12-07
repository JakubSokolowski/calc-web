export enum CellPosition {
  TopLeft = 'TopLeft',
  Top = 'Top',
  TopRight = 'TopRight',
  Right = 'Right',
  BottomRight = 'BottomRight',
  Bottom = 'Bottom',
  BottomLeft = 'BottomLeft',
  Left = 'Left'
}

export type PopoverPlacement = | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
