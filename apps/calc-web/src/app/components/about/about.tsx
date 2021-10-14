import React, { FC } from 'react';
import {
    Divider,
    IconButton,
    Link,
    Paper,
    Tooltip,
    Popover,
    styled,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { useTranslation } from 'react-i18next';
import { Version } from './version/version';


const PREFIX = 'About';

const classes = {
    icon: `${PREFIX}-icon`,
    content: `${PREFIX}-content`,
    tooltip: `${PREFIX}-tooltip`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.icon}`]: {
        paddingTop: theme.spacing(2),
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3)
    },
    [`& .${classes.content}`]: {
        padding: theme.spacing(2)
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
            <Tooltip data-test="help-button-tooltip"  className={classes.tooltip} title={t('about.title')} aria-describedby={id} placement={'left'}>
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
                    <div data-test="bug-report" className={classes.content}>
                        <Link color={'inherit'} href={'https://github.com/JakubSokolowski/calc-web/issues/new'}>
                            {t('about.submitNewIssue')}
                        </Link>
                    </div>
                    <Divider/>
                    <Version/>
                </Paper>
            </Popover>
        </Root>
    );
};
