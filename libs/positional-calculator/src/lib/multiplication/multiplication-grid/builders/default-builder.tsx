import { GridBuilder } from './grid-builder';
import {
    AnchorPosition,
    buildColumnGroupsCoords,
    CellConfig,
    CellGroup,
    CellPosition,
    digitsToCellConfig,
    eraseContentEnd,
    GridCellConfig,
    GridLabel,
    GridLine,
    GridSpan,
    groupCellsInStraightLine,
    LineDefinition,
    LineType,
    operandDigitsToCellConfig,
    padWithEmptyCells
} from '@calc/grid';
import {
    AdditionPositionResult,
    MultiplicationOperand,
    MultiplicationPositionResult,
    MultiplicationRowResult
} from '@calc/calc-arithmetic';
import { AddAtPositionHoverContent } from '../../../addition/addition-position-result/add-at-position-hover-content';
import { MultiplyRowDetails } from '../../multiply-row-result/multiply-row-result';
import { MultiplyPositionDetails } from '../../multiply-position-result/multiply-position-details';
import React from 'react';
import { flatten } from '@calc/utils';

export class DefaultBuilder extends GridBuilder {
    protected get multiplicandLabelStr() {
        return 'M';
    }

    protected get multiplierLabelStr() {
        return 'm';
    }

    buildGroups(): CellGroup[] {
        return [
            this.buildMultiplicandComplementGroup(),
            ...this.buildRowMultiplicationGroups(),
            ...this.buildAdditionGroups(),
            ...flatten(this.buildDigitMultiplicationGroups())
        ];
    }

    buildLines(): GridLine[] {
        const lines: GridLine[] = [];

        const { operands, addition: { operands: additionOperands } } = this.result;
        const { hasMultiplicandComplement, totalWidth, numMultiplicandFractionalDigits, numMultiplierFractionalDigits } = this.info;

        const labelSeparatorLine: GridLine = { type: LineType.Vertical, index: totalWidth - 1 };
        lines.push(labelSeparatorLine);

        if (hasMultiplicandComplement) {
            const complementSeparatorIndex = 0;
            lines.push({ type: LineType.Horizontal, index: complementSeparatorIndex });
        }

        const offset = this.getOffsetForHorizontalLines();

        const multiplicationSeparatorIndex = operands.length - 1 + offset;
        lines.push({ type: LineType.Horizontal, index: multiplicationSeparatorIndex });

        const resultIndex = operands.length + additionOperands.length - 1 + offset;
        lines.push({ type: LineType.Horizontal, index: resultIndex });

        const operandFractionDigitsMax = Math.max(numMultiplicandFractionalDigits, numMultiplierFractionalDigits);

        if (operandFractionDigitsMax > 0) {
            const verticalLineIndex = totalWidth - operandFractionDigitsMax - 1;
            const span: LineDefinition = { from: 0, to: 1 + offset };
            lines.push({ type: LineType.Vertical, index: verticalLineIndex, span });

            const resultSepIndex = totalWidth - operandFractionDigitsMax * 2 - 1;
            const resultSepSpan: LineDefinition = { from: resultIndex + 1, to: resultIndex + 2 };
            lines.push({ type: LineType.Vertical, index: resultSepIndex, span: resultSepSpan });
        }

        return lines;
    }

    protected getOffsetForHorizontalLines(): number {
        const { hasMultiplicandComplement } = this.info;
        return hasMultiplicandComplement ? 1 : 0;
    }

    buildLabel(): GridLabel {
        const { totalHeight } = this.info;

        const labels = Array(totalHeight + 1).fill('');

        const multiplicandIndex = 0;
        const multiplierIndex = 1;
        labels[multiplicandIndex] = this.multiplicandLabelStr;
        labels[multiplierIndex] = this.multiplierLabelStr;

        return { labels };
    }

    buildDigitMultiplicationGroups(): CellGroup[][] {
        const { stepResults } = this.result;
        return stepResults.map((res, rowIndex) => {
            return res.rowPositionResults.map((rowRes, posIndex) => {
                return this.buildDigitMultiplicationGroup(rowRes, rowIndex, posIndex);
            });
        });
    }

    buildDigitMultiplicationGroup(stepResult: MultiplicationPositionResult, rowIndex: number, positionIndex: number): CellGroup {
        const { totalWidth } = this.info;

        const offset = this.getMultiplierRowStartOffset();


        const trigger: CellConfig = {
            x: totalWidth - 1 - positionIndex - rowIndex,
            y: rowIndex + 2 + offset
        };

        const multiplier: CellConfig = {
            x: totalWidth - 1 - rowIndex,
            y: 1 + offset,
            preventGroupTrigger: true
        };

        const multiplicand: CellConfig = {
            x: totalWidth - 1 - positionIndex,
            y: 0 + offset,
            preventGroupTrigger: true
        };

        return {
            cells: [trigger, multiplicand, multiplier],
            anchorPosition: CellPosition.Bottom,
            contentProps: stepResult,
            contentBuilder: (result: MultiplicationPositionResult) => <MultiplyPositionDetails result={result}/>,
            popoverPlacement: 'bottom'
        };
    }

