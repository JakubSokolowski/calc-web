import { ComplementMultiplicationBuilder } from './complement-multiplication-builder';
import { CellGroup, GridLabel } from '@calc/grid';
import { WithExtensionLast } from '../../last-multiplication-details/with-extension-last';
import React from 'react';

export class WithExtensionBuilder extends ComplementMultiplicationBuilder {
    buildMultiplicandComplementGroup(): CellGroup {
        const { hasMultiplicandComplement } = this.info;
        const contentBuilder = () => (<WithExtensionLast multiplierNegative={hasMultiplicandComplement}/>);
        const base = this.getMultiplicandComplementGroupBase();

        return {
            ...base,
            contentBuilder
        };
    }

    buildLabel(): GridLabel {
        const {hasMultiplicandComplement, totalHeight} = this.info;
        const multiplicandLabelStr = 'M';
        const multiplierLabelStr = 'm';

        if (!hasMultiplicandComplement) {
            return super.buildLabel()
        }

        const labels = Array(totalHeight + 2).fill('');
        const complementLabelStr = `\\overline{${multiplicandLabelStr}}`;

        const multiplicandComplementIndex = 0;
        const multiplicandIndex = 1;
        const multiplierIndex = 2;
        const correctionIndex = labels.length - 2;

        labels[multiplicandComplementIndex] = complementLabelStr;
        labels[multiplicandIndex] = multiplicandLabelStr;
        labels[multiplierIndex] = multiplierLabelStr;
        labels[correctionIndex] = complementLabelStr;

        return { labels };
    }
}
