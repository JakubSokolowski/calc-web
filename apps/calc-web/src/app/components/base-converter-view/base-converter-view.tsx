import React, { FC, useState } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { BaseConverterComponent } from '../base-converter/base-converter-component';
import { ConversionDetails } from '../conversion-details/conversion-details';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import { a11yProps, TabPanel } from '@calc/ui';
import { DocPage } from '@calc/docs';
import { useConverterStyles } from '../../core/styles/converter-styles';
import { environment } from '../../../environments/environment';

export const BaseConverterView: FC = () => {
    const { t } = useTranslation();
    const [conversion, setConversion] = useState<Conversion>();
    const [precision, setPrecision] = useState(5);
    const classes = useConverterStyles();

    const onChange = (newConversion: Conversion, precision: number) => {
        if (newConversion) {
            setConversion(newConversion);
            setPrecision(precision);
        }
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Converter" {...a11yProps(0)} />
                <Tab label="Theory" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div className={classes.verticalSpacer}/>
                <Typography variant={'h4'} className={classes.title}>
                    {t('baseConverter.title')}
                </Typography>
                <BaseConverterComponent onConversionChange={onChange}/>
                {conversion && <ConversionDetails conversion={conversion} precision={precision}/>}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className={classes.verticalSpacer}/>
                <Box display={'flex'} alignItems={'center'} maxWidth={900} margin={'auto'}>
                    <DocPage path={'positional/base-conversion'} deployUrl={environment.deployUrl}/>
                </Box>
            </TabPanel>
        </div>
    );
};

export default BaseConverterView;
