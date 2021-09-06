import { BoothMcSorleyBuilder } from './booth-mc-sorley-builder';
import { CellGroup } from '@calc/grid';
import { SDConversionGroupResult, SDGroupDigit } from '@calc/calc-arithmetic';
import React from 'react';


export class BoothMcSorleyAltBuilder extends BoothMcSorleyBuilder {
    protected buildGroupForDigit(
        group: SDConversionGroupResult,
        output: SDGroupDigit,
        index: number,
        outputIndex: number
    ): CellGroup {
        const evenNumOfFractionDigits = Math.max(this.info.maxOperandsFractionDigits) % 2 === 0;

        if (evenNumOfFractionDigits) {
            return this.buildGroupA(group, output, index, outputIndex);
        } else {
            return this.buildGroupB(group, output, index, outputIndex);
        }
    }

}
