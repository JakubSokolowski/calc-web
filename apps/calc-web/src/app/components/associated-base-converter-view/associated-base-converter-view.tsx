import React, { FC, useState } from 'react';
import { AssociatedBaseConversion, Conversion } from '@calc/calc-arithmetic';
import { useTranslation } from 'react-i18next';
import { AssociatedBaseConverter } from '../associated-base-converter/associated-base-converter';
import { AssociatedBaseConversionDetails } from '../associated-base-conversion-details/associated-base-conversion-details';
import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import { a11yProps, TabPanel } from '@calc/ui';
import { DocPage } from '@calc/docs';
import { useConverterStyles } from '../../core/styles/converter-styles';
import { environment } from '../../../environments/environment';


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
        <div>

            <Tabs value={value} onChange={handleChange}>
                <Tab label="Converter" {...a11yProps(0)} />
                <Tab label="Theory" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div className={classes.verticalSpacer}/>
                <Typography variant={'h4'} className={classes.title}>
                    {t('associatedBaseConverter.title')}
                </Typography>
                <AssociatedBaseConverter onConversionChange={onChange}/>
                {
                    conversion &&
                    <Typography variant={'h4'} className={classes.title}>
                        {t('baseConverter.result')}
                    </Typography>
                }
                {
                    conversion &&
                    <AssociatedBaseConversionDetails conversion={conversion.stages[0] as AssociatedBaseConversion}/>
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className={classes.verticalSpacer}/>
                <Box display={'flex'} alignItems={'center'} maxWidth={900} margin={'auto'}>
                    <DocPage path='positional/associated-base-conversion' deployUrl={environment.deployUrl}/>
                </Box>
            </TabPanel>

        </div>
    );
};
