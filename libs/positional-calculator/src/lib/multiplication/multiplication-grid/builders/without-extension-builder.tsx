import { ComplementMultiplicationBuilder } from './complement-multiplication-builder';
import { CellConfig, CellGroup, GridLabel } from '@calc/grid';
import { WithoutExtensionLast } from '../../last-multiplication-details/without-extension-last';
import React from 'react';

export class WithoutExtensionBuilder extends ComplementMultiplicationBuilder {
    getLastMultiplicationAnchorCell(): CellConfig {
        const { totalWidth, hasMultiplicandComplement, numMultiplierDigits } = this.info;
        return {
            x: totalWidth - numMultiplierDigits,
            y: hasMultiplicandComplement ? 2 : 1
        };
    }

    buildLabel(): GridLabel {
        const { hasMultiplicandComplement } = this.info;

        const superLabel = super.buildLabel();
        if (!hasMultiplicandComplement) return superLabel;

        const correctionLabelMultiplier = this.getMultiplierForCorrectionLabel();
        const correctionIndex = superLabel.labels.length - 2;

        superLabel.labels[correctionIndex] = correctionLabelMultiplier + this.complementLabelStr;

        return superLabel;
    }

    protected buildMultiplicandComplementGroup(): CellGroup {
        const { hasMultiplicandComplement } = this.info;
        const groupBase = this.getMultiplicandComplementGroupBase();

        const multiplierNegative = hasMultiplicandComplement;
        const contentBuilder = () => (
            <WithoutExtensionLast
                lastMultiplierDigit={this.result.lastMultiplierDigit}
                multiplierNegative={multiplierNegative}
            />
        );

        return {
            ...groupBase,
            contentBuilder
        };
    }

    protected getMultiplierForCorrectionLabel(): string {
        const { lastMultiplierDigit } = this.result;
        const { base, valueInDecimal } = lastMultiplierDigit;
        return Math.abs(-(base - valueInDecimal)).toString();
    }
}

