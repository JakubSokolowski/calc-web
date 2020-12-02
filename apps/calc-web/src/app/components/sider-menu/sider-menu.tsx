import React from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ListEntry, NestedList } from '@calc/common-ui';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        heading: {}
    })
);

export const SiderMenu = () => {
    const { t } = useTranslation();

    const positionalItems: ListEntry[] = [
        {
            text: t('baseConverter.title'),
            link: '/base-converter',
            key: 'base-converter'
        },
        {
            text: t('associatedBaseConverter.title'),
            link: '/associated-base-converter',
            key: 'associated-base-converter'
        },
        {
            text: t('complementConverter.title'),
            link: '/complement-converter',
            key: 'complement-converter'
        },
        {
            text: t('positionalCalculator.title'),
            link: '/positional-calculator',
            key: 'positional-calculator'
        }
    ];

    const floatingItems: ListEntry[] = [
        {
            text: t('floatConverter.title'),
            link: '/float-converter',
            key: 'float-converter'
        }
    ];

    return (
        <div>
            <NestedList header={t('home.positional')} items={positionalItems}/>
            <NestedList header={t('home.floating')} items={floatingItems}/>
        </div>
    );
};

export default SiderMenu;


