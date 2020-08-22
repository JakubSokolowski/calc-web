import React from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons/lib';
import SubMenu from 'antd/es/menu/SubMenu';
import { useTranslation } from 'react-i18next';

export const SiderMenu = () => {
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu key="sub1" icon={<UserOutlined/>} title="Positional">
                <Menu.Item
                    key="pos-1"
                    onClick={() => history.push('/base-converter')}
                >
                    {t('baseConverter.title')}
                </Menu.Item>
                <Menu.Item
                    key="pos-2"
                    onClick={() => history.push('/associated-base-converter')}
                >
                    {t('associatedBaseConverter.title')}
                </Menu.Item>
                <Menu.Item
                    key="pos-3"
                    onClick={() => history.push('/complement-converter')}
                >
                    {t('complementConverter.title')}
                </Menu.Item>
                <Menu.Item
                    key="pos-4"
                    onClick={() => history.push('/positional-calculator')}
                >
                    {t('positionalCalculator.title')}
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined/>} title="Floating">
                <Menu.Item
                    key="float-1"
                    onClick={() => history.push('/float-converter')}
                >
                    {t('floatConverter.title')}
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default SiderMenu;


