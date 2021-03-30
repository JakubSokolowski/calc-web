import React from 'react';
import {
    MultiplicationResult,
    MultiplicationType,
} from '@calc/calc-arithmetic';
import { HoverOperationGrid } from '@calc/grid';
import { GridBuilder } from './builders/grid-builder';
import { DefaultBuilder } from './builders/default-builder';
import { WithExtensionBuilder } from './builders/with-extension-builder';
import { WithoutExtensionBuilder } from './builders/without-extension-builder';
import { WithoutExtensionU2Builder } from './builders/without-extension-u2-builder';
import { BoothBuilder } from './builders/booth-builder';
import { BoothMcSorleyBuilder } from './builders/booth-mc-sorley-builder';

export function buildMultiplicationGrid(
    result: MultiplicationResult
): HoverOperationGrid {
    return getBuilder(result).buildGrid();
}

function getBuilder(result: MultiplicationResult): GridBuilder {
    switch (result.algorithmType) {
        case MultiplicationType.Default:
            return new DefaultBuilder(result);
        case MultiplicationType.WithExtension:
            return new WithExtensionBuilder(result);
        case MultiplicationType.WithoutExtension:
            if (isBinaryMultiplication(result))
                return new WithoutExtensionU2Builder(result);
            return new WithoutExtensionBuilder(result);
        case MultiplicationType.BoothMcSorley:
            return new BoothMcSorleyBuilder(result);
        case MultiplicationType.Booth:
            return new BoothBuilder(result);
        default:
            throw new Error(
                `Multiplication builder: ${result.algorithmType} not implemented`
            );
    }
}

function isBinaryMultiplication(result: MultiplicationResult) {
    return (
        result.resultDigits[0].base === 2 ||
        result.resultDigits[0].base.toString() === '2'
    );
}
