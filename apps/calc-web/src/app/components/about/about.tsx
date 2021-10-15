import React, { FC } from 'react';
import {
    Divider,
    IconButton,
    Paper,
    Tooltip,
    Popover,
    styled,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { useTranslation } from 'react-i18next';
import { Version } from './version/version';
import { ReportIssue } from './report-issue/report-issue';


const PREFIX = 'About';

const classes = {
    icon: `${PREFIX}-icon`,
    tooltip: `${PREFIX}-tooltip`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.icon}`]: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3)
    },
    [`& .${classes.tooltip}`]: {
        fontSize: theme.typography.fontSize
    },
}));

export const About: FC = () => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <Root>
            <Tooltip data-test="help-button-tooltip" className={classes.tooltip} title={t('about.title')} aria-describedby={id} placement={'left'}>
                <IconButton data-test='help-button' className={classes.icon} onClick={handleClick}>
                    <HelpIcon fontSize={'large'}/>
                </IconButton>
            </Tooltip>
            <Popover
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                anchorEl={anchorEl}
                onClose={handleClose}
                open={open}
            >
                <Paper>
                    <ReportIssue/>
                    <Divider/>
                    <Version/>
                </Paper>
            </Popover>
        </Root>
    );
};
