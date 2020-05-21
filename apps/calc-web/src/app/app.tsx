import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons/lib';
import { BaseConverterView } from './components/base-converter-view/base-converter-view';
import { HomeView } from './components/home-view/home-view';
import 'antd/dist/antd.css';
import './app.scss';
import '../assets/i18n/i18n';

const { Header, Sider, Content } = Layout;

export const App = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Router>
            <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'sticky',
                    top: 0,
                    left: 0
                }}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined/>}>
                            <Link to={'/'} style={{ color: 'inherit' }}>Home </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined/>}>
                            <Link to={'/base-converter'} style={{ color: 'inherit' }}>Base Converter</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>

                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            overflow: 'initial'
                        }}
                    >
                        <main>
                            <Switch>
                                <Route exact path="/" component={HomeView}/>
                                <Route path="/base-converter" component={BaseConverterView}/>
                            </Switch>
                        </main>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};
export default App;


