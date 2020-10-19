import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomeView } from './components/home-view/home-view';
import './app.scss';
import '../assets/i18n/i18n';
import SiderMenu from './components/sider-menu/sider-menu';
import { ComplementConverterView } from './components/complement-converter-view/complement-converter-view';
import { FloatConverterView } from './components/float-converter-view/float-converter-view';
import { PositionalCalculatorView } from './components/positional-calculator/positional-calculator-view';
import { AssociatedBaseConverterView } from './components/associated-base-converter-view/associated-base-converter-view';
import { LanguageMenu } from './components/language-menu/language-menu';
import {
    AppBar,
    createStyles,
    CssBaseline,
    Drawer,
    IconButton,
    Theme,
    ThemeProvider,
    Toolbar, Typography
} from '@material-ui/core';
import { getTheme } from '@calc/ui';
import { useSelector } from 'react-redux';
import { selectAppTheme } from './store/selectors/options.selectors';
import { ThemeMenu } from './components/theme-menu/theme-menu';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { RepoLink } from './components/repo-link/repo-link';
import { environment } from '../environments/environment';


const bconv = lazy(() => import('./components/base-converter-view/base-converter-view'));
const gameOfLife = lazy(() => import('./components/game-of-life/game-of-life'));


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        hide: {
            display: 'none'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerWidth
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end'
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            marginLeft: -drawerWidth
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0
        }
    })
);


export const App = () => {
    const theme = useSelector(selectAppTheme);
    const classes = useStyles();
    const {t} = useTranslation();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <div className={classes.root}>
            <ThemeProvider theme={getTheme(theme)}>
                <CssBaseline/>
                <Router basename={environment.deployUrl}>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="end"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <div style={{ 'flexGrow': 1 }}/>
                            <LanguageMenu/>
                            <ThemeMenu/>
                            <RepoLink/>
                        </Toolbar>
                    </AppBar>

                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <Typography variant={'h4'}>
                                {t('home.appName')}
                            </Typography>
                            <div style={{ flexGrow: 1 }}/>
                            <IconButton onClick={handleDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                        <SiderMenu/>
                    </Drawer>

                    <main className={clsx(classes.content, {
                        [classes.contentShift]: open
                    })}>
                        <div className={classes.drawerHeader} />
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Route exact path="/" component={HomeView}/>
                                <Route path="/base-converter" component={bconv}/>
                                <Route path="/associated-base-converter" component={AssociatedBaseConverterView}/>
                                <Route path="/complement-converter" component={ComplementConverterView}/>
                                <Route path="/float-converter" component={FloatConverterView}/>
                                <Route path="/positional-calculator" component={PositionalCalculatorView}/>
                                <Route path="/wasm" component={gameOfLife}/>
                            </Switch>
                        </Suspense>
                    </main>
                </Router>
            </ThemeProvider>
        </div>
    );
};
export default App;


