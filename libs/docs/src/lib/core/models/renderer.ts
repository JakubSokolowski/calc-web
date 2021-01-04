import { ReactElement } from 'react';

export type OperationRenderer = (params: Record<string, any>) => ReactElement;
export type RendererMapping = Record<string, OperationRenderer>;
