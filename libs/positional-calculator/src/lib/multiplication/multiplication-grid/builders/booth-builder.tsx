import {
    CellConfig,
    CellGroup,
    GridCellConfig,
    GridLabel,
    GridLine,
    groupCellsInStraightLine,
    LineType,
    operandDigitsToCellConfig
} from '@calc/grid';
import React from 'react';
import { ComplementMultiplicationBuilder } from './complement-multiplication-builder';
import { Digit, SDConversionGroupResult, SDConversionResult } from '@calc/calc-arithmetic';
import { flatten } from 'lodash';
import { BoothGroupResult } from '../../sd-group-result/booth-group-result';

export class BoothBuilder extends ComplementMultiplicationBuilder {

    protected get multiplierSDLabelStr() {
        return 'SD';
    };

    buildValues(): GridCellConfig[][] {
        return [
            this.buildMultiplicandComplementRow(),
            ...this.buildOperandRows(),
            this.buildSDRow(),
            ...this.buildAdditionOperandRows(),
            this.buildResultRow()
        ];
    }

    buildLines(): GridLine[] {
        return [
            this.buildSdSeparatorLine(),
            ...super.buildLines()
        ];
    }

    buildSdSeparatorLine(): GridLine {
        return {
            index: 2,
            type: LineType.Horizontal
        };
    }

    buildGroups(): CellGroup[] {
        return [
            ...super.buildGroups(),
            ...this.buildSDMultiplicationGroups()]
            ;
    }

    buildLabel(): GridLabel {
        const labelConfig = super.buildLabel();
        const multiplierSDIndex = 3;
        labelConfig.labels[multiplierSDIndex] = this.multiplierSDLabelStr;

        return labelConfig;
    }

    protected getMultiplierRowStartOffset(): number {
        return 2;
    }

    protected getOffsetForHorizontalLines() {
        return 2;
    }

    protected buildSDRow(): GridCellConfig[] {
        const digits = this.result.sdConversion.output || [];
        return operandDigitsToCellConfig([...digits].reverse(), this.info, this.base);
    }

    protected buildRowMultiplicationGroups(): CellGroup[] {
        return [];
    }

    protected buildSDMultiplicationGroups(): CellGroup[] {
        const sdResult = this.result.sdConversion as SDConversionResult;
        return flatten([...sdResult.groups].reverse().map((group, index) => this.buildGroupsForEachGroupOutputDigit(group, index)));
    }

    protected buildGroupsForEachGroupOutputDigit(group: SDConversionGroupResult, index: number): CellGroup[] {
        return group.output.map(outputDigit => this.buildGroupForDigit(group, outputDigit, index));
    }

    protected buildGroupForDigit(group: SDConversionGroupResult, output: Digit, index: number): CellGroup {
        const rowCellsThatAreMultiplied = this.getCellsToAdd(output);
        const { totalWidth } = this.info;
        const yOffset = this.getMultiplierRowStartOffset();
        const trigger: CellConfig = { x: totalWidth - index - 1, y: 1 + yOffset };
        const resultRow = this.buildMultiplyByDigitResultRow(index);
        const sdGroupCells = this.getMultiplierSDGroupCells(trigger, group);

        return {
            cells: [
                ...rowCellsThatAreMultiplied,
                ...resultRow,
                ...sdGroupCells,
                trigger
            ],
            contentProps: {},
            popoverPlacement: index === 0 ? 'right' : 'left',
            anchorPosition: trigger,
            contentBuilder: () => <BoothGroupResult result={group}/>
        };
    }

    protected shouldPreventGroupTriggerOnMultiplicationRowHover(): boolean {
        return false;
    }

    protected getMultiplierSDGroupCells(trigger: CellConfig, group: SDConversionGroupResult): CellConfig[] {
        const groupStart: CellConfig = {
            x: trigger.x,
            y: trigger.y - 1
        };
        const groupEnd: CellConfig = {
            x: trigger.x + group.input.length - 1,
            y: trigger.y - 1
        };

        return groupCellsInStraightLine(
            groupStart,
            groupEnd,
            true
        );
    }

    protected getCellsToAdd(resultDigit: Digit): CellConfig[] {
        switch (resultDigit.valueInDecimal) {
            case 0:
                return this.getZeroCells();
            case 1:
                return this.getMultiplicandRowCells();
            case -1:
                return this.getMultiplicandComplementRowCells();
            default:
                throw new Error(`Unsupported value: ${resultDigit.valueInDecimal}`);
        }
    }

    protected buildMultiplicandComplementRow(): GridCellConfig[] {
        const digits = this.result
            .multiplicandComplement
            .complement
            .asDigits()
            .filter(d => !d.isComplementExtension);

        return operandDigitsToCellConfig(digits, this.info, this.base);
    }

    private getMultiplicandComplementRowCells(): CellConfig[] {
        const { totalWidth } = this.info;
        const multiplicandRowStart: CellConfig = { x: 0, y: 0 };
        const multiplicandRowEnd: CellConfig = { x: totalWidth - 1, y: 0 };
        return groupCellsInStraightLine(
            multiplicandRowStart,
            multiplicandRowEnd,
            true
        );
    }

    private getMultiplicandRowCells(): CellConfig[] {
        const { totalWidth } = this.info;
        const multiplicandRowStart: CellConfig = { x: 0, y: 1 };
        const multiplicandRowEnd: CellConfig = { x: totalWidth - 1, y: 1 };
        return groupCellsInStraightLine(
            multiplicandRowStart,
            multiplicandRowEnd,
            true
        );
    }

    private getZeroCells(): CellConfig[] {
        return [];
    }
}
