import React, { FC, useState } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { BaseConverterComponent } from '../base-converter/base-converter-component';
import { ConversionDetails } from '../conversion-details/conversion-details';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Tabs } from '@material-ui/core';
import { a11yProps, Section, TabPanel } from '@calc/ui';
import { DocPage } from '@calc/docs';
import { useConverterStyles } from '../../core/styles/converter-styles';


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
        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Converter" {...a11yProps(0)} />
                <Tab label="Theory" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div className={classes.verticalSpacer}/>
                <Section title={t('baseConverter.title')}>
                    <BaseConverterComponent onConversionChange={onChange}/>
                </Section>
                {conversion &&
                    <Section title={t('baseConverter.result')}>
                        <ConversionDetails conversion={conversion} precision={precision}/>
                    </Section>
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className={classes.verticalSpacer}/>
                <Box display={'flex'} alignItems={'center'} maxWidth={700} margin={'auto'}>
                    <DocPage path={'positional/base-conversion'}/>
                </Box>
            </TabPanel>
        </div>
    );
};

export default BaseConverterView;
