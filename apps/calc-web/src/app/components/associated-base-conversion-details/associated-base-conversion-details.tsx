import React, { FC } from 'react';
import { AssociatedBaseConversion } from '@calc/calc-arithmetic';
import { DigitMappingBox } from '../digit-mapping/digit-mapping-box';
import './associated-base-conversion-details.scss';
import { InputWithCopy, NumberSubscript } from '@calc/ui';
import { useTranslation } from 'react-i18next';
import { Card, Typography } from '@material-ui/core';

interface P {
    conversion: AssociatedBaseConversion;
}

export const AssociatedBaseConversionDetails: FC<P> = ({ conversion }) => {
    const { t } = useTranslation();
    const [inputStr, inputBase] = conversion.input;
    const outputStr = conversion.result.valueInBase;
    const outputBase = conversion.result.base;

    const mappings = conversion.details.positionMappings.map((mapping, index) => {
        return (
            <DigitMappingBox key={index} mapping={mapping}/>
        );
    });

    return (
        <Card style={{'padding': '10px'}}>
            <span>{t('baseConverter.inputNumber')}</span>
            <InputWithCopy
                readOnly
                value={conversion.result.valueInBase}
            />
            <div className="equation-box">
                <NumberSubscript value={inputStr} subscript={inputBase}/>
                &nbsp;=&nbsp;
                <NumberSubscript value={conversion.result.decimalValue.toString()} subscript={10}/>
                &nbsp;=&nbsp;
                <NumberSubscript value={outputStr} subscript={outputBase}/>
            </div>

            <Typography>
                {t('associatedBaseConverter.mappings')}
            </Typography>
            <div className="mappings-row">
                {mappings}
            </div>
        </Card>
    );
};
