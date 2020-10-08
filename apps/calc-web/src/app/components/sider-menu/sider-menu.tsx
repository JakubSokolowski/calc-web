import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Accordion,
    AccordionSummary,
    createStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Theme, Typography
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }),
);

export const SiderMenu = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography className={classes.heading}>{t('home.positional')}</Typography>
                </AccordionSummary>
                <List>
                    <ListItem button key={'base-converter'} onClick={() => history.push('/base-converter')}>
                        <ListItemText primary={t('baseConverter.title')} />
                    </ListItem>
                    <ListItem button key={'associated-base-converter'} onClick={() => history.push('/associated-base-converter')}>
                        <ListItemText primary={t('associatedBaseConverter.title')} />
                    </ListItem>
                    <ListItem button key={'complement-converter'} onClick={() => history.push('/complement-converter')}>
                        <ListItemText primary={t('complementConverter.title')} />
                    </ListItem>
                    <ListItem button key={'positional-converter'} onClick={() => history.push('/positional-calculator')}>
                        <ListItemText primary={t('positionalCalculator.title')} />
                    </ListItem>
                </List>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography className={classes.heading}>{t('home.floating')}</Typography>
                </AccordionSummary>
                <List>
                    <ListItem button key={'float-converter'} onClick={() => history.push('/float-converter')}>
                        <ListItemIcon>
                            <MailIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('floatConverter.title')} />
                    </ListItem>
                </List>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography className={classes.heading}>{t('sandbox.title')}</Typography>
                </AccordionSummary>
                <List>
                    <ListItem button key={'wasm'} onClick={() => history.push('/wasm')}>
                        <ListItemText primary={t('sandbox.wasm')} />
                    </ListItem>
                </List>
            </Accordion>
        </div>
    );
};

export default SiderMenu;


