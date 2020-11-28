import React, { FC, useState } from 'react';
import { AssociatedBaseConversion, Conversion } from '@calc/calc-arithmetic';
import { useTranslation } from 'react-i18next';
import { AssociatedBaseConverter } from '../associated-base-converter/associated-base-converter';
import { AssociatedBaseConversionDetails } from '../associated-base-conversion-details/associated-base-conversion-details';
import { Box, Tab, Tabs } from '@material-ui/core';
import { a11yProps, Section, TabPanel } from '@calc/ui';
import { DocPage } from '@calc/docs';
import { useConverterStyles } from '../../core/styles/converter-styles';


export const AssociatedBaseConverterView: FC = () => {
    const { t } = useTranslation();
    const [conversion, setConversion] = useState<Conversion>();
    const classes = useConverterStyles();

    const onChange = (newConversion?: Conversion) => {
        if (newConversion) {
            setConversion(newConversion);
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
            <TabPanel className={classes.panel} value={value} index={0}>
                <Section title={t('associatedBaseConverter.title')}>
                    <AssociatedBaseConverter onConversionChange={onChange}/>
                </Section>
                {
                    conversion &&
                        <Section title={t('baseConverter.result')}>
                            <AssociatedBaseConversionDetails conversion={conversion.stages[0] as AssociatedBaseConversion}/>
                        </Section>
                }
            </TabPanel>
            <TabPanel className={classes.panel} value={value} index={1}>
                <Box display={'flex'} alignItems={'center'} maxWidth={760} margin={'auto'}>
                    <DocPage path='positional/associated-base-conversion'/>
                </Box>
            </TabPanel>

        </div>
    );
};
