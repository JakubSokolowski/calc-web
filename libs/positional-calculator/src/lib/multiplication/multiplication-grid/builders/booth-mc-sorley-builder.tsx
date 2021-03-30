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

        if(output.isPaddingDigit) {
            return {
                cells: []
            }
        }
        const rowCellsThatAreMultiplied = this.getCellsToAdd(output);
        const { totalWidth } = this.info;
        const yOffset = this.getMultiplierRowStartOffset();
        const groupOffset = 2 * index + 1;

        const isPartialOutputGroup = group.output.length === 1;


        const trigger1: CellConfig = {
            x: totalWidth - groupOffset,
            y: 1 + yOffset,
            preventGroupTrigger: outputIndex === 0 && !isPartialOutputGroup
        };

        const trigger2: CellConfig = {
            x: totalWidth - groupOffset - 1,
            y: 1 + yOffset,
            preventGroupTrigger: outputIndex === 1 && !isPartialOutputGroup
        };

        const rowOffset = isPartialOutputGroup ? 0 : outputIndex === 0 ? 1 : 0;
        const rowIndex = 2* index + rowOffset;
        const resultRow = this.buildMultiplyByDigitResultRow(rowIndex);
        const sdGroupCells = this.getMultiplierSDGroupCells(trigger1, group);

        return {
            cells: [
                ...rowCellsThatAreMultiplied,
                ...resultRow,
                ...sdGroupCells,
                trigger1,
                trigger2,
            ],
            contentProps: {},
            popoverPlacement: index === 0 ? 'right' : 'left',
            anchorPosition: index === 0 ? trigger1 : trigger2,
            contentBuilder: () => <BoothMcSorleyGroupResult result={group} outputIndex={outputIndex} />,
        };
    }

    protected getMultiplierSDGroupCells(
        trigger: CellConfig,
        group: SDConversionGroupResult
    ): CellConfig[] {
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
}
