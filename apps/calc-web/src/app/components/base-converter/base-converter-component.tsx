import React, { FC, useEffect, useState } from 'react';
import { Input, InputNumber } from 'antd';
import { fromString } from '@calc/calc-arithmetic';

export const BaseConverterComponent: FC = () => {
    const defaultInputBase = 10;
    const defaultOutputBase = 8;

    const [inputNumber, setInputNumber] = useState('1024');
    const [outputNumber, setOutputNumber] = useState('');
    const [inputBase, setInputBase] = useState(defaultInputBase);
    const [outputBase, setOutputBase] = useState(defaultOutputBase);
    const [complementStr, setComplementStr] = useState('');
    const [inputComplementStr, setInputComplementStr] = useState('');

    useEffect(() => {
        try {
            if (!inputNumber || !inputBase || !outputBase) return;
            const result = fromString(inputNumber, inputBase, outputBase);
            setInputComplementStr(
                fromString(
                    inputNumber,
                    inputBase,
                    inputBase
                ).result.complement.toString()
            );
            setOutputNumber(result.result.toString());
            setComplementStr(result.result.complement.toString());
        } catch (err) {
            console.log(err);
        }
    }, [inputNumber, inputBase, outputBase]);

    const onInputNumberChange = event => {
        setInputNumber(event.target.value);
    };

    const onInputBaseChange = value => {
        setInputBase(parseInt(value, 10));
    };

    const onOutputBaseChange = value => {
        setOutputBase(parseInt(value, 10));
    };

    return (
        <div style={{ paddingTop: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '20%' }}>
                    <span> Input base </span>
                </div>
                <div style={{ width: '80%' }}>
                    <span> Input number </span>
                </div>
            </div>
            <Input.Group compact>
                <InputNumber
                    style={{ width: '20%' }}
                    min={2}
                    max={64}
                    defaultValue={defaultInputBase}
                    onChange={onInputBaseChange}
                />
                <Input
                    style={{ width: '80%' }}
                    defaultValue="1024"
                    allowClear
                    onChange={onInputNumberChange}
                />
            </Input.Group>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '20%' }}></div>
                <div style={{ width: '80%' }}>
                    <span>Input number complement</span>
                </div>
            </div>
            <Input.Group compact>
                <div style={{ width: '20%' }}/>
                <Input
                    style={{ width: '80%' }}
                    readOnly
                    value={inputComplementStr}
                />
            </Input.Group>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '20%' }}>
                    <span> Output base </span>
                </div>
                <div style={{ width: '80%' }}>
                    <span> Output number </span>
                </div>
            </div>
            <Input.Group compact>
                <InputNumber
                    style={{ width: '20%' }}
                    min={2}
                    max={64}
                    value={outputBase}
                    onChange={onOutputBaseChange}
                />
                <Input style={{ width: '80%' }} readOnly value={outputNumber}/>
            </Input.Group>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '20%' }}></div>
                <div style={{ width: '80%' }}>
                    <span>Output number complement</span>
                </div>
            </div>
            <Input.Group compact>
                <div style={{ width: '20%' }}/>
                <Input
                    style={{ width: '80%' }}
                    readOnly
                    value={complementStr}
                />
            </Input.Group>
        </div>
    );
};
