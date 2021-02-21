import { extractMultiplicationResultMeta, MultiplicationResultMeta } from '../multiplication-result-meta';
import { MultiplicationResult } from '@calc/calc-arithmetic';
import { CellGroup, GridCellConfig, GridLabel, GridLine, HoverOperationGrid } from '@calc/grid';

export class GridBuilder {
    info: MultiplicationResultMeta;
    result: MultiplicationResult;

    constructor(result: MultiplicationResult) {
        this.info = extractMultiplicationResultMeta(result);
        this.result = result;
    }

    buildGrid(): HoverOperationGrid {
        return {
            groups: this.buildGroups(),
            label: this.buildLabel(),
            values: this.buildValues(),
            lines: this.buildLines(),
        }
    }

    buildGroups(): CellGroup[] {
        throw new Error('Subclass responsibility');
    }

    buildValues(): GridCellConfig[][] {
        throw new Error('Subclass responsibility');
    }

    get base() {
        return this.result.resultDigits[0].base;
    }

    buildLines(): GridLine[] {
        throw new Error('Subclass responsibility');
    }

    buildLabel(): GridLabel {
        throw new Error('Subclass responsibility');
    }
}
