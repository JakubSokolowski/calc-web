import React, { CSSProperties, FC } from 'react';
import { setShowComplement, setShowDecimalValue } from '../../store/actions/options.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowComplement, selectShowDecimalValue } from '../../store/selectors/options.selectors';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';

interface P {
    style?: CSSProperties;
}

export const ConversionOptions: FC<P> = ({ style }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const showComplement = useSelector(selectShowComplement);
    const showDecimalValue = useSelector(selectShowDecimalValue);

    return (
        <div style={{ display: 'flex', 'flexDirection': 'row', ...style }}>
            <FormGroup row>
                <FormControlLabel
                    control={<Switch
                        color={'primary'}
                        checked={showDecimalValue}
                        onChange={() => {
                            dispatch(setShowDecimalValue(!showDecimalValue));
                        }}
                    />}
                    label={t('baseConverter.showDecimalValue')}
                />
                <FormControlLabel
                    control={<Switch
                        color={'primary'}
                        checked={showComplement}
                        onChange={() => {
                            dispatch(setShowComplement(!showComplement));
                        }}
                    />}
                    label={t('baseConverter.showComplement')}
                />
            </FormGroup>
        </div>
    );
};
