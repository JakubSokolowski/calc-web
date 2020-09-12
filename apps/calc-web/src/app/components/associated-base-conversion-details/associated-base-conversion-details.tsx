import React, { FC } from 'react';
import { AssociatedBaseConversion } from '@calc/calc-arithmetic';
import { DigitMappingBox } from '../digit-mapping/digit-mapping-box';
import { InputWithCopy, NumberSubscript } from '@calc/ui';
import { useTranslation } from 'react-i18next';
import { Card, createStyles, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        card: {
            padding: theme.spacing(3)
        },
        equation: {
            paddingBottom: theme.spacing(2)
        },
        mappings: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
    });
});

interface P {
    conversion: AssociatedBaseConversion;
}

export const AssociatedBaseConversionDetails: FC<P> = ({ conversion }) => {
    const { t } = useTranslation();
    const [inputStr, inputBase] = conversion.input;
    const outputStr = conversion.result.valueInBase;
    const outputBase = conversion.result.base;
    const classes = useStyles();

    const mappings = conversion.details.positionMappings.map((mapping, index) => {
        return (
            <DigitMappingBox key={index} mapping={mapping}/>
        );
    });

    return (
        <Card className={classes.card}>
            <span>{t('baseConverter.inputNumber')}</span>
            <InputWithCopy
                readOnly
                value={conversion.result.valueInBase}
            />
            <div className={classes.equation}>
                <NumberSubscript value={inputStr} subscript={inputBase}/>
                &nbsp;=&nbsp;
                <NumberSubscript value={conversion.result.decimalValue.toString()} subscript={10}/>
                &nbsp;=&nbsp;
                <NumberSubscript value={outputStr} subscript={outputBase}/>
            </div>

            <Typography>
                {t('associatedBaseConverter.mappings')}
            </Typography>
            <div className={classes.mappings}>
                {mappings}
            </div>
        </Card>
    );
};
