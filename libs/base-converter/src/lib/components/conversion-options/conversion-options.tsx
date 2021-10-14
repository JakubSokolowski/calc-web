import React, { CSSProperties, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, FormGroup, styled, Switch } from '@mui/material';
import { selectShowComplement, selectShowDecimalValue, setShowComplement, setShowDecimalValue } from '@calc/core';

interface P {
    style?: CSSProperties;
}

const PREFIX = 'ConversionOptions';

const classes = {
    box: `${PREFIX}-box`,
    equation: `${PREFIX}-equation`,
    mappings: `${PREFIX}-mappings`,
};


const Root = styled('div')(({ theme }) => ({
    [`& .${classes.box}`]: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: theme.spacing(2)
    },
}));


export const ConversionOptions: FC<P> = ({ style }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const showComplement = useSelector(selectShowComplement);
    const showDecimalValue = useSelector(selectShowDecimalValue);

    return (
        <Root>
            <div className={classes.box}>
                <FormGroup row>
                    <FormControlLabel
                        control={<Switch
                            data-test={`show-decimal-value-${showDecimalValue ? 'on' : 'off'}`}
                            color={'primary'}
                            checked={showDecimalValue}
                            onChange={() => {
                                dispatch(setShowDecimalValue(!showDecimalValue));
                            }}
                        />}
                        label={t('baseConverter.showDecimalValue')}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                data-test={`show-complement-${showComplement ? 'on' : 'off'}`}
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
        </Root>
    );
};

