import { DivisionPositionResult, DivisionResult } from '@calc/calc-arithmetic';
import { CellConfig, CellGroup } from '@calc/grid';
import React from 'react';
import { DivisionResultMeta, extractDivisionResultMeta } from './divison-meta';
import { SubtractionRowCells, SubtractionRows } from './models';
import { DivisionStepResultDetails } from '../division-step-details/division-step-details';

export function buildGroups(result: DivisionResult, rows: SubtractionRows): CellGroup[] {
    const meta = extractDivisionResultMeta(result);
    return [
        ...buildStepResultsGroups(result, meta, rows)
    ];
}

function buildStepResultsGroups(result: DivisionResult, meta: DivisionResultMeta, rows: SubtractionRows): CellGroup[] {
    return result.stepResults.map((r, idx) => buildStepResultGroup(result, r, meta, rows.rowResults[idx]));
}

function buildStepResultGroup(result: DivisionResult, stepResult: DivisionPositionResult, meta: DivisionResultMeta,row: SubtractionRowCells): CellGroup {
    const leftOffset = meta.resultRowLeftOffset;
    const resultCell: CellConfig = { x: leftOffset + stepResult.divisionIndex + 1, y: 0 };

    const lastCell = row.cellsBox[row.cellsBox.length -1];

    return {
        cells: [resultCell, ...row.cellsBox],
        contentBuilder: (res: DivisionPositionResult) => <DivisionStepResultDetails result={res} divisor={result.numberOperands[1]}/>,
        anchorPosition: lastCell,
        popoverPlacement: 'right',
        contentProps: stepResult
    };
}

