import React, { FC, useState } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { BaseConverterComponent } from '../base-converter/base-converter-component';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Tabs } from '@material-ui/core';
import { a11yProps, Section, TabPanel } from '@calc/common-ui';
import { DocPage } from '@calc/docs';
import { useConverterStyles } from '../../core/styles/converter-styles';
import { ConversionResult } from '../conversion-result/conversion-result';
import { FloatingConversionDetails } from '../floating-conversion-details/floating-conversion-details';
import { IntegralConversionDetails } from '../integral-conversion-details/integral-conversion-details';
import { ConversionRenderer } from '../conversion-renderer/conversion-renderer';


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
                        <ConversionResult conversion={conversion}/>
                    </Section>
                }
                {conversion &&
                <Section title={t('baseConverter.integralConversion')}>
                    <IntegralConversionDetails conversion={conversion}/>
                </Section>
                }
                { conversion && conversion.result.fractionalPart.length > 0 &&
                    <Section title={t('baseConverter.floatingConversion')}>
                       <FloatingConversionDetails conversion={conversion} precision={precision}/>
                    </Section>
                }

            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className={classes.verticalSpacer}/>
                <Box display={'flex'} alignItems={'center'} maxWidth={700} margin={'auto'}>
                    <DocPage path={'positional/base-conversion'} operationRenderer={ConversionRenderer}/>
                </Box>
            </TabPanel>
        </div>
    );
};
