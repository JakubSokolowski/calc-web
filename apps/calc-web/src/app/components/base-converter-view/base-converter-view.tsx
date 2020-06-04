import React, { FC, useState } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import {
    buildIntegralPartConversionGrid,
    CellConfig,
    gridToAscii,
    OperationGrid,
} from '../../core/operation-grid';
import { BaseConverterComponent } from '../base-converter/base-converter-component';
import { ConversionDetails } from '../conversion-details/conversion-details';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
export const BaseConverterView: FC = () => {
    const { t } = useTranslation();
    const [grid, setGrid] = useState<OperationGrid<CellConfig>>();
    const [conversion, setConv] = useState<Conversion>();
    const [precision, setPrecision] = useState(5);
    const onChange = (newConversion: Conversion, precision: number) => {
        if (newConversion) {
            const newGrid = buildIntegralPartConversionGrid(newConversion);
            setGrid(newGrid);
            setConv(newConversion);
            setPrecision(precision);
            console.log(gridToAscii(newGrid));
        }
    };
    return (
        <div>
            <Title>
                {t('baseConverter.title')}
            </Title>
            <BaseConverterComponent onConversionChange={onChange}/>
            {conversion && <ConversionDetails conversion={conversion} precision={precision}/>}
        </div>
    );
};
