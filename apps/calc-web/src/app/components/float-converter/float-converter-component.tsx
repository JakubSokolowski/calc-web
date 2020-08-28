import React, { FC, useEffect, useState } from 'react';
import { FloatConverter, isValidString } from '@calc/calc-arithmetic';
import { PartType, RepresentationPart } from './representation-part/representation-part';
import { InputType, InputWithCopy } from '@calc/ui';

export const FloatConverterComponent: FC = () => {
    const initialNum = FloatConverter.ToSingle(0.0);
    const [floatingNumber, setFloatingNumber] = useState(initialNum);
    const [sign, setSign] = useState(initialNum.sign);
    const [exponent, setExponent] = useState(initialNum.exponent);
    const [mantissa, setMantissa] = useState(initialNum.mantissa);
    const [rawValue, setRawValue] = useState(0.0);

    useEffect(() => {
        const representationStr = sign + exponent + mantissa;
        setFloatingNumber(FloatConverter.ToSingle(representationStr));
    }, [exponent, mantissa, sign]);

    const handleChange = (value) => {
        setRawValue(value);
        if (value && isValidString(value, 10)) {
            try {
                const num = FloatConverter.ToSingle(value);
                setFloatingNumber(num);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const style = {
        'display': 'flex' as 'flex',
        'flexDirection': 'row' as 'row'
    };

    return (
        <div>
            <div style={style}>
                <RepresentationPart
                    partType={PartType.Sign}
                    part={[floatingNumber.sign]}
                    partEncoding={floatingNumber.signEncoding}
                    partValue={floatingNumber.signValue}
                    onChange={setSign}
                />
                <RepresentationPart
                    partType={PartType.Exponent}
                    part={floatingNumber.exponent.split('')}
                    partEncoding={floatingNumber.exponentEncoding.toString()}
                    partValue={floatingNumber.exponentValue.toString()}
                    onChange={setExponent}
                />
                <RepresentationPart
                    partType={PartType.Mantissa}
                    part={floatingNumber.mantissa.split('')}
                    partEncoding={floatingNumber.mantissaEncoding.toString()}
                    partValue={floatingNumber.mantissaValue.toString()}
                    onChange={setMantissa}
                />
            </div>
            <div style={{ width: '600px' }}>
                <InputWithCopy value={rawValue} onChange={handleChange} size={'small'} inputType={InputType.Number}/>
                <InputWithCopy readOnly value={floatingNumber.value.toString()} size={'small'} inputType={InputType.Text}/>
                <InputWithCopy readOnly value={floatingNumber.binary} size={'small'} inputType={InputType.Text}/>
            </div>
        </div>
    );
};
