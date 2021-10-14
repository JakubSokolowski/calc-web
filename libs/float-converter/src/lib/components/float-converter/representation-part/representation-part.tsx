import React, { FC } from 'react';
import { ButtonRowComponent } from '../button-row/button-row';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';

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

const PREFIX = 'RepresentationPart';

const classes = {
    root: `${PREFIX}-root`,
    info: `${PREFIX}-info`,
    title: `${PREFIX}-title`
};


const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        padding: theme.spacing(2)
    },
    [`& .${classes.info}`]: {
        textAlign: 'center',
        height: '70px'
    },
    [`& .${classes.title}`]: {
        fontWeight: 'bold'
    }
}));


export const RepresentationPart: FC<P> = (
    {
        part,
        partEncoding,
        partValue,
        partType,
        onChange
    }) => {
    const { t } = useTranslation();
    const title = {
        [PartType.Sign]: t('floatConverter.sign'),
        [PartType.Exponent]: t('floatConverter.exponent'),
        [PartType.Mantissa]: t('floatConverter.mantissa')
    }[partType];

    const handleChange = (values: string[]) => {
        if (onChange) onChange(values.join(''));
    };

    return (
        <Root>
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
        </Root>
    );
};
