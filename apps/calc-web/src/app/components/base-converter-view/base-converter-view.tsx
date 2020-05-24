import React, { FC, useState } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { buildConversionGrid, gridToAscii, OperationGrid, OperationGridInfo } from '../../core/operation-grid';
import { BaseConverterComponent } from '../base-converter/base-converter-component';
import { ConversionDetails } from '../conversion-details/conversion-details';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph, Text } = Typography;
export const BaseConverterView: FC = () => {
    const { t } = useTranslation();
    const [grid, setGrid] = useState<OperationGridInfo>();
    const [conversion, setConv] = useState<Conversion>();

    const onChange = (newConversion: Conversion) => {
        if (newConversion) {
            const newGrid = buildConversionGrid(newConversion);
            setGrid(newGrid);
            setConv(newConversion);
            console.log(gridToAscii(newGrid.grid));
        }
    };
    return (
        <div>
            <Title>
                {t('baseConverter.title')}
            </Title>
            <BaseConverterComponent onConversionChange={onChange}/>
            {conversion && <ConversionDetails conversion={conversion}/>}
        </div>
    );
};
