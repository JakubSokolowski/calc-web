import React, { FC, useState } from 'react';
import { AssociatedBaseConversion, Conversion } from '@calc/calc-arithmetic';
import { useTranslation } from 'react-i18next';
import { AssociatedBaseConverter } from '../associated-base-converter/associated-base-converter';
import { AssociatedBaseConversionDetails } from '../associated-base-conversion-details/associated-base-conversion-details';
import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import { a11yProps, TabPanel } from '@calc/ui';
import { BaseConverterComponent } from '../base-converter/base-converter-component';
import { ConversionDetails } from '../conversion-details/conversion-details';
import { DocPage } from '@calc/docs';

export const AssociatedBaseConverterView: FC = () => {
    const { t } = useTranslation();
    const [conversion, setConv] = useState<Conversion>();

    const onChange = (newConversion: Conversion) => {
        if (newConversion) {
            setConv(newConversion);
        }
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Converter" {...a11yProps(0)} />
                <Tab label="Theory" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div style={{ height: '20px' }}/>
                <Typography variant={'h3'}>
                    {t('associatedBaseConverter.title')}
                </Typography>
                <AssociatedBaseConverter onConversionChange={onChange}/>
                {conversion &&
                <Typography variant={'h3'} style={{paddingTop: '20px'}}>
                    {t('baseConverter.result')}
                </Typography>
                }
                {conversion &&
                <AssociatedBaseConversionDetails conversion={conversion.stages[0] as AssociatedBaseConversion}/>
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div style={{ height: '20px' }}/>
                <Box display={'flex'} alignItems={'center'} maxWidth={900} margin={'auto'}>
                    <DocPage path={'positional/associated-base-conversion'}/>
                </Box>
            </TabPanel>

        </div>
    );
};
