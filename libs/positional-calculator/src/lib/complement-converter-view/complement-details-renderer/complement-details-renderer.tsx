import React from 'react';
import { PaddedGrid } from '@calc/grid';
import { getComplementWithDetails, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import { buildComplementGrid } from '../complement-grid/complement-grid';
import { SaveAsImageButton } from '@calc/common-ui';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { OperationRenderer } from '../../operation-renderer/operation-renderer';

export interface ComplementDetailsRendererParams {
    representation: string;
    base: number;
    subtractionOperands?: string[];
    additionOperands?: string[];
    showDownload?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actionRow: {
            paddingTop: theme.spacing(1),
            display: 'flex',
            flexDirection: 'row-reverse'
        }

    })
);

export const ComplementDetailsRenderer = (params: ComplementDetailsRendererParams) => {
    const classes = useStyles();
    const { t } = useTranslation();

    if(params.subtractionOperands) {
        return (
            <OperationRenderer
                base={params.base}
                operands={params.subtractionOperands}
                operation={OperationType.Subtraction}
                algorithm={MultiplicationType.Default}
            />
        )
    }

    if(params.additionOperands) {
        return (
            <OperationRenderer
                base={params.base}
                operands={params.additionOperands}
                operation={OperationType.Addition}
                algorithm={MultiplicationType.Default}
            />
        )
    }

    const { representation, base, showDownload } = params;
    const result = getComplementWithDetails(representation, base);
    const grid = buildComplementGrid(result);
    const gridId = 'complement-conversion-details';

    return (
        <div>
            <PaddedGrid desiredWidth={19} values={grid.values} groups={grid.groups} lines={grid.lines} id={gridId}/>
            {
                showDownload &&
                <div className={classes.actionRow}>
                    <SaveAsImageButton
                        tooltipTitle={t('complementConverter.downloadDetails')}
                        elementId={gridId}
                    />
                </div>
            }
        </div>
    );
};