    buildValues(): GridCellConfig[][] {
        return [
            ...this.buildOperandRows(),
            ...this.buildAdditionOperandRows(),
            this.buildResultRow()
        ];
    }

    protected buildAdditionOperandRows(): GridCellConfig[][] {
        const operands = this.result.addition.operands;
        return operands.map((operandDigits: MultiplicationOperand[], index) => {
            const cells: GridCellConfig[] = operandDigitsToCellConfig(operandDigits, this.info, this.base);
            const erased = eraseContentEnd(cells, index);
            if (index === operands.length - 1) erased[0].content = '+';
            return erased;
        });
    }

    protected buildOperandRows(): GridCellConfig[][] {
        const operands = this.result.operands;
        return operands.map((operandDigits: MultiplicationOperand[], index) => {
            const cells: GridCellConfig[] = operandDigitsToCellConfig(operandDigits, this.info, this.base);
            if (index === operands.length - 1) cells[0].content = '*';
            return cells;
        });
    }


    protected buildResultRow(): GridCellConfig[] {
        const { resultDigits } = this.result;
        const { totalWidth } = this.info;
        const resultDigitsCells = digitsToCellConfig(resultDigits);
        return padWithEmptyCells(resultDigitsCells, totalWidth, 'Left');
    }

    protected buildMultiplicandComplementGroup(): CellGroup {
        return {
            cells: []
        };
    }

    protected buildRowMultiplicationGroups(): CellGroup[] {
        const { stepResults } = this.result;

        return stepResults.map((res, index) => {
            return this.buildRowMultiplicationGroup(res, index);
        });
    }

    protected buildAdditionGroups(): CellGroup[] {
        const { totalWidth } = this.info;
        const yOffset = this.getMultiplierRowStartOffset();
        const { stepResults, operands } = this.result.addition;

        const results = [...stepResults];

        // This fixes some cases when there is more addition position results than
        // addition columns, the results are stacked from left to right and
        // these will leave one addition column without result on hover, so to fix
        // this, remove the additional results
        if (results.length > totalWidth) {
            const diff = results.length - totalWidth;
            results.splice(-diff);
        }

        const span: GridSpan = {
            startX: 0,
            endX: totalWidth,
            startY: 0,
            endY: operands.length + 1
        };

        return buildColumnGroupsCoords(
            span,
            [...results].reverse(),
            2 + yOffset,
            (value: AdditionPositionResult) => <AddAtPositionHoverContent positionResult={value}/>,
            cell => cell.y < 2 + yOffset + operands.length
        );
    }

    protected getMultiplierRowStartOffset(): number {
        return 0;
    }

    protected rowMultiplicationContentBuilder(): (result: MultiplicationRowResult) => any {
        return (result: MultiplicationRowResult) => <MultiplyRowDetails result={result}/>;
    }

    protected shouldPreventGroupTriggerOnMultiplicationRowHover(): boolean {
        return true;
    }

    protected rowGroupAnchorPosition(): AnchorPosition {
        return CellPosition.TopRight;
    }

    protected buildRowMultiplicationGroup(result: MultiplicationRowResult, index: number): CellGroup {
        const yOffset = this.getMultiplierRowStartOffset();
        const { totalWidth } = this.info;

        const trigger: CellConfig = { x: totalWidth - index - 1, y: 1 + yOffset };

        const multiplicandRowStart: CellConfig = { x: 0, y: 0 + yOffset };
        const multiplicandRowEnd: CellConfig = { x: totalWidth - 1, y: 0 + yOffset };
        const multiplicandRow = groupCellsInStraightLine(
            multiplicandRowStart,
            multiplicandRowEnd,
            true
        );

        const resultRow = this.buildMultiplyByDigitResultRow(index);

        return {
            cells: [trigger, ...multiplicandRow, ...resultRow],
            contentBuilder: this.rowMultiplicationContentBuilder(),
            anchorPosition: this.rowGroupAnchorPosition(),
            contentProps: result
        };
    }

    protected buildMultiplyByDigitResultRow(index: number): CellConfig[] {
        const yOffset = this.getMultiplierRowStartOffset();
        const { totalWidth } = this.info;

        const resultRowStart: CellConfig = { x: 0, y: index + 2 + yOffset };
        const resultRowEnd: CellConfig = { x: totalWidth - 1, y: index + 2 + yOffset };
        return groupCellsInStraightLine(
            resultRowStart,
            resultRowEnd,
            this.shouldPreventGroupTriggerOnMultiplicationRowHover()
        );
    }

}
