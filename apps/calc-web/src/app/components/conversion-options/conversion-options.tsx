import React, { CSSProperties, FC } from 'react';
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons/lib';
import { setShowComplement, setShowDecimalValue } from '../../store/actions/options.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowComplement, selectShowDecimalValue } from '../../store/selectors/options.selectors';
import { useTranslation } from 'react-i18next';

interface P {
    style?: CSSProperties;
}

export const ConversionOptions: FC<P> = ({style}) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const showComplement = useSelector(selectShowComplement);
    const showDecimalValue = useSelector(selectShowDecimalValue);

    return (
        <div style={{display: 'flex', 'flexDirection': 'row', ...style}}>
            <Switch checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={showDecimalValue}
                    onChange={(value) => dispatch(setShowDecimalValue(value))}
            />
            <span style={{marginLeft: '5px'}}>{t('baseConverter.showDecimalValue')}</span>
            <Switch style={{marginLeft: '20px'}}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={showComplement}
                    onChange={(value) => dispatch(setShowComplement(value))}
            />
            <span style={{marginLeft: '5px'}}>{t('baseConverter.showComplement')}</span>
        </div>
    )
};
