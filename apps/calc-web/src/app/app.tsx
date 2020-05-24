import React, { useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BaseConverterView } from './components/base-converter-view/base-converter-view';
import { HomeView } from './components/home-view/home-view';
import 'antd/dist/antd.css';
import './app.scss';
import '../assets/i18n/i18n';
import SiderMenu from './components/sider-menu/SiderMenu';
import { ComplementConverterView } from './components/complement-converter-view/complement-converter-view';
import { FloatConverterView } from './components/float-converter-view/float-converter-view';

const { Sider, Content } = Layout;

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
                    <SiderMenu/>
                </Sider>
                <Layout className="site-layout">
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px',
                            overflow: 'initial'
                        }}
                    >
                        <main>
                            <Switch>
                                <Route exact path="/" component={HomeView}/>
                                <Route path="/base-converter" component={BaseConverterView}/>
                                <Route path="/complement-converter" component={ComplementConverterView}/>
                                <Route path="/float-converter" component={FloatConverterView}/>
                            </Switch>
                        </main>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};
export default App;


