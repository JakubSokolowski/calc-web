import React, { FC, useEffect, useState } from 'react';
import { FloatConverter, isValidString } from '@calc/calc-arithmetic';
import { PartType, RepresentationPart } from './representation-part/representation-part';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { InputType, InputWithCopy } from '@calc/ui';

export const FloatConverterComponent: FC = () => {
    const initialNum = FloatConverter.ToSingle(0.0);
    const [floatingNumber, setFloatingNumber] = useState(initialNum);
    const [sign, setSign] = useState(initialNum.sign);
    const [exponent, setExponent] = useState(initialNum.exponent);
    const [mantissa, setMantissa] = useState(initialNum.mantissa);
    const [rawValue, setRawValue] = useState(0.0);
    const { t } = useTranslation();

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

    const formItemStyle = { marginBottom: '12px' };

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
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                size={'small'}
            >
                <div style={{ width: '600px' }}>
                    <Form.Item label={t('floatConverter.entered')} style={formItemStyle}>
                        <InputWithCopy value={rawValue} onChange={handleChange} inputType={InputType.Number}/>
                    </Form.Item>
                    <Form.Item label={t('floatConverter.stored')} style={formItemStyle}>
                        <InputWithCopy readOnly value={floatingNumber.value.toString()} inputType={InputType.Text}/>
                    </Form.Item>
                    <Form.Item label={t('floatConverter.binary')} style={formItemStyle}>
                        <InputWithCopy readOnly value={floatingNumber.binary} inputType={InputType.Text}/>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};
