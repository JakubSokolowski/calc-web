import React, { FC } from 'react';
import { AccordionDetails, Divider, Typography, withStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordion from '@material-ui/core/Accordion';
import ErrorIcon from '@material-ui/icons/Error';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface SectionProps {
    title: string;
    resultPossiblyWrong?: boolean;
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
    },
    summaryRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    iconWrapper: {
        marginLeft: theme.spacing(1),
        marginTop: '3px'
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

export const Section: FC<SectionProps> = ({ title, children, resultPossiblyWrong }) => {
    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <Accordion defaultExpanded variant={'outlined'} >
            <AccordionSummary
                className={classes.summary}
                expandIcon={<ExpandMoreIcon/>}
            >
                <div className={classes.summaryRow}>
                    <Typography data-test="section-title" className={classes.heading}>
                        {title}
                    </Typography>
                    {
                        resultPossiblyWrong &&
                        <div className={classes.iconWrapper}>
                            <Tooltip placement='right' title={t('positionalCalculator.resultPossiblyWrong')}>
                                <ErrorIcon/>
                            </Tooltip>
                        </div>
                    }
                </div>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails className={classes.content}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};
