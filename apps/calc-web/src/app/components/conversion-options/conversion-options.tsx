import React, { CSSProperties, FC } from 'react';
import { setShowComplement, setShowDecimalValue } from '../../store/actions/options.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowComplement, selectShowDecimalValue } from '../../store/selectors/options.selectors';
import { useTranslation } from 'react-i18next';
import { createStyles, FormControlLabel, FormGroup, Switch, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface P {
    style?: CSSProperties;
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        box: {
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: theme.spacing(2)
        }
    });
});

export const ConversionOptions: FC<P> = ({ style }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const showComplement = useSelector(selectShowComplement);
    const showDecimalValue = useSelector(selectShowDecimalValue);

    return (
        <div className={classes.box}>
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
