import React, { FC } from 'react';
import { GridCellConfig, GridLabel } from '@calc/grid';
import HoverGridCell from '../hover-cell/hover-grid-cell';
import { InlineMath } from '@calc/common-ui';

interface P {
    labelConfig: GridLabel;
}

export const OperandLabel: FC<P> = ({labelConfig}) => {

    const cells = labelConfig.labels.map((labelStr, index) => {
        const config: GridCellConfig = {
            content: (<InlineMath math={labelStr}/>)
        };
        return (
            <HoverGridCell key={`${index}`} x={0} y={index} config={config}/>
        )
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {cells}
        </div>
    );
};
