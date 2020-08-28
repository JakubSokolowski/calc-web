import React, { FC, useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import {
    BaseDigits,
    ComplementConverter,
    Conversion,
    convertUsingAssociatedBases,
    fromString,
    isValidString
} from '@calc/calc-arithmetic';
import './associated-base-converter.scss';
import { useForm } from 'antd/es/form/util';
import { InputWithCopy } from '@calc/ui';
import { useSelector } from 'react-redux';
import { selectShowComplement, selectShowDecimalValue } from '../../store/selectors/options.selectors';
import { ConversionOptions } from '../conversion-options/conversion-options';
import { useTranslation } from 'react-i18next';
import { Button, Input, MenuItem, Select, Card } from '@material-ui/core';

interface P {
    onConversionChange?: (conversion: Conversion) => void;
}

interface FormValues {
    inputStr: string;
    inputBase: number;
    outputBase: number;
}

export const AssociatedBaseConverter: FC<P> = ({ onConversionChange }) => {
    const { t } = useTranslation();
    const [form] = useForm();
    const showComplement = useSelector(selectShowComplement);
    const showDecimalValue = useSelector(selectShowDecimalValue);

    const initialValues: FormValues = {
        inputStr: 'FFAFAFFAF',
        inputBase: 16,
        outputBase: 2
    };

    const [inputValue, setInputValue] = useState(initialValues.inputStr);
    const [inputBase, setInputBase] = useState(initialValues.inputBase);

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
            return Promise.reject(
                t(
                    'baseConverter.wrongBase',
                    { minBase: BaseDigits.MIN_BASE, maxBase: BaseDigits.MAX_BASE }
                )
            );
        }
        return Promise.resolve();
    };

    const getDecimal = useCallback(() => {
        try {
            if (inputBase === 10) return inputValue;
            return fromString(
                inputValue,
                inputBase,
                10
            ).result.decimalValue.toString();
        } catch (e) {
            console.log(e);
            return '0.0';
        }
    }, [inputBase, inputValue]);

    const getComplement = useCallback(() => {
        try {
            return ComplementConverter.getComplement(
                inputValue,
                inputBase
            ).toString();
        } catch (e) {
            console.log(e);
            return '0.0';
        }
    }, [inputBase, inputValue]);

    const checkValueStr = (_, valueStr: string) => {
        const { inputBase } = form.getFieldsValue();
        if (!isValidString(valueStr, inputBase)) {
            return Promise.reject(
                t(
                    'baseConverter.wrongRepresentationStr',
                    { base: inputBase }
                )
            );
        }
        return Promise.resolve();
    };

    const onInputBaseChange = (e) => {
        const newInputBase = e.target.value;
        setInputBase(e.target.value);
        setPossibleOutputBases(BaseDigits.getAllPossibleBasesForAssociateConversion(newInputBase));
        form.validateFields();
    };

    useEffect(() => {
        form.setFieldsValue({ outputBase: possibleOutputBases[0] });
    }, [form, possibleOutputBases]);

    const label = (
        <div style={{ display: 'flex', 'flexDirection': 'row' }}>
            <span>{t('baseConverter.inputNumber')}</span>
            <ConversionOptions style={{ marginLeft: '100px' }}/>
        </div>
    );

    const options = possibleOutputBases.map((base, index) => {
        return (
            <MenuItem value={base} key={index}>{base}</MenuItem>
        );
    });

    return (
        <div>
           <Card style={{'padding': '10px'}}>
               <Form layout={'vertical'} initialValues={initialValues} form={form} onFinish={onFinish}>
                   <Form.Item
                       name={'inputStr'}
                       label={label}
                       rules={[{ validator: checkValueStr }]}
                   >
                       <InputWithCopy
                           onChange={(value) => {
                               setInputValue(value);
                               form.validateFields();
                           }}
                       />
                   </Form.Item>
                   {
                       showDecimalValue &&
                       <Form.Item
                           label={t('baseConverter.inputDecimalValue')}
                       >
                           <InputWithCopy readOnly value={getDecimal()}/>
                       </Form.Item>
                   }

                   {
                       showComplement &&
                       <Form.Item
                           label={t('baseConverter.inputComplement')}
                       >
                           <InputWithCopy readOnly value={getComplement()}/>
                       </Form.Item>
                   }
                   <Form.Item className="action-row">
                       <Form.Item
                           name={'inputBase'}
                           label={t('baseConverter.inputBase')}
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
                           label={t('baseConverter.outputBase')}
                           style={{ width: '40%' }}
                       >
                           <Select
                               placeholder={t('associatedBaseConverter.noOutputBase')}
                               disabled={!options.length}
                               style={{ width: '100%' }}
                           >
                               {options}
                           </Select>
                       </Form.Item>
                       <div style={{ width: '20px' }}/>
                       <div className="button-wrapper convert-button-wrapper">
                           <Button className="inline-form-button" color={'primary'} type={'submit'}>{
                               t('baseConverter.convert')}
                           </Button>
                       </div>
                   </Form.Item>
               </Form>
           </Card>
        </div>
    );
};
