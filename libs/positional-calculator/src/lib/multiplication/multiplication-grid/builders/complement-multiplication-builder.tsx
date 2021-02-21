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

    public getAnchorCell(): CellConfig {
        const { totalWidth, hasMultiplicandComplement, numMultiplierDigits } = this.info;
        return {
            x: totalWidth - numMultiplierDigits - 1,
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

        const digits = this.result
            .multiplicandComplement
            .complement
            .asDigits();

        const multiplicandComplementRow = operandDigitsToCellConfig(digits, this.info, this.base);

        return [multiplicandComplementRow, ...values];
    }

    protected getComplementOffset(): number {
        return this.info.hasMultiplicandComplement ? 1 : 0;
    }

    protected getGroupCells(): CellConfig[] {
        const { hasMultiplicandComplement } = this.info;
        const multiplierNegative = hasMultiplicandComplement;

        const anchor = this.getAnchorCell();
        if (!multiplierNegative) return [anchor];

        return [anchor, ...this.getComplementRow(), ...this.getResultRow()];
    }

    protected getGroupBase(): CellGroup {
        const anchorCell = this.getAnchorCell();
        const groupCells = this.getGroupCells();

        return {
            anchorPosition: anchorCell,
            cells: groupCells,
            contentProps: {},
            popoverPlacement: 'bottom'
        };
    }

    private getComplementRow(): CellConfig[] {
        const { totalWidth } = this.info;
        const complementRowStart: CellConfig = { x: 0, y: 0 };
        const complementRowEnd: CellConfig = { x: totalWidth - 1, y: 0 };
        return groupCellsInStraightLine(complementRowStart, complementRowEnd);
    }

    private getResultRow(): CellConfig[] {
        const { totalWidth, totalHeight } = this.info;
        const resultRowStart: CellConfig = { x: 0, y: totalHeight };
        const resultRowEnd: CellConfig = { x: totalWidth - 1, y: totalHeight };
        return groupCellsInStraightLine(resultRowStart, resultRowEnd);
    }
}
