import React, { FC } from 'react';
import { AccordionDetails, Divider, Typography, withStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordion from '@material-ui/core/Accordion';

interface SectionProps {
    title: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    content: {
        display: 'block'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    summary: {
        height: 48,
        minHeight: 48,
        '&expanded': {
            height: 48,
            minHeight: 48,
        },
    }
}));

export const Accordion = withStyles({
    root: {
        marginBottom: '16px',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            marginBottom: '16px',
        },
    },
    expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles({
    root: {
        marginBottom: -1,
        minHeight: 48,
        '&$expanded': {
            minHeight: 48,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

export const Section: FC<SectionProps> = ({ title, children }) => {
    const classes = useStyles();

    return (
        <Accordion defaultExpanded variant={'outlined'} >
            <AccordionSummary
                className={classes.summary}
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography className={classes.heading}>
                    {title}
                </Typography>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails className={classes.content}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};
