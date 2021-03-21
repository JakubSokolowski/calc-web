import { DefaultBuilder } from './default-builder';
import {
    CellConfig,
    CellGroup,
    GridCellConfig,
    GridLabel,
    groupCellsInStraightLine,
    operandDigitsToCellConfig
} from '@calc/grid';

export class ComplementMultiplicationBuilder extends DefaultBuilder {
    protected get complementLabelStr() {
        return `\\overline{${this.multiplicandLabelStr}}`;
    }

    public getLastMultiplicationAnchorCell(): CellConfig {
        const {
            totalWidth,
            hasMultiplicandComplement,
            numMultiplierDigits,
            numMultiplierFractionalDigits,
            numMultiplicandFractionalDigits
        } = this.info;

        // Multiplier fraction part might have been extended to match
        // multiplicand, so the actual num of operands might higher
        // move left by num of cells equal to fractionDiff
        const fractionDiff = numMultiplierFractionalDigits + numMultiplicandFractionalDigits;

        return {
            x: totalWidth - (numMultiplierDigits + fractionDiff) - 1,
            y: hasMultiplicandComplement ? 2 : 1
        };
    }

    buildLabel(): GridLabel {
        const { hasMultiplicandComplement, totalHeight } = this.info;

        if (!hasMultiplicandComplement) return super.buildLabel();

        const labels = Array(totalHeight + 2).fill('');

        const multiplicandComplementIndex = 0;
        const multiplicandIndex = 1;
        const multiplierIndex = 2;

        labels[multiplicandComplementIndex] = this.complementLabelStr;
        labels[multiplicandIndex] = this.multiplicandLabelStr;
        labels[multiplierIndex] = this.multiplierLabelStr;

        return { labels };
    }

    buildValues(): GridCellConfig[][] {
        const { hasMultiplicandComplement } = this.info;
        const values = super.buildValues();

        if (!hasMultiplicandComplement) return values;

        return [this.buildMultiplicandComplementRow(), ...values];
    }

    protected buildMultiplicandComplementRow(): GridCellConfig[] {
        const digits = this.result
            .multiplicandComplement
            .complement
            .asDigits();

        return operandDigitsToCellConfig(digits, this.info, this.base);
    }

    protected getMultiplierRowStartOffset(): number {
        return this.info.hasMultiplicandComplement ? 1 : 0;
    }

    protected getMultiplicandComplementGroupCells(): CellConfig[] {
        const { hasMultiplicandComplement } = this.info;
        const multiplierNegative = hasMultiplicandComplement;

        const anchor = this.getLastMultiplicationAnchorCell();
        if (!multiplierNegative) return [anchor];

        return [anchor, ...this.getComplementRow(), ...this.getComplementAdditionRow()];
    }

    protected getMultiplicandComplementGroupBase(): CellGroup {
        const anchorCell = this.getLastMultiplicationAnchorCell();
        const groupCells = this.getMultiplicandComplementGroupCells();

        return {
            anchorPosition: anchorCell,
            cells: groupCells,
            contentProps: {},
            popoverPlacement: 'bottom'
        };
    }

    protected getComplementRow(): CellConfig[] {
        const { totalWidth } = this.info;
        const complementRowStart: CellConfig = { x: 0, y: 0 };
        const complementRowEnd: CellConfig = { x: totalWidth - 1, y: 0 };
        return groupCellsInStraightLine(complementRowStart, complementRowEnd);
    }

    protected getComplementAdditionRow(): CellConfig[] {
        const { totalWidth, totalHeight } = this.info;
        const resultRowStart: CellConfig = { x: 0, y: totalHeight };
        const resultRowEnd: CellConfig = { x: totalWidth - 1, y: totalHeight };
        return groupCellsInStraightLine(resultRowStart, resultRowEnd);
    }
}
