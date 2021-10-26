import React, { FC, useEffect, useState } from 'react';
import { FloatConverter, isValidRepresentationStr } from '@calc/calc-arithmetic';
import { PartType, RepresentationPart } from './representation-part/representation-part';
import { InputType, InputWithCopy } from '@calc/common-ui';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';


const PREFIX = 'FloatConverter';

const classes = {
    input: `${PREFIX}-input`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.input}`]: {
        paddingTop: theme.spacing(2)
    },
}));


export const FloatConverterComponent: FC = () => {
    const {t} = useTranslation();
    const initialNum = FloatConverter.ToSingle(0.0);
    const [floatingNumber, setFloatingNumber] = useState(initialNum);
    const [sign, setSign] = useState(initialNum.sign);
    const [exponent, setExponent] = useState(initialNum.exponent);
    const [mantissa, setMantissa] = useState(initialNum.mantissa);
    const [rawValue, setRawValue] = useState(0.0);

    useEffect(() => {
        const representationStr = sign + exponent + mantissa;
        const num = FloatConverter.ToSingle(representationStr);
        setFloatingNumber(num);
        setRawValue(FloatConverter.BinaryStringToSingle(num.binary))
    }, [exponent, mantissa, sign]);

    const handleChange = (event) => {
        const value = event.target.value;
        setRawValue(value);
        if (value && isValidRepresentationStr(value, 10)) {
            try {
                const intValue = parseFloat(value);
                const num = FloatConverter.ToSingle(intValue);
                setFloatingNumber(num);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const style = {
        'display': 'flex' as const,
        'flexDirection': 'row' as const
    };

    return (
        <Root>
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
            <div >
                <InputWithCopy
                    className={classes.input}
                    label={t('floatConverter.entered')}
                    value={rawValue}
                    onValueChange={handleChange}
                    size={'small'}
                    inputType={InputType.Number}
                />
                <InputWithCopy
                    className={classes.input}
                    label={t('floatConverter.stored')}
                    disabled
                    readOnly
                    value={floatingNumber.value.toString()}
                    size={'small'}
                    inputType={InputType.Text}
                />
                <InputWithCopy
                    className={classes.input}
                    label={t('floatConverter.binary')}
                    disabled
                    readOnly
                    value={floatingNumber.binary}
                    size={'small'}
                    inputType={InputType.Text
                }/>
            </div>
        </Root>
    );
};
