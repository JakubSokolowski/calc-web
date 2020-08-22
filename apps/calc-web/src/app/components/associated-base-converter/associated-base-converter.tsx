import React, { FC, useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { BaseDigits, Conversion, convertUsingAssociatedBases, isValidString } from '@calc/calc-arithmetic';
import './associated-base-converter.scss';
import { useForm } from 'antd/es/form/util';
import { InputWithCopy } from '@calc/ui';
const { Option } = Select;

interface P {
    onConversionChange?: (conversion: Conversion) => void;
}

interface FormValues {
    inputStr: string;
    inputBase: number;
    outputBase: number;
}

export const AssociatedBaseConverter: FC<P> = ({ onConversionChange }) => {
    const [form] = useForm();

    const initialValues: FormValues = {
        inputStr: 'FFAFAFFAF',
        inputBase: 16,
        outputBase: 2
    };
    const [possibleOutputBases, setPossibleOutputBases] = useState<number[]>(() => {
        return BaseDigits.getAllPossibleBasesForAssociateConversion(initialValues.inputBase);
    });

    const onFinish = (values: FormValues) => {
        const { inputStr, inputBase, outputBase } = values;
        const conversion = convertUsingAssociatedBases(inputStr, inputBase, outputBase);
        onConversionChange(conversion);
    };

    const checkBase = (_, base: number) => {
        if (!BaseDigits.isValidRadix(base)) {
            return Promise.reject(`Base must be between ${BaseDigits.MIN_BASE} and ${BaseDigits.MAX_BASE}`);
        }
        return Promise.resolve();
    };

    const checkValueStr = (_, valueStr: string) => {
        const { inputBase } = form.getFieldsValue();
        if (!isValidString(valueStr, inputBase)) {
            return Promise.reject(`Representation strings contains invalid digits for base ${inputBase}`);
        }
        return Promise.resolve();
    };

    const onInputBaseChange = (e) => {
        const newInputBase = e.target.value;
        setPossibleOutputBases(BaseDigits.getAllPossibleBasesForAssociateConversion(newInputBase));
        form.validateFields()
    };

    useEffect(() => {
        form.setFieldsValue({outputBase: possibleOutputBases[0]});
    }, [form, possibleOutputBases]);

    const options = possibleOutputBases.map((base, index) => {
        return (
            <Option value={base} key={index}>{base}</Option>
        )
    });

    return (
        <div>
            <Form layout={'vertical'} initialValues={initialValues} form={form} onFinish={onFinish}>
                <Form.Item
                    name={'inputStr'}
                    label={'Input number'}
                    rules={[{ validator: checkValueStr }]}
                >
                    <InputWithCopy
                        onChange={() => form.validateFields()}
                    />
                </Form.Item>
                <Form.Item className="action-row">
                    <Input.Group style={{ display: 'flex', flexDirection: 'row' }}>
                        <Form.Item
                            name={'inputBase'}
                            label={'Input Base'}
                            style={{ width: '40%' }}
                            rules={[{ validator: checkBase }]}
                        >
                            <Input
                                type="number"
                                onChange={onInputBaseChange}
                            />
                        </Form.Item>
                        <div style={{ width: '20px' }}/>
                        <Form.Item
                            name={'outputBase'}
                            label={'Output Base'}
                            style={{ width: '40%' }}
                        >
                            <Select
                                placeholder="No output bases possible"
                                disabled={!options.length}
                                style={{width: '100%'}}
                            >
                                {options}
                            </Select>
                        </Form.Item>
                        <div style={{ width: '20px' }}/>
                        <div className="button-wrapper convert-button-wrapper">
                            <Button className="inline-form-button" type="primary" htmlType="submit"> Convert </Button>
                        </div>
                    </Input.Group>
                </Form.Item>
            </Form>
        </div>
    );
};
