import { MultiplicationResult, MultiplicationType } from '@calc/calc-arithmetic';
import { HoverOperationGrid } from '@calc/grid';
import React from 'react';
import { GridBuilder } from './builders/grid-builder';
import { DefaultBuilder } from './builders/default-builder';
import { WithExtensionBuilder } from './builders/with-extension-builder';
import { WithoutExtensionBuilder } from './builders/without-extension-builder';

export function buildMultiplicationGrid(result: MultiplicationResult): HoverOperationGrid {
    return getBuilder(result).buildGrid()
}

function getBuilder(result: MultiplicationResult): GridBuilder {
    switch (result.algorithmType) {
        case MultiplicationType.Default:
            return new DefaultBuilder(result);
        case MultiplicationType.WithExtension:
            return new WithExtensionBuilder(result);
        case MultiplicationType.WithoutExtension:
            return new WithoutExtensionBuilder(result);
        default:
            throw new Error('not implemented');
    }
}


