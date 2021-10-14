import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { HomeView } from './components/home-view/home-view';
import SiderMenu from './components/sider-menu/sider-menu';
import { LanguageMenu } from './components/language-menu/language-menu';
import {
    AppBar,
    Drawer,
    Hidden,
    IconButton,
    styled,
    Toolbar,
    Typography
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { ThemeMenu } from './components/theme-menu/theme-menu';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { RepoLink } from './components/repo-link/repo-link';
import { useMountEffect } from '@calc/utils';
import { loadOptions } from '@calc/core';
import '@calc/i18n';
import { About } from './components/about/about';
import { DocRoute, RendererMapping } from '@calc/docs';
import { Tools } from './components/tools/tools';
import { ComplementDetailsRenderer, ConversionRenderer, OperationRenderer } from '@calc/positional-calculator';

const drawerWidth = 200;

const PREFIX = 'App';

const classes = {
    root: `${PREFIX}-root`,
    appBar: `${PREFIX}-appBar`,
    appBarShift: `${PREFIX}-appBarShift`,
    menuButton: `${PREFIX}-menuButton`,
    hide: `${PREFIX}-hide`,
    drawer: `${PREFIX}-drawer`,
    drawerPaper: `${PREFIX}-drawerPaper`,
    drawerHeader: `${PREFIX}-drawerHeader`,
    content: `${PREFIX}-content`,
    contentShift: `${PREFIX}-contentShift`,
    toolbar: `${PREFIX}-toolbar`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        display: 'flex'
    },
    [`& .${classes.appBar}`]: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    [`& .${classes.appBarShift}`]: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    [`& .${classes.menuButton}`]: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    [`& .${classes.hide}`]: {
        display: 'none'
    },
    [`& .${classes.drawer}`]: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    [`& .${classes.drawerPaper}`]: {
        width: drawerWidth
    },
    [`& .${classes.drawerHeader}`]: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    [`& .${classes.content}`]: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    [`& .${classes.contentShift}`]: {},
    [`& .${classes.toolbar}`]: theme.mixins.toolbar,
}));

export const rootMapping: RendererMapping = {
    'cconv': ComplementDetailsRenderer,
    'operation': OperationRenderer,
    'bconv': ConversionRenderer
};

export const App = () => {
    const { t } = useTranslation();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setMobileOpen(true);
    };

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMobileOpen(open);
    };

    useEffect(() => {
        const closeDrawerOnEscape = (event) => {
            if (mobileOpen && event.type === 'keydown' && (event.key === 'Escape')) {
                setMobileOpen(false);
            }
        };

        document.addEventListener('keydown', closeDrawerOnEscape);

        return () => document.removeEventListener('keydown', closeDrawerOnEscape);
    }, [mobileOpen]);

    useMountEffect(() => {
        dispatch(loadOptions());
    });

    const container = window !== undefined ? () => window.document.body : undefined;

    const drawer = (
        <>
            <div className={classes.drawerHeader}>
                <Typography variant={'h4'}>
                    {t('home.appName')}
                </Typography>
                <div style={{ flexGrow: 1 }}/>
                {
                    mobileOpen &&
                    <IconButton onClick={handleDrawerClose} size="large">
                        <ChevronLeftIcon/>
                    </IconButton>
                }
            </div>
            <SiderMenu/>
        </>
    );


    return (
        <Root>
            <div className={classes.root}>
                <HashRouter basename='/'>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: mobileOpen
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="end"
                                className={clsx(classes.menuButton, mobileOpen && classes.hide)}
                                size="large">
                                <MenuIcon/>
                            </IconButton>
                            <div style={{ 'flexGrow': 1 }}/>
                            <LanguageMenu/>
                            <ThemeMenu/>
                            <RepoLink/>
                        </Toolbar>
                    </AppBar>

                    <nav className={classes.drawer}>
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={container}
                                variant="temporary"
                                anchor={'left'}
                                open={mobileOpen}
                                onClose={toggleDrawer}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                                ModalProps={{
                                    keepMounted: true
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>

                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: mobileOpen
                        })}
                    >
                        <div className={classes.drawerHeader}/>
                        <div>
                            <About/>
                            <Switch>
                                <Route exact path="/" component={HomeView}/>
                                <Route path="/tools" component={Tools}/>
                                <Route path="/theory" render={(props => <DocRoute {...props} mapping={rootMapping}/>)}/>
                            </Switch>
                        </div>
                    </main>
                </HashRouter>
            </div>
        </Root>
    );
};
export default App;


