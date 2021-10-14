import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { AccordionDetails, Divider, Tooltip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordion from '@mui/material/Accordion';
import ErrorIcon from '@mui/icons-material/Error';
import { useTranslation } from 'react-i18next';

const PREFIX = 'Accordion';

const classes = {
    root: `${PREFIX}-root`,
    content: `${PREFIX}-content`,
    heading: `${PREFIX}-heading`,
    summary: `${PREFIX}-summary`,
    summaryRow: `${PREFIX}-summaryRow`,
    iconWrapper: `${PREFIX}-iconWrapper`
};


const StyledAccordion = styled(MuiAccordion)(({ theme }) => ({
    [`& .${classes.root}`]: {
        width: '100%'
    },

    [`& .${classes.content}`]: {
        display: 'block'
    },

    [`& .${classes.heading}`]: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },

    [`& .${classes.summary}`]: {
        height: 48,
        minHeight: 48,
        '&expanded': {
            height: 48,
            minHeight: 48
        }
    },

    [`& .${classes.summaryRow}`]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },

    [`& .${classes.iconWrapper}`]: {
        marginLeft: theme.spacing(1),
        marginTop: '3px'
    }
}));

interface SectionProps {
    title: string;
    resultPossiblyWrong?: boolean;
}


export const AccordionSummary = (MuiAccordionSummary);

export const Section: FC<SectionProps> = ({ title, children, resultPossiblyWrong }) => {
    const { t } = useTranslation();

    return (
        <StyledAccordion defaultExpanded variant={'outlined'}>
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
        </StyledAccordion>
    );
};
