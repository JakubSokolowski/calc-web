import {
    AnchorPosition,
    CellConfig,
    CellGroup,
    CellPosition,
    eraseContentEnd,
    GridCellConfig,
    GridLabel,
    groupCellsInStraightLine,
    operandDigitsToCellConfig
} from '@calc/grid';
import { WithoutExtensionU2Last } from '../../last-multiplication-details/without-extension-u2-last';
import { MultiplicationOperand, MultiplicationRowResult } from '@calc/calc-arithmetic';
import { WithoutExtensionU2MultiplicationRow } from '../../without-extension-u2-row/without-extension-u2-multiplication-row';
import React from 'react';
import { WithoutExtensionBuilder } from './without-extension-builder';
import { Correction } from '../../correction/correction';

export class WithoutExtensionU2Builder extends WithoutExtensionBuilder {
    buildLabel(): GridLabel {
        const { hasMultiplicandComplement } = this.info;

        const superLabel = super.buildLabel();
        superLabel.labels[superLabel.labels.length - 2] = '';

        if (!hasMultiplicandComplement) {
            const correctionIndex = superLabel.labels.length - 1;
            superLabel.labels[correctionIndex] = 'C';
            superLabel.labels.push('');
            return superLabel;
        }

        const lastMultiplicationIndex = superLabel.labels.length - 3;
        const correctionIndex = lastMultiplicationIndex + 1;
        superLabel.labels[lastMultiplicationIndex] = this.complementLabelStr;
        superLabel.labels[correctionIndex] = 'C';

        return superLabel;
    }

    buildGroups(): CellGroup[] {
        return [
            ...super.buildGroups(),
            this.buildCorrectionGroup()
        ];
    }

    public getLastMultiplicationAnchorCell(): CellConfig {
        const {
            totalWidth,
            hasMultiplicandComplement,
            numMultiplicandDigits,
            numMultiplierDigits
        } = this.info;

        return {
            x: totalWidth - Math.max(numMultiplicandDigits, numMultiplierDigits) - 1,
            y: hasMultiplicandComplement ? 2 : 1
        };
    }


    protected buildCorrectionGroup(): CellGroup {
        const { totalWidth, totalHeight } = this.info;
        const correctionRowStart: CellConfig = { x: 0, y: totalHeight };
        const correctionRowEnd: CellConfig = { x: totalWidth - 1, y: totalHeight };

        return {
            cells: groupCellsInStraightLine(correctionRowStart, correctionRowEnd, false),
            contentBuilder: () => <Correction/>,
            contentProps: {},
            anchorPosition: CellPosition.Bottom,
            popoverPlacement: 'top'
        };
    }

    protected buildMultiplicandComplementGroup(): CellGroup {
        const { hasMultiplicandComplement } = this.info;
        const groupBase = this.getMultiplicandComplementGroupBase();

        const multiplierNegative = hasMultiplicandComplement;

        const contentBuilder = () => (
            <WithoutExtensionU2Last multiplierNegative={multiplierNegative}/>
        );

        return { ...groupBase, contentBuilder };
    }

    protected getMultiplicandComplementGroupCells(): CellConfig[] {
        const { hasMultiplicandComplement } = this.info;
        const multiplierNegative = hasMultiplicandComplement;

        const anchor = this.getLastMultiplicationAnchorCell();
        if (!multiplierNegative) return [anchor, ...this.getComplementAdditionRow()];

        return [anchor, ...this.getComplementRow(), ...this.getComplementAdditionRow()];
    }

    protected buildRowMultiplicationGroups(): CellGroup[] {
        const { stepResults } = this.result;
        const withoutLastMultiplierResult = [...stepResults];
        withoutLastMultiplierResult.pop();

        return withoutLastMultiplierResult.map((res, index) => {
            return this.buildRowMultiplicationGroup(res, index);
        });
    }

    protected buildMultiplicandComplementRow(): GridCellConfig[] {
        const digits = this.result
            .multiplicandComplement
            .complement
            .asDigits()
            .filter(d => !d.isComplementExtension);

        return operandDigitsToCellConfig(digits, this.info, this.base);
    }

    protected buildAdditionOperandRows(): GridCellConfig[][] {
        const operands = this.result.addition.operands;
        return operands.map((operandDigits: MultiplicationOperand[], index) => {
            if (index === operands.length - 1) {
                const cells: GridCellConfig[] = operandDigitsToCellConfig(operandDigits, this.info, this.base);
                const erased = eraseContentEnd(cells, index - 1);
                erased[0].content = '+';
                return erased;
            }

            const cells: GridCellConfig[] = operandDigitsToCellConfig(operandDigits.filter(d => !d.isComplementExtension), this.info, this.base);
            return eraseContentEnd(cells, index);
        });
    }

    protected shouldPreventGroupTriggerOnMultiplicationRowHover(): boolean {
        return false;
    }

    protected rowMultiplicationContentBuilder(): (result: MultiplicationRowResult) => any {
        return (result: MultiplicationRowResult) => <WithoutExtensionU2MultiplicationRow result={result}/>;
    }

    protected rowGroupAnchorPosition(): AnchorPosition {
        return CellPosition.Bottom;
    }

    protected getComplementAdditionRow(): CellConfig[] {
        const { totalWidth, totalHeight } = this.info;
        const resultRowStart: CellConfig = { x: 0, y: totalHeight - 1 };
        const resultRowEnd: CellConfig = { x: totalWidth - 1, y: totalHeight - 1 };
        return groupCellsInStraightLine(resultRowStart, resultRowEnd);
    }
}
