import React, { CSSProperties, FC } from 'react';
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons/lib';
import { setShowComplement, setShowDecimalValue } from '../../store/actions/options.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowComplement, selectShowDecimalValue } from '../../store/selectors/options.selectors';

interface P {
    style?: CSSProperties;
}

export const ConversionOptions: FC<P> = ({style}) => {
    const showComplement = useSelector(selectShowComplement);
    const showDecimalValue = useSelector(selectShowDecimalValue);
    const dispatch = useDispatch();

    return (
        <div style={{display: 'flex', 'flexDirection': 'row', ...style}}>
            <Switch checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={showDecimalValue}
                    onChange={(value) => dispatch(setShowDecimalValue(value))}
            />
            <span style={{marginLeft: '5px'}}>{'Show decimal value'}</span>
            <Switch style={{marginLeft: '20px'}}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={showComplement}
                    onChange={(value) => dispatch(setShowComplement(value))}
            />
            <span style={{marginLeft: '5px'}}>{'Show complement'}</span>
        </div>
    )
};
