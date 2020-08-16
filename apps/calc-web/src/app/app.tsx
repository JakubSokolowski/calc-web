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
import { PositionalCalculatorView } from './components/positional-calculator/positional-calculator-view';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons/lib';

const { Sider, Content, Header } = Layout;

export const App = () => {
    const [leftMenuCollapsed, setLeftMenuCollapsed] = useState(true);
    const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);

    return (
        <Router>
            <Layout>
                <Sider collapsedWidth={80} collapsible collapsed={leftMenuCollapsed} onCollapse={() => setLeftMenuCollapsed(!leftMenuCollapsed)} style={{
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
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: 'unset', height: '20px'}}>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            marginLeft: '24px',
                            marginRight: '0px',
                            marginTop: '44px',
                            overflow: 'initial',
                        }}
                    >
                       <Layout style={{height: '100%'}}>
                           <Content style={{position: 'relative', height: '100%', marginRight: '24px'}}>
                               <main>
                                   <Switch>
                                       <Route exact path="/" component={HomeView}/>
                                       <Route path="/base-converter" component={BaseConverterView}/>
                                       <Route path="/complement-converter" component={ComplementConverterView}/>
                                       <Route path="/float-converter" component={FloatConverterView}/>
                                       <Route path="/positional-calculator" component={PositionalCalculatorView}/>
                                   </Switch>
                               </main>
                               <div style={{position: 'absolute', top: '0px', right: '0px', fontSize: '20px'}}>
                                   {React.createElement(rightPanelCollapsed ? MenuFoldOutlined : MenuUnfoldOutlined, {
                                       className: 'trigger',
                                       onClick: () => setRightPanelCollapsed(!rightPanelCollapsed),
                                   })}
                               </div>
                           </Content>
                           <Sider
                               trigger={null}
                               collapsedWidth={0}
                               width={400}
                               reverseArrow
                               collapsible
                               collapsed={rightPanelCollapsed}
                               onCollapse={() => setRightPanelCollapsed(!rightPanelCollapsed)}
                               style={{
                                   overflow: 'auto',
                                   position: 'sticky',
                                   top: 0,
                                   left: 0
                               }}>
                           </Sider>
                       </Layout>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};
export default App;


