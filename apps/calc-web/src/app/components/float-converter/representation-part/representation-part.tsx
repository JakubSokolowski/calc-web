import React, { FC } from 'react';
import { ButtonRowComponent } from '../button-row/button-row';
import { useTranslation } from 'react-i18next';

export enum PartType {
    Sign = 'Sign',
    Exponent = 'Exponent',
    Mantissa = 'Mantissa'
}

interface P {
    part: string[],
    partEncoding: string,
    partValue: string,
    partType: PartType
    onChange?: (value: string) => void
}

export const RepresentationPart: FC<P> = (
    {
        part,
        partEncoding,
        partValue,
        partType,
        onChange
    }) => {
    const { t } = useTranslation();

    const title = {
        [PartType.Sign]: t('floatConverter.sign'),
        [PartType.Exponent]: t('floatConverter.exponent'),
        [PartType.Mantissa]: t('floatConverter.mantissa')
    }[partType];

    const handleChange = (values: string[]) => {
        if(onChange) onChange(values.join(''));
    };

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold' }}>{title}</div>
                <div>
                    {
                        partType === PartType.Exponent
                            ? <span>
                                2 <sup>{partValue}</sup>
                            </span>
                            : <span>
                                {partValue}
                            </span>
                    }
                </div>
                <div> {partEncoding}</div>
            </div>

            <ButtonRowComponent values={part} onChange={handleChange}/>
        </div>
    );
};
