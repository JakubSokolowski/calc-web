import React, { FC } from 'react';
import { ButtonRowComponent } from '../button-row/button-row';
import { useTranslation } from 'react-i18next';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material';

import createStyles from '@mui/styles/createStyles';

export enum PartType {
    Sign = 'Sign',
    Exponent = 'Exponent',
    Mantissa = 'Mantissa'
}

interface P {
    part: string[];
    partEncoding: string;
    partValue: string;
    partType: PartType;
    onChange?: (value: string) => void;
}


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
           padding: theme.spacing(2)
        },
        info: {
            textAlign: 'center',
            height: '70px'
        },
        title: {
            fontWeight: 'bold'
        }
    });
});

export const RepresentationPart: FC<P> = (
    {
        part,
        partEncoding,
        partValue,
        partType,
        onChange
    }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const title = {
        [PartType.Sign]: t('floatConverter.sign'),
        [PartType.Exponent]: t('floatConverter.exponent'),
        [PartType.Mantissa]: t('floatConverter.mantissa')
    }[partType];

    const handleChange = (values: string[]) => {
        if(onChange) onChange(values.join(''));
    };

    return (
        <div className={classes.root}>
            <div className={classes.info}>
                <div className={classes.title}>{title}</div>
                <div>
                    {
                        partType === PartType.Exponent
                            ? <span>
                                2 <sup>{partValue}</sup>
                            </span>
                            : <span>
                                {partValue}
                            </span>
                    }
                </div>
                <div> {partEncoding}</div>
            </div>

            <ButtonRowComponent values={part} onChange={handleChange}/>
        </div>
    );
};
