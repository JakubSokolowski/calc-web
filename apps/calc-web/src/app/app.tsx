import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomeView } from './components/home-view/home-view';
import './app.scss';
import '../assets/i18n/i18n';
import SiderMenu from './components/sider-menu/sider-menu';
import { ComplementConverterView } from './components/complement-converter-view/complement-converter-view';
import { FloatConverterView } from './components/float-converter-view/float-converter-view';
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
    Toolbar,
    Typography
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
import BaseConverterView from './components/base-converter-view/base-converter-view';
import { environment } from '@calc/env';
import { PositionalCalculatorView } from '@calc/positional-calculator';


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
            })
        },
        contentShift: {}
    })
);


export const App = () => {
    const theme = useSelector(selectAppTheme);
    const classes = useStyles();
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    console.log('Dummy affected change')

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setOpen(open);
    };

    useEffect(() => {
        const closeDrawerOnEscape = (event) => {
            if (open && event.type === 'keydown' && (event.key === 'Escape')) {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', closeDrawerOnEscape);

        return () => document.removeEventListener('keydown', closeDrawerOnEscape)
    }, [open]);


    return (
        <div className={classes.root} >
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

                    <div  onKeyDown={toggleDrawer(false)}>
                        <Drawer
                            onBackdropClick={toggleDrawer(false)}
                            className={classes.drawer}
                            variant="temporary"
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
                    </div>

                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: open
                        })}
                    >
                        <div className={classes.drawerHeader}/>
                        <Switch>
                            <Route exact path="/" component={HomeView}/>
                            <Route path="/base-converter" component={BaseConverterView}/>
                            <Route path="/associated-base-converter" component={AssociatedBaseConverterView}/>
                            <Route path="/complement-converter" component={ComplementConverterView}/>
                            <Route path="/float-converter" component={FloatConverterView}/>
                            <Route path="/positional-calculator" component={PositionalCalculatorView}/>
                        </Switch>
                    </main>
                </Router>
            </ThemeProvider>
        </div>
    );
};
export default App;


