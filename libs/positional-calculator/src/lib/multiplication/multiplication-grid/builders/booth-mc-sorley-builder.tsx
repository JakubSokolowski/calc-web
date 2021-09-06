import { BoothBuilder } from './booth-builder';
import { SDConversionGroupResult, SDGroupDigit } from '@calc/calc-arithmetic';
import { CellConfig, CellGroup, groupCellsInStraightLine } from '@calc/grid';
import React from 'react';
import { BoothMcSorleyGroupResult } from '../../sd-group-result/booth-mc-sorley-group-result';

export class BoothMcSorleyBuilder extends BoothBuilder {
    protected buildGroupForDigit(
        group: SDConversionGroupResult,
        output: SDGroupDigit,
        index: number,
        outputIndex: number
    ): CellGroup {
        const evenNumOfFractionDigits = Math.max(this.info.maxOperandsFractionDigits) % 2 === 0;

        if (evenNumOfFractionDigits) {
            return this.buildGroupB(group, output, index, outputIndex);
        } else {
            return this.buildGroupA(group, output, index, outputIndex);
        }
    }

    protected getMultiplierSDGroupCells(trigger: CellConfig, group: SDConversionGroupResult): CellConfig[] {
        const groupStart: CellConfig = {
            x: trigger.x - 1,
            y: trigger.y - 1,
        };
        const groupEnd: CellConfig = {
            x: trigger.x + group.input.length - 2,
            y: trigger.y - 1,
        };

        return groupCellsInStraightLine(groupStart, groupEnd, true);
    }

    protected buildGroupA(
        group: SDConversionGroupResult,
        output: SDGroupDigit,
        index: number,
        outputIndex: number
    ): CellGroup {
        if (output.isPaddingDigit) {
            return {
                cells: [],
            };
        }

        const { totalWidth } = this.info;
        const yOffset = this.getMultiplierRowStartOffset();
        const groupOffset = 2 * index;

        const trigger1: CellConfig = {
            x: totalWidth - groupOffset,
            y: 1 + yOffset,
            preventGroupTrigger: index === 0 ? false : outputIndex === 0,
        };

        const trigger2: CellConfig = {
            x: totalWidth - groupOffset - 1,
            y: 1 + yOffset,
            preventGroupTrigger: index === 0 ? false : outputIndex === 1,
        };

        const rowIndex = index === 0 ? 0 : 2 * index - outputIndex;
        const resultRow = this.buildMultiplyByDigitResultRow(rowIndex);
        const rowCellsThatAreMultiplied = this.getCellsToAdd(output);
        const sdGroupCells = this.getMultiplierSDGroupCells(trigger1, group);

        return {
            cells: [...rowCellsThatAreMultiplied, ...resultRow, ...sdGroupCells, trigger1, trigger2],
            contentProps: {},
            popoverPlacement: index === 0 ? 'right' : 'left',
            anchorPosition: trigger2,
            contentBuilder: () => <BoothMcSorleyGroupResult result={group} outputIndex={outputIndex} />,
        };
    }

    protected buildGroupB(
        group: SDConversionGroupResult,
        output: SDGroupDigit,
        index: number,
        outputIndex: number
    ): CellGroup {
        const rowCellsThatAreMultiplied = this.getCellsToAdd(output);
        const { totalWidth } = this.info;
        const yOffset = this.getMultiplierRowStartOffset();
        const groupOffset = 2 * index + 1;

        const isPartialOutputGroup = group.output.length === 1;

        const trigger1: CellConfig = {
            x: totalWidth - groupOffset,
            y: 1 + yOffset,
            preventGroupTrigger: outputIndex === 0 && !isPartialOutputGroup,
        };

        const trigger2: CellConfig = {
            x: totalWidth - groupOffset - 1,
            y: 1 + yOffset,
            preventGroupTrigger: outputIndex === 1 && !isPartialOutputGroup,
        };

        const rowOffset = isPartialOutputGroup ? 0 : outputIndex === 0 ? 1 : 0;
        const rowIndex = 2 * index + rowOffset;
        const resultRow = this.buildMultiplyByDigitResultRow(rowIndex);
        const sdGroupCells = this.getMultiplierSDGroupCells(trigger1, group);

        return {
            cells: [...rowCellsThatAreMultiplied, ...resultRow, ...sdGroupCells, trigger1, trigger2],
            contentProps: {},
            popoverPlacement: index === 0 ? 'right' : 'left',
            anchorPosition: index === 0 ? trigger1 : trigger2,
            contentBuilder: () => <BoothMcSorleyGroupResult result={group} outputIndex={outputIndex} />,
        };
    }
}
